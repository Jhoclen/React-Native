import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "../../components/Text";

function montarFila(agendamentos) {
    if (!agendamentos || agendamentos.length === 0) return [];

    const mapa = agendamentos.reduce((acc, item) => {
        const key = `${item.data}|${item.hora}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});

    const chavesOrdenadas = Object.keys(mapa).sort((a, b) => {
        const [dataA, horaA] = a.split('|');
        const [dataB, horaB] = b.split('|');
        const dtA = new Date(`${dataA}T${horaA}`);
        const dtB = new Date(`${dataB}T${horaB}`);
        return dtA - dtB;
    });

    // função para peso de prioridade
    const peso = (p) => {
        if (!p) return 2; // Normal por padrão
        const up = String(p).toLowerCase();
        if (up === 'alta' || up === 'alta') return 1;
        if (up === 'média' || up === 'media') return 2;
        if (up === 'normal') return 3;
        return 4;
    };

    const resultado = [];

    for (const chave of chavesOrdenadas) {
        const items = mapa[chave];

        items.sort((a, b) => {
            const pa = peso(a.prioridade);
            const pb = peso(b.prioridade);
            if (pa !== pb) return pa - pb; 
            if (a.nome && b.nome) return String(a.nome).localeCompare(String(b.nome));
            return 0;
        });

        resultado.push(...items);
    }

    return resultado;
}


// ----- COMPONENTE -----
export default function FilaAtendimento({ fila }) {

    const [servicoSelecionado, setServicoSelecionado] = useState(null);

    // quando abrir, selecionar o primeiro serviço automaticamente
    useEffect(() => {
        const servicos = Object.keys(fila || {});
        if (servicos.length > 0) {
            setServicoSelecionado(servicos[0]);
        }
    }, [fila]);

    if (!fila || Object.keys(fila).length === 0) {
        return (
            <View style={styles.container}>
                <Text size={20} weight="600">Fila de Atendimentos</Text>
                <Text style={{ marginTop: 20 }}>Nenhum agendamento encontrado.</Text>
            </View>
        );
    }

    // se nenhum serviço selecionado ainda
    if (!servicoSelecionado || !fila[servicoSelecionado]) {
        return (
            <View style={styles.container}>
                <Text size={20} weight="600">Fila de Atendimentos</Text>
                <Text style={{ marginTop: 20 }}>Carregando...</Text>
            </View>
        );
    }

    // monta a fila apenas do serviço selecionado
    const filaFinal = montarFila(fila[servicoSelecionado]);

    return (
        <View style={styles.container}>
            <Text size={20} weight="600">Fila de Atendimentos</Text>

            {/* ---- TABS DE SERVIÇOS ---- */}
            <View style={styles.tabs}>
                {Object.keys(fila).map(serv => (
                    <Text
                        key={serv}
                        style={[
                            styles.tab,
                            servicoSelecionado === serv && styles.tabSelecionado
                        ]}
                        onPress={() => setServicoSelecionado(serv)}
                    >
                        {serv}
                    </Text>
                ))}
            </View>

            {/* ---- LISTA DA FILA ---- */}
            <FlatList
                style={{ marginTop: 20 }}
                data={filaFinal}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item, index }) => (
                    <View style={styles.card}>
                        <Text weight="600">{index + 1}º da fila</Text>
                        <Text>Serviço: {item.servico}</Text>
                        <Text>Nome: {item.nome}</Text>
                        <Text>CPF: {item.cpf}</Text>
                        <Text>Prioridade: {item.prioridade || "Normal"}</Text>
                        <Text>Data: {item.data} {item.hora}</Text>
                    </View>
                )}
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
    tabs: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 10,
        flexWrap: "wrap"
    },
    tab: {
        backgroundColor: "#CBD5E1",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 10,
        marginBottom: 10
    },
    tabSelecionado: {
        backgroundColor: "#475569",
        color: "#FFF"
    }
});
