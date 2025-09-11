import styled from 'styled-components/native'
import { TextInputMask } from "react-native-masked-text";

export const Container = styled.View`
    flex: 1;
    backgroundColor: #3e7da1ff;
    alignItems: center;
    justifyContent: center;
`;

export const Titulo = styled.Text`
    fontSize: 36px;
    padding:10px;
    top: -1px;
    FontWeight: bold;
`;

export const Img = styled.Image`
    width: 200px;
    height:200px;
    justifyContent:'center';
    alignItems:'center';
    top: -30px;
    left: 15px;
`;

export const Label= styled.Text`
    fontSize:20px;
    padding:16px;
`;

export const Input = styled(TextInputMask).attrs({
 type:"money",
 options:{
     precision: 2,
     separator: ",",
     delimiter: ".",
     unit: "R$ ",
     suffixUnit: ""
     }   
})`
    backgroundColor:'rgba(235, 235, 224, 1)';
    width:300px;
    textAlign: center;
    borderRadius:30px;
    marginBottom:15px;
`;





export const Button = styled.Button`
      
`;
