import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// MOCK: Gera as próximas 7 datas a partir de hoje
const getNextSevenDays = () => {
  const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const data = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Formata o dia da semana (ex: 'Hoje', 'domingo', 'segunda')
    const dayName = i === 0 ? 'Hoje' : days[date.getDay()];
    
    data.push({
      id: date.toISOString().split('T')[0], // Ex: '2025-10-25' (chave única)
      dayName: dayName,
      dayOfMonth: date.getDate(),
      monthShort: 'out', // Simplificado, mas você pode calcular o mês
    });
  }
  return data;
};

// Dados que serão usados na FlatList
const MOCK_DAYS = getNextSevenDays();

const DateSelector = ({ onSelectDate }) => {
  // Estado para controlar qual dia está selecionado (por ID/data)
  const [selectedDateId, setSelectedDateId] = useState(MOCK_DAYS[0].id);

  // Função chamada ao clicar em um item
  const handleSelect = (item) => {
    setSelectedDateId(item.id);
    // Chama a função passada via props para enviar a data ao componente pai
    onSelectDate(item.id); 
  };
  
  // Função que renderiza CADA ITEM na lista
  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedDateId;
    
    return (
      <TouchableOpacity
        style={[styles.dateBox, isSelected ? styles.selectedBox : styles.unselectedBox]}
        onPress={() => handleSelect(item)}
      >
        <Text style={[styles.dayName, isSelected && styles.selectedText]}>{item.dayName}</Text>
        <Text style={[styles.dayOfMonth, isSelected && styles.selectedText]}>{item.dayOfMonth}</Text>
        <Text style={[styles.monthShort, isSelected && styles.selectedText]}>{item.monthShort}</Text>
      </TouchableOpacity>
    );
  };
  
  // O componente principal
  return (
    <View style={styles.container}>
      {/* Etapa e Título, como na sua imagem */}
      <Text style={styles.stepTitle}>1 Escolha o Dia</Text> 
      
      <FlatList
        data={MOCK_DAYS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true} // 👈 ESSENCIAL: Permite a rolagem horizontal
        showsHorizontalScrollIndicator={false} // Remove a barra de rolagem
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

// ... (Estilos definidos no Passo 2)
// ...

export default DateSelector;