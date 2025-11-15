
import { Text } from "../Text"
import { Container, Boxservices, Icon, ServiceDescription } from "./styles";
import Agenda from "../../assets/image/agenda.png"
import ListIcon from "../../assets/image/check.png";


export default function Services({ onClickAgendar, onClickMeusAgendamentos }) {
    return (
        <Container>
            <Text weight="600">Nossos Serviços</Text>

            <Boxservices onPress={onClickAgendar}>
                <Icon source={Agenda} />
                <ServiceDescription>
                    <Text weight="600" >Agendar Serviços</Text>
                    <Text size={12}>Marque consultas e procedimentos sem filas</Text>
                </ServiceDescription>
            </Boxservices>

            <Boxservices onPress={onClickMeusAgendamentos}>
                <Icon source={ListIcon} />
                <ServiceDescription>
                    <Text weight="600">Meus Agendamentos</Text>
                    <Text size={12}>Ver histórico e próximos agendamentos</Text>
                </ServiceDescription>
            </Boxservices>

        </Container>
    )

}
