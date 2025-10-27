import { Container } from "./styles";
import { Text } from "../components/Text";
import Header from "../components/Header";
import Services from "../components/Servico";
import { useState } from "react";
import { agenda } from "../mocks/agenda";
import DataModal from "../components/DataModal";
import Caixa from "../components/CaixaClick";
import EscolherDataModel from "../components/EscolherDataModel";

export default function Main(){
   const [datavisuModal, setdatavisuModal] = useState(false);
   const [datemodel, setdatemodel] = useState(false) 

    function RenderModal(){
        setdatavisuModal(true)
    }

    function handleServiceClick(Id){
        
        switch (Id) {
            case 1:
                setdatemodel(true)
                
                break;
            case 2:

                alert('vc clicou 2')
                break;
            case 3:
    
                alert('vc clicou 3')
                break;
                
             case 4:
                alert('vc clicou 4')
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
        <EscolherDataModel
            agenda = {agenda}
            visible={datemodel}
            onClose={()=> setdatemodel(false)}

        />
        
        
    </Container>

    );

}

