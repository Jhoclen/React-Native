import CustomModal from "../CustomModal";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "../Text";
import {
  Container,
  Header,
  ServiceTitle,
  Subtitle,
  Section,
  SectionHeader,
  Badge,
  BadgeText,
  SectionTitle,
  WarningBox,
  WarningText,
  ConfirmSection,
  SummaryBox,
  SummaryText,
  ConfirmButtonText,
} from "./styles";

import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

import { getUniqueDates, getTimeSlotsForDate } from "../../services/db";

export const EscolherDataModal = ({
  servicoSelecionado,
  onConfirm,
  visible,
  onClose,
}) => {
  const [datasDisponiveis, setDatasDisponiveis] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [vagasPorHorario, setVagasPorHorario] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchDates() {
      if (!servicoSelecionado) return setDatasDisponiveis([]);

      const dates = await getUniqueDates(servicoSelecionado.id);
      if (mounted) setDatasDisponiveis(dates);
    }

    fetchDates();
    return () => {
      mounted = false;
    };
  }, [servicoSelecionado]);

  useEffect(() => {
    async function fetchTimes() {
      if (!selectedDate || !servicoSelecionado) {
        setHorariosDisponiveis([]);
        setVagasPorHorario({});
        return;
      }

      const slots = await getTimeSlotsForDate(
        servicoSelecionado.id,
        selectedDate,
      );

      // Remover horários duplicados
      const unique = [];
      const horasSet = new Set();

      slots.forEach((s) => {
        if (!horasSet.has(s.hora)) {
          horasSet.add(s.hora);
          unique.push(s);
        }
      });

      setHorariosDisponiveis(unique);

      // Calcular vagas de forma correta
      const mapa = {};
      unique.forEach((u) => {
        let vagas =
          typeof u.reservas === "number"
            ? u.capacidadeMax - u.reservas
            : u.capacidadeMax;

        if (vagas < 0) vagas = 0;

        mapa[u.hora] = vagas;
      });

      setVagasPorHorario(mapa);
    }

    fetchTimes();
  }, [selectedDate, servicoSelecionado, reload]);

  function handleDateSelect(dateStr) {
    setSelectedDate(dateStr);
    setSelectedTime(null);
  }

  function handleTimeSelect(horario) {
    const vagas = vagasPorHorario[horario.hora] ?? 0;
    if (vagas > 0) setSelectedTime(horario);
  }

  function handleConfirm() {
    if (!selectedDate || !selectedTime) return;

    onConfirm({
      servicoId: servicoSelecionado.id,
      servicoNome: servicoSelecionado.nome,
      data: selectedDate,
      hora: selectedTime.hora,
      agendamentoId: selectedTime.id,
      onReload: () => setReload((r) => !r),
    });
  }

  function dateFromYMD(dateString) {
    // espera 'YYYY-MM-DD'
    const [y, m, d] = dateString.split("-").map(Number);
    return new Date(y, m - 1, d); // usa timezone local corretamente
  }

  const getDayName = (dateString) => {
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const dt = dateFromYMD(dateString);
    return days[dt.getDay()];
  };

  const getMonthName = (dateString) => {
    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const dt = dateFromYMD(dateString);
    return months[dt.getMonth()];
  };

  const isToday = (dStr) => {
    const today = new Date();
    const dt = dateFromYMD(dStr);
    return (
      dt.getFullYear() === today.getFullYear() &&
      dt.getMonth() === today.getMonth() &&
      dt.getDate() === today.getDate()
    );
  };

  if (!servicoSelecionado) {
    return (
      <CustomModal visible={visible} onClose={onClose}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Selecione um serviço primeiro</Text>
        </View>
      </CustomModal>
    );
  }

  return (
    <CustomModal visible={visible} onClose={onClose}>
      <Container>
        <Header>
          <ServiceTitle>{servicoSelecionado.nome}</ServiceTitle>
          <Subtitle>Escolha a melhor data e horário</Subtitle>
        </Header>

        {/* ------------------------- 1) DATAS ------------------------- */}
        <Section>
          <SectionHeader>
            <Badge>
              <BadgeText>1</BadgeText>
            </Badge>
            <SectionTitle>📅 Escolha o Dia</SectionTitle>
          </SectionHeader>

          {datasDisponiveis.length === 0 ? (
            <WarningBox>
              <WarningText>Nenhuma data disponível</WarningText>
            </WarningBox>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.datesScroll}
            >
              {datasDisponiveis.map((dateStr) => {
                const isSelected = selectedDate === dateStr;
                const day = dateStr.split("-")[2];

                return (
                  <TouchableOpacity
                    key={dateStr}
                    onPress={() => handleDateSelect(dateStr)}
                    style={[
                      styles.dateCard,
                      isSelected && styles.dateCardSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayName,
                        isSelected && styles.textSelected,
                      ]}
                    >
                      {isToday(dateStr) ? "Hoje" : getDayName(dateStr)}
                    </Text>

                    <Text
                      style={[
                        styles.dayNumber,
                        isSelected && styles.textSelectedBold,
                      ]}
                    >
                      {day}
                    </Text>

                    <Text
                      style={[
                        styles.monthName,
                        isSelected && styles.textSelected,
                      ]}
                    >
                      {getMonthName(dateStr)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </Section>

        {/* ------------------------- 2) HORÁRIOS ------------------------- */}
        {selectedDate && (
          <Section>
            <SectionHeader>
              <Badge>
                <BadgeText>2</BadgeText>
              </Badge>
              <SectionTitle>⏰ Escolha o Horário</SectionTitle>
            </SectionHeader>

            <View style={styles.timeSlotsGrid}>
              {horariosDisponiveis.map((h) => {
                const vagas = vagasPorHorario[h.hora] ?? 0;
                const isSelected = selectedTime?.hora === h.hora;

                return (
                  <TouchableOpacity
                    key={h.id}
                    onPress={() => handleTimeSelect(h)}
                    disabled={vagas <= 0}
                    style={[
                      styles.timeSlot,
                      isSelected && styles.timeSlotSelected,
                      vagas <= 0 && styles.timeSlotDisabled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        isSelected && styles.timeTextSelected,
                        vagas <= 0 && styles.timeTextDisabled,
                      ]}
                    >
                      {h.hora}
                    </Text>

                    <Text
                      style={
                        vagas <= 0 ? styles.occupiedLabel : styles.vagasLabel
                      }
                    >
                      {vagas <= 0 ? "Ocupado" : `${vagas} vagas`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Section>
        )}

        {/* ---------------------- CONFIRMAR ---------------------- */}
        {selectedDate && selectedTime && (
          <ConfirmSection>
            <SummaryBox>
              <SummaryText>
                📅 {selectedDate.split("-").reverse().join("/")} às{" "}
                {selectedTime.hora}
              </SummaryText>
            </SummaryBox>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <ConfirmButtonText>✓ Confirmar Agendamento</ConfirmButtonText>
            </TouchableOpacity>
          </ConfirmSection>
        )}
      </Container>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { color: "#666" },

  datesScroll: { paddingRight: 20 },

  dateCard: {
    width: 80,
    padding: 16,
    marginRight: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  dateCardSelected: {
    backgroundColor: "#0EA5E9",
    borderColor: "#0EA5E9",
  },

  dayName: { fontSize: 12, color: "#94A3B8", marginBottom: 4 },
  dayNumber: { fontSize: 28, fontWeight: "bold", color: "#1E293B" },
  monthName: { fontSize: 12, color: "#94A3B8" },

  textSelected: { color: "#fff" },
  textSelectedBold: { color: "#fff", fontWeight: "bold" },

  timeSlotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  timeSlot: {
    width: "31%",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFF",
    marginBottom: 12,
    alignItems: "center",
  },
  timeSlotSelected: {
    backgroundColor: "#0EA5E9",
    borderColor: "#0EA5E9",
  },
  timeSlotDisabled: {
    backgroundColor: "#F1F5F9",
  },

  timeText: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  timeTextSelected: { color: "#FFF" },
  timeTextDisabled: { color: "#A0A0A0" },

  occupiedLabel: { fontSize: 10, color: "#999" },
  vagasLabel: { fontSize: 10, color: "#444" },

  confirmButton: {
    marginTop: 10,
    backgroundColor: "#10B981",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
});
