import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Text } from "../../components/Text";

import { getBookings, cancelarBooking } from "../../services/db";

export default function MeusAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        carregarAgendamentos();
    }, []);

    async function carregarAgendamentos() {
        try {
            const data = await getBookings();
            setAgendamentos(data);
        } catch (error) {
            console.log("Erro ao carregar agendamentos:", error);
        }
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

    function confirmarCancelamento(idBooking) {
        Alert.alert(
            "Cancelar Agendamento",
            "Tem certeza que deseja cancelar este agendamento?",
            [
                { text: "Não", style: "cancel" },
                { text: "Sim", onPress: () => cancelar(idBooking) }
            ]
        );
    }

    async function cancelar(idBooking) {
        try {
            await cancelarBooking(idBooking);
            await carregarAgendamentos(); // atualiza lista após cancelar
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
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text weight="600">{item.servico}</Text>

                        <Text>Nome: {item.nome}</Text>
                        <Text>CPF: {item.cpf}</Text>
                        <Text>{formatarData(item.data, item.hora)}</Text>
                        <Text>Prioridade: {item.prioridade || "Nenhuma"}</Text>

                        <TouchableOpacity
                            onPress={() => confirmarCancelamento(item.id)}
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
