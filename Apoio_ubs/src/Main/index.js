import { Container } from "./styles";
import { Text } from "../components/Text";
import Header from "../components/Header";
import Services from "../components/Servico";
import { useState } from "react";
import { agenda } from "../mocks/agenda";
import DataModal from "../components/DataModal";
import Caixa from "../components/CaixaClick";
import {EscolherDataModal} from "../components/EscolherDataModel";
export default function Main(){
     const [servicoEscolhido, setServicoEscolhido] = useState('Vacina'); // ou 'Medição de Pressão/Glicose', etc

  const handleConfirm = (agendamento) => {
    console.log('Agendamento confirmado:', agendamento);
    // agendamento = { servico, data, hora, agendamentoId }
    alert(`Agendado: ${agendamento.servico} em ${agendamento.data} às ${agendamento.hora}`);
  };
   const [datavisuModal, setdatavisuModal] = useState(false);
   const [datemodel, setdatemodel] = useState(false) 

    function RenderModal(){
        setdatavisuModal(true)
    }

    function handleServiceClick(Id,servico){
        
        switch (Id) {
            case 1:
                setdatemodel(true)
                setServicoEscolhido(servico)
                break;
            case 2:

                setdatemodel(true)
                setServicoEscolhido(servico)
                break;
            case 3:
    
                setdatemodel(true)
                setServicoEscolhido(servico)
                break;
                
             case 4:
                setdatemodel(true)
                setServicoEscolhido(servico)
                break;    
            default:
                console.warn('ID de Serviço não reconhecido:', Id);
        }
    }

    return(
    <Container>
        <Header/>
        <Services
            onClick ={RenderModal}
         />
        <DataModal 
        agenda = {agenda}
        visible={datavisuModal}
        onClose={()=> setdatavisuModal(false)} 
        hendlerService={handleServiceClick}
        >
        </DataModal>
        <EscolherDataModal
            servicoSelecionado={servicoEscolhido}
            onConfirm={handleConfirm}
            visible={datemodel}
            onClose={()=> setdatemodel(false)}
         />
        
        
    </Container>

    );

}

