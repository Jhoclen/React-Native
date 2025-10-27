import styled from "styled-components/native";

export const Container = styled.View`
    margin: 24px 24px 0px;

`;

export const Boxservices = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 20px;
  margin-top: 24px;
  border-width:0.2px;
  padding: 15px;  
  border-radius: 10px;
  border-color: blue;

`;

export const Icon = styled.Image`
    width: 60px;
    height: 60px;
    top: 5px;
`;

export const ServiceDescription = styled.View`
    gap: 8px;
`;