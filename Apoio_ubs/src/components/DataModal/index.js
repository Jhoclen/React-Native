import CustomModal from "../CustomModal";
import { Text } from "../Text";
import { FlatList, TouchableOpacity } from "react-native";
import { Container } from "./styles";
import Caixa from "../CaixaClick";

export default function DataModal({
  visible,
  onClose,
  agenda,
  handlerService,
}) {
  return (
    <CustomModal visible={visible} onClose={onClose}>
      <Container>
        <Text weight="600">O Que Você Precisa Hoje?</Text>
        <Text>Escolha o tipo de atendimento que deseja agendar</Text>

        <FlatList
          data={agenda}
          keyExtractor={(agenda) => agenda.id}
          renderItem={({ item: agenda }) => (
            <Caixa
              titulo={agenda.servico}
              description={agenda.description}
              icon={agenda.icon}
              onClick={() => {
                handlerService(agenda.id, agenda.servico);
              }}
            ></Caixa>
          )}
        />
      </Container>
    </CustomModal>
  );
}
