import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "../../components/Text";

export default function MeusAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        carregarAgendamentos();
    }, []);

    async function carregarAgendamentos() {
        const data = await AsyncStorage.getItem("@agendamentos");
        if (data) setAgendamentos(JSON.parse(data));
    }

    function formatarData(data, hora) {
        const dataCompleta = new Date(`${data}T${hora}`);

        const dia = String(dataCompleta.getDate()).padStart(2, "0");
        const mes = String(dataCompleta.getMonth() + 1).padStart(2, "0");
        const ano = dataCompleta.getFullYear();

        const horas = String(dataCompleta.getHours()).padStart(2, "0");
        const minutos = String(dataCompleta.getMinutes()).padStart(2, "0");

        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    }

    function confirmarCancelamento(index) {
        Alert.alert(
            "Cancelar Agendamento",
            "Tem certeza que deseja cancelar este agendamento?",
            [
                { text: "Não", style: "cancel" },
                { text: "Sim", onPress: () => cancelarAgendamento(index) }
            ]
        );
    }

    async function cancelarAgendamento(index) {
        try {
            const novaLista = [...agendamentos];
            novaLista.splice(index, 1); // remove o item selecionado

            await AsyncStorage.setItem("@agendamentos", JSON.stringify(novaLista));
            setAgendamentos(novaLista);
        } catch (error) {
            console.log("Erro ao cancelar:", error);
        }
    }

    return (
        <View style={styles.container}>
            <Text size={20} weight="600">Meus Agendamentos</Text>

            <FlatList
                style={{ marginTop: 20 }}
                data={agendamentos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.card}>
                        <Text weight="600">{item.servico}</Text>

                        <Text>{formatarData(item.data, item.hora)}</Text>
                        <Text>Prioridade: {item.prioridade}</Text>

                        <TouchableOpacity
                            onPress={() => confirmarCancelamento(index)}
                            style={styles.cancelButton}
                        >
                            <Text color="#FFF" weight="600">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={{ marginTop: 40, textAlign: "center" }}>
                        Você ainda não possui agendamentos.
                    </Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: "#FFF"
    },
    card: {
        padding: 15,
        backgroundColor: "#E2E8F0",
        borderRadius: 12,
        marginBottom: 15
    },
    cancelButton: {
        marginTop: 10,
        backgroundColor: "#dc2626",
        padding: 10,
        borderRadius: 8,
        alignItems: "center"
    }
});