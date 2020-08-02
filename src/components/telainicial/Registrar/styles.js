import styled from 'styled-components';

import { scale, percentage } from '../../../utils/scallingUtils';

export const ButtonBack = styled.TouchableOpacity`
    position: absolute;
    top: 2%;
    left: 2%;
`;

export const PageTitle = styled.Text`
    font-family: 'ArgentumSans-SemiBold';
    font-size: ${scale(21)}px;
    color: #ffffff;
    margin-top: 10%;
    margin-bottom: 10%;
`;

export const FormLabel = styled.Text`
    align-self: flex-start;
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: #ffffff;
    text-align: left;
    margin-bottom: ${scale(12)}px;
`;

export const FormTip = styled.Text`
    align-self: flex-start;
    font-family: ArgentumSans;
    font-size: ${scale(12)}px;
    color: #ffffff;
    margin-left: ${scale(12)}px;
`;

export const FormSeparator = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
`;

export const Label = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(15)}px;
    color: #32323b;
`;