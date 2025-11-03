import CustomModal from "../CustomModal";
import { FlatList  } from "react-native"
import { View } from "react-native";
import {Text} from '../Text'

export default function EscolherDataModel({visible, onClose, agenda,}){
    return(
        <CustomModal visible={visible} onClose={onClose}>
            <FlatList
            data={agenda}
            keyExtractor={agenda => agenda.id}
             renderItem={({ item : agenda}) =>(

                <View>
                <Text size={30}>testando</Text>

                </View>   
             )}
            />

        </CustomModal>
    );
}