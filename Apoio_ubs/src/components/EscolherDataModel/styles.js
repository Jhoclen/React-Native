import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex: 1;
    
`;
export const Header = styled.View`
    padding: 20px;
    background-color: #fff;
    border-bottom-width: 1;
    border-Bottom-Color: #E2E8F0


`;

export const ServiceTitle = styled.Text`
    font-Size: 22px;
    font-Weight:600;
    Color: #1E293B;
    margin-Bottom: 4px   

`;

export const Subtitle = styled.Text`
    font-Size: 14px;
    color: #64748B

`;

export const Section = styled.View`
    padding: 20px;
    margin-Bottom: 10px


`;

export const SectionHeader = styled.View`
    flex-Direction: 'row';
    align-Items: 'center';
    margin-Bottom: 16px


`;
export const Badge = styled.View`
    width: 32px;
    height: 32px;
    border-Radius: 10px;
    background-Color: #CFFAFE;
    justify-Content: 'center';
    align-Items: 'center';
    margin-Right: 12px;


`;

export const BadgeText = styled.Text`
    font-Size: 16px;
    font-Weight: 600;
    color:#0891B2;
    

`;

export const SectionTitle = styled.Text`
    font-Size: 18px;
    font-Weight: 600;
    color: #1E293B
`;

export const WarningBox = styled.View`
    background-Color: #FEF3C7;
    border-Width: 2px;
    border-Color: #FCD34D;
    border-Radius: 16px;
    padding: 20px;
    align-Items: 'center'

`;
export const WarningText = styled.Text`
    font-Size: 14;
    color: #92400E;
    font-Weight: 600;
    text-Align: 'center'
`;
export const TimeSlotsGrid = styled.View`
    flex-Direction: 'row';
    flex-Wrap: 'wrap';
    justify-Content:'space-between'

`;
export const ConfirmSection = styled.View`
    padding: 20px;

`;
export const SummaryBox = styled.View`
    background-Color: #F0F9FF;
    border-Radius: 12px;
    padding: 16px;
    margin-Bottom: 16px;
    align-Items: 'center'
`;

export const SummaryText = styled.Text`
    font-Size: 14px;
    font-Weight: 600;
    color:#0369A1
`;
export const ConfirmButtonText = styled.Text`
    font-Size: 18px;
    font-Weight: 600;
    color:#fff;
    
    
`;