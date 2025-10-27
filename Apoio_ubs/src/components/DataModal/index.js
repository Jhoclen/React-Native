import CustomModal from "../CustomModal";
import { Text } from "../Text";
import { FlatList, TouchableOpacity } from "react-native"
import { Container } from "./styles";
import Caixa from "../CaixaClick";


export default function DataModal({visible, onClose, agenda, hendlerService}){
    return(
        <CustomModal visible={visible} onClose={onClose}>

           <Container>
             <Text weight="600">O Que Você Precisa Hoje?</Text>  
                <Text>Escolha o tipo de atendimento que deseja agendar</Text> 
                  
                <FlatList
                    data ={agenda}
                    keyExtractor={agenda => agenda.id}
                    renderItem={({ item : agenda}) =>(
                        
                        <Caixa 
                        titulo={agenda.Servico}
                        description ={agenda.description}
                        icon={agenda.icon}
                        onClick={()=>{hendlerService(agenda.id)}}
                        >

                        </Caixa>
                    )}
                />   
           </Container>
               
                  
            

        </CustomModal>
    );
}