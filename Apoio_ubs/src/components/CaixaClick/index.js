import { Text } from "../Text";
import { Container, Boxservices, Icon, ServiceDescription } from "./styles";

export default function Caixa({titulo, description, onClick ,icon}){
    return(
         <Container>
             <Boxservices onPress={onClick}>
                  <Icon source={icon}/>
                    <ServiceDescription>
                        <Text weight="600" >{titulo}</Text>
                        <Text size={12}>{description}</Text>
                    </ServiceDescription>
            </Boxservices>
        
         </Container>
    );
}