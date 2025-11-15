import { Container } from "./styles";
import { Text } from "../components/Text";
import Header from "../components/Header";
import Services from "../components/Servico";
import { useState } from "react";
import { agenda } from "../mocks/agenda";
import DataModal from "../components/DataModal";
import Caixa from "../components/CaixaClick";
import { EscolherDataModal } from "../components/EscolherDataModel";
import PrioridadeModal from "../components/PrioridadeModal";
import CustomModal from "../components/CustomModal";
import MeusAgendamentos from "../components/MeusAgendamentos";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Main() {

    const [servicoEscolhido, setServicoEscolhido] = useState('Vacina'); // ou 'Medição de Pressão/Glicose', etc
    const [mostrarMeusAgendamentos, setMostrarMeusAgendamentos] = useState(false);

    const handleConfirm = async (agendamento) => {
        const agendamentoFinal = {
            ...agendamento,
            prioridade
        };

        try {
            const data = await AsyncStorage.getItem("@agendamentos");
            const lista = data ? JSON.parse(data) : [];
            lista.push(agendamentoFinal);

            await AsyncStorage.setItem("@agendamentos", JSON.stringify(lista));
        } catch (err) {
            console.log("Erro ao salvar:", err);
        }

        alert(
            `Agendado: ${agendamento.servico} em ${agendamento.data} às ${agendamento.hora}\n` +
            `Prioridade: ${prioridade}`
        );

        setdatemodel(false);
    };

    const [datavisuModal, setdatavisuModal] = useState(false);
    const [datemodel, setdatemodel] = useState(false)
    const [prioridade, setPrioridade] = useState(null);
    const [mostrarPrioridadeModal, setMostrarPrioridadeModal] = useState(false);

    function RenderModal() {
        setdatavisuModal(true)
    }

    function handleServiceClick(Id, servico) {

        switch (Id) {
            case 1:
                setServicoEscolhido(servico)
                setdatavisuModal(false);
                setMostrarPrioridadeModal(true);
                break;
            case 2:
                setServicoEscolhido(servico)
                setdatavisuModal(false);
                setMostrarPrioridadeModal(true);
                break;
            case 3:
                setServicoEscolhido(servico)
                setdatavisuModal(false);
                setMostrarPrioridadeModal(true);
                break;

            case 4:
                setServicoEscolhido(servico)
                setdatavisuModal(false);
                setMostrarPrioridadeModal(true);
                break;
            default:
                console.warn('ID de Serviço não reconhecido:', Id);
        }
    }

    return (
        <Container>
            <Header />
            <Services
                onClickAgendar={RenderModal}
                onClickMeusAgendamentos={() => setMostrarMeusAgendamentos(true)}
            />
            <DataModal
                agenda={agenda}
                visible={datavisuModal}
                onClose={() => setdatavisuModal(false)}
                hendlerService={handleServiceClick}
            >
            </DataModal>

            <EscolherDataModal
                servicoSelecionado={servicoEscolhido}
                onConfirm={handleConfirm}
                visible={datemodel}
                onClose={() => setdatemodel(false)}
            />

            <PrioridadeModal
                visible={mostrarPrioridadeModal}
                onClose={() => setMostrarPrioridadeModal(false)}
                onFinish={(nivelPrioridade) => {
                    setPrioridade(nivelPrioridade);
                    setMostrarPrioridadeModal(false);
                    setdatemodel(true);
                }}
            />

            {mostrarMeusAgendamentos && (
                <CustomModal visible={mostrarMeusAgendamentos} onClose={() => setMostrarMeusAgendamentos(false)}>
                    <MeusAgendamentos />
                </CustomModal>
            )}

        </Container>

    );

}

