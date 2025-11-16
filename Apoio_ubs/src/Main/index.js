import { Container } from "./styles";
import { Text } from "../components/Text";
import Header from "../components/Header";
import Services from "../components/Servico";
import { useState, useEffect } from "react";
import { agenda } from "../mocks/agenda"; // mantém para listar serviços no DataModal
import DataModal from "../components/DataModal";
import Caixa from "../components/CaixaClick";
import { EscolherDataModal } from "../components/EscolherDataModel";
import PrioridadeModal from "../components/PrioridadeModal";
import CustomModal from "../components/CustomModal";
import MeusAgendamentos from "../components/MeusAgendamentos";
import CadastrarUsuarioModal from "../components/CadastrarUsuarioModal";
import FilaAtendimento from "../components/ListarTodosAgendamentos/FilaAtendimento";

import { initDatabaseIfNeeded, reservarSlot, listarAgendados } from '../services/db';

export default function Main() {
    useEffect(() => {
        initDatabaseIfNeeded().catch(err => console.log('DB init err', err));
    }, []);

    const [servicoEscolhido, setServicoEscolhido] = useState('Vacina');
    const [mostrarMeusAgendamentos, setMostrarMeusAgendamentos] = useState(false);
    const [dadosUsuarioModal, setDadosUsuarioModal] = useState(false);
    const [agendamentoTemp, setAgendamentoTemp] = useState(null); // { servico, data, hora, agendamentoId }
    const [filaVisible, setFilaVisible] = useState(false);
    const [filaOrganizada, setFilaOrganizada] = useState({});

    const [datavisuModal, setdatavisuModal] = useState(false);
    const [datemodel, setdatemodel] = useState(false);
    const [prioridade, setPrioridade] = useState(null);
    const [mostrarPrioridadeModal, setMostrarPrioridadeModal] = useState(false);


    function RenderModal() {
        setdatavisuModal(true);
    }

    function handleClickFila() {
        carregarFilaOrganizada();
        setFilaVisible(true);
    }

    function handleServiceClick(Id, servico) {
        setServicoEscolhido(servico);
        setdatavisuModal(false);

        switch (Id) {
            case 1: // Consulta - sem prioridade
            case 3: // Exame de Próstata - sem prioridade
                setPrioridade(null);   // garante prioridade vazia
                setdatemodel(true);    // abre o modal de escolher data
                break;

            case 2: // Vacina - com prioridade
            case 4: // Medição - com prioridade
                setMostrarPrioridadeModal(true); // abre prioridade
                break;

            default:
                console.warn('ID de Serviço não reconhecido:', Id);
        }
    }

    // ===== Função que confirma/efetiva a reserva no banco =====
    async function handleConfirmFinal({ nome, cpf }) {
        if (!agendamentoTemp) {
            alert('Erro interno: nenhum agendamento selecionado.');
            return;
        }

        const slotId = agendamentoTemp.agendamentoId;
        const idBooking = `${cpf}-${agendamentoTemp.data}-${agendamentoTemp.hora}`;
        try {
            await reservarSlot(slotId, {
                idBooking,
                nome,
                cpf,
                prioridade
            });

            if (agendamentoTemp.onReload) {
                agendamentoTemp.onReload();
            }

            alert(
                `Agendado com sucesso!\n\n` +
                `Nome: ${nome}\n` +
                `CPF: ${cpf}\n` +
                `${agendamentoTemp.servico}\n` +
                `${agendamentoTemp.data} às ${agendamentoTemp.hora}\n` +
                (prioridade ? `Prioridade: ${prioridade}` : "")
            );

            setAgendamentoTemp(null);
            setdatemodel(false);
        } catch (err) {
            console.log('Erro ao reservar:', err);
            alert('Erro ao reservar: ' + (err.message || 'Erro desconhecido'));
        }
    }

    async function carregarFilaOrganizada() {
        try {
            const lista = await listarAgendados();

            const agrupado = lista.reduce((acc, item) => {
                if (!acc[item.servico]) acc[item.servico] = [];
                acc[item.servico].push(item);
                return acc;
            }, {});

            setFilaOrganizada(agrupado);
        } catch (error) {
            console.log("❌ Erro ao carregar fila organizada:", error);
        }
    }


    return (
        <Container>
            <Header />
            <Services
                onClickAgendar={RenderModal}
                onClickMeusAgendamentos={() => setMostrarMeusAgendamentos(true)}
                onClickFila={handleClickFila}
            />

            <DataModal
                agenda={agenda}
                visible={datavisuModal}
                onClose={() => setdatavisuModal(false)}
                hendlerService={handleServiceClick}
            />

            <EscolherDataModal
                servicoSelecionado={servicoEscolhido}
                onConfirm={(agendamento) => {
                    setAgendamentoTemp(agendamento);
                    setDadosUsuarioModal(true);
                }}
                visible={datemodel}
                onClose={() => setdatemodel(false)}
            />

            <CadastrarUsuarioModal
                visible={dadosUsuarioModal}
                onClose={() => setDadosUsuarioModal(false)}
                onFinish={(dados) => {
                    setDadosUsuarioModal(false);
                    handleConfirmFinal(dados);
                }}
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

            {filaVisible && (
                <CustomModal visible={filaVisible} onClose={() => setFilaVisible(false)}>
                    <FilaAtendimento
                        onClose={() => setFilaVisible(false)}
                        fila={filaOrganizada}
                    />
                </CustomModal>
            )}
        </Container>
    );
}
