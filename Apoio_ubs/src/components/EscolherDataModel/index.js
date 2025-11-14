import CustomModal from '../CustomModal';
import React, { useState, useMemo } from 'react';
import { Text } from '../Text';
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
  WarningText
  ,TimeSlotsGrid,
  ConfirmSection,
  SummaryBox,
  SummaryText,
  ConfirmButtonText} from './styles'
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { getUniqueDates, getTimeSlotsForDate } from '../../mocks/agenda';

export const EscolherDataModal = ({ servicoSelecionado, onConfirm, visible,onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // FILTRA DATAS DO SERVIÇO
  const datasDisponiveis = useMemo(() => {
    if (!servicoSelecionado) return [];
    return getUniqueDates(servicoSelecionado);
  }, [servicoSelecionado]);

  //  FILTRA HORÁRIOS DA DATA SELECIONADA
  const horariosDisponiveis = useMemo(() => {
    if (!selectedDate || !servicoSelecionado) return [];
    return getTimeSlotsForDate(servicoSelecionado, selectedDate);
  }, [servicoSelecionado, selectedDate]);

  const handleDateSelect = (data) => {
    setSelectedDate(data);
    setSelectedTime(null);
  };

  const handleTimeSelect = (horario) => {
    if (horario.disponibilidade) {
      setSelectedTime(horario);
    }
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm({
        servico: servicoSelecionado,
        data: selectedDate,
        hora: selectedTime.hora,
        agendamentoId: selectedTime.id,
      });
    }
  };

  // Helpers
  const getDayName = (dateString) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const date = new Date(dateString + 'T00:00:00');
    return days[date.getDay()];
  };

  const getMonthName = (dateString) => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const date = new Date(dateString + 'T00:00:00');
    return months[date.getMonth()];
  };

  const isToday = (dateString) => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return dateString === todayStr;
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
    <CustomModal visible={visible} onClose={onClose} presentationStyle="overFullScreen">
        <Container  showsVerticalScrollIndicator={false}>
          {/* ===== HEADER DO SERVIÇO ===== */}
          <Header>
            <ServiceTitle>{servicoSelecionado}</ServiceTitle>
            <Subtitle>Escolha a melhor data e horário</Subtitle>
          </Header>

          {/* ===== SEÇÃO 1: ESCOLHER DIA ===== */}
          <Section>
            <SectionHeader>
              <Badge>
                <BadgeText>1</BadgeText>
              </Badge>
              <SectionTitle>📅 Escolha o Dia</SectionTitle>
            </SectionHeader>

            {datasDisponiveis.length === 0 ? (
              <WarningBox>
                <WarningText>
                  Nenhuma data disponível para este serviço
                </WarningText>
              </WarningBox>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.datesScroll}
              >
                {datasDisponiveis.map((dateString) => {
                  const isSelected = selectedDate === dateString;
                  const isTodayDate = isToday(dateString);
                  const dayNumber = dateString.split('-')[2];

                  return (
                    <TouchableOpacity
                      key={dateString}
                      onPress={() => handleDateSelect(dateString)}
                      style={[
                        styles.dateCard,
                        isSelected && styles.dateCardSelected,
                      ]}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.dayName, isSelected && styles.textSelected]}>
                        {isTodayDate ? 'Hoje' : getDayName(dateString)}
                      </Text>
                      <Text style={[styles.dayNumber, isSelected && styles.textSelectedBold]}>
                        {dayNumber}
                      </Text>
                      <Text style={[styles.monthName, isSelected && styles.textSelected]}>
                        {getMonthName(dateString)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </Section>

          {/* ===== SEÇÃO 2: ESCOLHER HORÁRIO ===== */}
          {selectedDate && (
            <Section>
              <SectionHeader>
                <Badge>
                  <BadgeText>2</BadgeText>
                </Badge>
                <SectionTitle>⏰ Escolha o Horário</SectionTitle>
              </SectionHeader>

              {horariosDisponiveis.length === 0 ? (
                <WarningBox style={styles.warningBox}>
                  <WarningText>
                    Nenhum horário disponível nesta data
                  </WarningText>
                </WarningBox>
              ) : (
                <View style={styles.timeSlotsGrid}>
                  {horariosDisponiveis.map((horario) => {
                    const isSelected = selectedTime?.id === horario.id;
                    const isAvailable = horario.disponibilidade;

                    return (
                      <TouchableOpacity
                        key={horario.id}
                        onPress={() => handleTimeSelect(horario)}
                        disabled={!isAvailable}
                        style={[
                          styles.timeSlot,
                          isSelected && styles.timeSlotSelected,
                          !isAvailable && styles.timeSlotDisabled,
                        ]}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.timeText,
                            isSelected && styles.timeTextSelected,
                            !isAvailable && styles.timeTextDisabled,
                          ]}
                        >
                          {horario.hora}
                        </Text>
                        {!isAvailable && (
                          <Text style={styles.occupiedLabel}>Ocupado</Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </Section>
          )}

          {/* ===== BOTÃO CONFIRMAR ===== */}
          {selectedDate && selectedTime && (
            <ConfirmSection>
              <SummaryBox>
                <SummaryText>
                  📅 {selectedDate.split('-').reverse().join('/')} às {selectedTime.hora}
                </SummaryText>
              </SummaryBox>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
                activeOpacity={0.8}
              >
                <ConfirmButtonText >✓ Confirmar Agendamento</ConfirmButtonText>
              </TouchableOpacity>
            </ConfirmSection>
          )}
        </Container>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },

  datesScroll: {
    paddingRight: 20,
  },
  dateCard: {
    width: 80,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#fff',
    marginRight: 12,
    alignItems: 'center',
  },
  dateCardSelected: {
    backgroundColor: '#0EA5E9',
    borderColor: '#0EA5E9',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  monthName: {
    fontSize: 12,
    color: '#94A3B8',
  },
  textSelected: {
    color: '#E0F2FE',
  },
  textSelectedBold: {
    color: '#fff',
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '31%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#fff',
    marginBottom: 12,
    alignItems: 'center',
  },
  timeSlotSelected: {
    backgroundColor: '#0EA5E9',
    borderColor: '#0EA5E9',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  timeSlotDisabled: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  timeTextSelected: {
    color: '#fff',
  },
  timeTextDisabled: {
    color: '#CBD5E1',
  },
  occupiedLabel: {
    fontSize: 10,
    color: '#CBD5E1',
    marginTop: 4,
  },


  confirmButton: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

});