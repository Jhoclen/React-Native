
import { Text } from "../Text"
import { Container, Boxservices, Icon, ServiceDescription } from "./styles";
import Agenda from "../../assets/image/agenda.png"
import ListIcon from "../../assets/image/verificado.png";
import FilaIcon from "../../assets/image/fila.png";


export default function Services({ onClickAgendar, onClickMeusAgendamentos, onClickFila }) {
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
                    <Text size={12}>Ver próximos agendamentos</Text>
                </ServiceDescription>
            </Boxservices>

            <Boxservices onPress={onClickFila}>
                <Icon source={FilaIcon} />
                <ServiceDescription>
                    <Text weight="600">Fila de Atendimento</Text>
                    <Text size={12}>Veja a ordem de chamadas</Text>
                </ServiceDescription>
            </Boxservices>

        </Container>
    )

}
