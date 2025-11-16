import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import CustomModal from "../CustomModal";
import { Text } from "../Text";

export default function CadastrarUsuarioModal({ visible, onClose, onFinish }) {

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");

    function handleSubmit() {
        if (!nome.trim() || cpf.length !== 11) {
            alert("Preencha nome e CPF válido (11 dígitos)");
            return;
        }

        onFinish({ nome, cpf });
        setNome("");
        setCpf("");
    }

    return (
        <CustomModal visible={visible} onClose={onClose}>
            <View style={styles.container}>
                <Text weight="600" size={20}>Seus Dados</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    value={nome}
                    onChangeText={setNome}
                />

                <TextInput
                    style={styles.input}
                    placeholder="CPF (apenas números)"
                    keyboardType="numeric"
                    maxLength={11}
                    value={cpf}
                    onChangeText={setCpf}
                />

                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                    <Text weight="600" color="#fff">Continuar</Text>
                </TouchableOpacity>
            </View>
        </CustomModal>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 10,
        marginTop: 15
    },
    btn: {
        backgroundColor: "#0EA5E9",
        padding: 15,
        borderRadius: 10,
        marginTop: 25,
        alignItems: "center"
    }
});