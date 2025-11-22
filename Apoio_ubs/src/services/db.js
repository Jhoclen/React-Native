import { openDatabaseSync } from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { gerarAgenda } from "../components/Agenda";

const db = openDatabaseSync("agenda_V2.db");

// Função utilitária para SQL
async function execSql(sql, params = []) {
  return db.runAsync(sql, params);
}

export async function initDatabaseIfNeeded() {
  await execSql(`
    CREATE TABLE IF NOT EXISTS slots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT,
      hora TEXT,
      servico TEXT,
      capacidadeMax INTEGER,
      servicoId INTEGER,
      reservas INTEGER DEFAULT 0
    );
  `);

  await execSql(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY NOT NULL,
      slot_id INTEGER,
      nome TEXT,
      cpf TEXT,
      prioridade TEXT,
      created_at TEXT,
      FOREIGN KEY(slot_id) REFERENCES slots(id)
    );
  `);

  const seeded = await AsyncStorage.getItem("@agenda_seeded_v2");
  if (!seeded) {
    await seedSlotsFromGenerator();
    await AsyncStorage.setItem("@agenda_seeded_v2", "1");
  }
}

async function seedSlotsFromGenerator() {
  const generated = gerarAgenda(3);

  await db.withTransactionAsync(async () => {
    const mapaServicos = {
      Consulta: 1,
      Vacina: 2,
      "Exame de Próstata": 3,
      Medição: 4,
    };

    for (const slot of generated) {
      await db.runAsync(
        `INSERT INTO slots (data, hora, servico, servicoId, capacidadeMax, reservas)
         VALUES (?, ?, ?, ?, ?, ?);`,
        [
          slot.data,
          slot.hora,
          slot.servico,
          mapaServicos[slot.servico],
          slot.capacidadeMax,
          0,
        ],
      );
    }
  });
}

export async function getUniqueDates(servico) {
  const rows = await db.getAllAsync(
    `SELECT DISTINCT data FROM slots WHERE servicoId = ? ORDER BY data;`,
    [servico],
  );
  return rows.map((r) => r.data);
}

export async function getTimeSlotsForDate(servico, data) {
  const rows = await db.getAllAsync(
    `SELECT id, hora, capacidadeMax, reservas
     FROM slots
     WHERE servicoId = ? AND data = ?
     ORDER BY hora;`,
    [servico, data],
  );

  return rows.map((r) => ({
    id: r.id,
    hora: r.hora,
    capacidadeMax: r.capacidadeMax,
    reservas: r.reservas,
    disponibilidade: r.reservas < r.capacidadeMax,
  }));
}

export async function reservarSlot(
  slotId,
  { idBooking, nome, cpf, prioridade },
) {
  return db.withTransactionAsync(async () => {
    const slot = await db.getFirstAsync(
      `SELECT capacidadeMax, reservas FROM slots WHERE id = ?;`,
      [slotId],
    );

    if (!slot) throw new Error("Slot não encontrado");
    if (slot.reservas >= slot.capacidadeMax) throw new Error("Sem vagas");

    await db.runAsync(
      `INSERT INTO bookings (id, slot_id, nome, cpf, prioridade, created_at)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [
        idBooking,
        slotId,
        nome,
        cpf,
        prioridade || null,
        new Date().toISOString(),
      ],
    );

    await db.runAsync(
      `UPDATE slots SET reservas = reservas + 1 WHERE id = ?;`,
      [slotId],
    );
  });
}

export async function getBookings() {
  return db.getAllAsync(
    `SELECT b.id, b.nome, b.cpf, b.prioridade, b.created_at,
            s.servico, s.data, s.hora
     FROM bookings b
     JOIN slots s ON b.slot_id = s.id
     ORDER BY s.data, s.hora;`,
  );
}

export async function cancelarBooking(bookingId) {
  return db.withTransactionAsync(async () => {
    const row = await db.getFirstAsync(
      `SELECT slot_id FROM bookings WHERE id = ?;`,
      [bookingId],
    );

    if (!row) throw new Error("Booking não encontrado");

    await db.runAsync(`DELETE FROM bookings WHERE id = ?;`, [bookingId]);

    await db.runAsync(
      `UPDATE slots SET reservas = reservas - 1
       WHERE id = ? AND reservas > 0;`,
      [row.slot_id],
    );
  });
}

export async function listarAgendados() {
  try {
    const rows = await db.getAllAsync(
      `SELECT
          b.id AS id,
          b.nome,
          b.cpf,
          b.prioridade,
          s.servico,
          s.data,
          s.hora
       FROM bookings b
       JOIN slots s ON s.id = b.slot_id
       ORDER BY
          s.data ASC,
          s.hora ASC,
          CASE b.prioridade
              WHEN 'ALTA' THEN 1
              WHEN 'NORMAL' THEN 2
              WHEN 'BAIXA' THEN 3
              ELSE 999
          END ASC,
          b.nome ASC;`,
    );

    return rows;
  } catch (err) {
    console.log("❌ ERRO listarAgendados():", err);
    throw err;
  }
}
