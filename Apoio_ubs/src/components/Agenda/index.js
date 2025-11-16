export function gerarAgenda(meses = 3) {
  const hoje = new Date();
  const fim = new Date();
  fim.setMonth(fim.getMonth() + meses);

  let agendaGerada = [];
  let idCounter = 1;

  const data = new Date(hoje);

  while (data <= fim) {
    const diaSemana = data.getDay(); // 0 domingo ... 6 sábado

    if (diaSemana >= 1 && diaSemana <= 5) {
      const horarios = gerarHorarios("07:00", "16:00", 30);

      horarios.forEach(hora => {
        ["Consulta", "Exame de Próstata", "Vacina", "Medição de Pressão/Glicose"].forEach(servico => {

          agendaGerada.push({
            id: idCounter++,
            data: formatarDataSimples(data), // YYYY-MM-DD
            hora,
            servico,
            capacidadeMax: servico === "Consulta" || servico === "Exame de Próstata" ? 1 : 6,
            reservas: 0
          });

        });
      });
    }

    data.setDate(data.getDate() + 1); // avança 1 dia
  }

  return agendaGerada;
}

function gerarHorarios(inicio, fim, intervaloMinutos) {
  const horarios = [];

  let [h, m] = inicio.split(":").map(Number);
  let [hFim, mFim] = fim.split(":").map(Number);

  let atual = h * 60 + m;
  const limite = hFim * 60 + mFim;

  while (atual <= limite) {
    const hh = String(Math.floor(atual / 60)).padStart(2, "0");
    const mm = String(atual % 60).padStart(2, "0");
    horarios.push(`${hh}:${mm}`);

    atual += intervaloMinutos;
  }

  return horarios;
}

function formatarDataSimples(date) {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}
