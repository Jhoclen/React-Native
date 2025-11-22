import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CustomModal from "../CustomModal";
import { Text } from "../Text";

export default function PrioridadeModal({ visible, onClose, onFinish }) {
  const [respostas, setRespostas] = useState({
    febre: null,
    sangramento: null,
    idoso: null,
    gestante: null,
  });

  const handleSelect = (campo, valor) => {
    setRespostas((prev) => ({ ...prev, [campo]: valor }));
  };

  const calcularPrioridade = () => {
    let score = 0;

    if (respostas.febre === "sim") score += 3;
    if (respostas.sangramento === "sim") score += 4;
    if (respostas.idoso === "sim") score += 2;
    if (respostas.gestante === "sim") score += 2;

    let nivel = "Normal";

    if (score >= 4) nivel = "Alta";
    else if (score >= 2) nivel = "Média";

    onFinish(nivel);
  };

  const renderOpcoes = (campo) => (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.button, respostas[campo] === "sim" && styles.selected]}
        onPress={() => handleSelect(campo, "sim")}
      >
        <Text weight="600" color={respostas[campo] === "sim" ? "#FFF" : "#000"}>
          Sim
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, respostas[campo] === "nao" && styles.selected]}
        onPress={() => handleSelect(campo, "nao")}
      >
        <Text weight="600" color={respostas[campo] === "nao" ? "#FFF" : "#000"}>
          Não
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <Text weight="600" size={18}>
          Questionário de Prioridade
        </Text>

        <Text style={styles.question}>Está com febre?</Text>
        {renderOpcoes("febre")}

        <Text style={styles.question}>Sangramento ou dor intensa?</Text>
        {renderOpcoes("sangramento")}

        <Text style={styles.question}>É idoso (60+)?</Text>
        {renderOpcoes("idoso")}

        <Text style={styles.question}>É gestante?</Text>
        {renderOpcoes("gestante")}

        <TouchableOpacity style={styles.finishBtn} onPress={calcularPrioridade}>
          <Text weight="600" color="#FFF">
            Calcular Prioridade
          </Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  question: { marginTop: 20, marginBottom: 10 },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    padding: 12,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    width: 100,
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#0EA5E9",
  },
  finishBtn: {
    marginTop: 30,
    backgroundColor: "#0EA5E9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
