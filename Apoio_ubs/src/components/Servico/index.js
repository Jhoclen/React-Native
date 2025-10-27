
import { Text } from "../Text"
import { Container, Boxservices, Icon, ServiceDescription } from "./styles";
import Agenda from "../../assets/image/agenda.png"


export default function Services({onClick}){
    return(
        <Container>
            <Text weight="600">Nossos Serviços</Text>
            <Boxservices onPress={onClick}>
                <Icon source={Agenda}/>
                 <ServiceDescription>
                    <Text weight="600" >Agendar Serviços</Text>
                    <Text size={12}>Marque consultas e procedimentos sem filas</Text>
                </ServiceDescription>
            </Boxservices>

        </Container>
    )

}
