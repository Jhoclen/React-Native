import CustomModal from "../CustomModal";
import { FlatList  } from "react-native"

export default function EscolherDataModel({visible, onClose, agenda,}){
    return(
        <CustomModal visible={visible} onClose={onClose}>
            <FlatList
            data={agenda}
            keyExtractor={agenda => agenda.id}
             renderItem={({ item : agenda}) =>(

                null
             )}
            />

        </CustomModal>
    );
}