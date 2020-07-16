import styled from 'styled-components';

import { scale, percentage } from '../../../utils/scallingUtils';

export const ButtonBack = styled.TouchableOpacity`
    position: absolute;
    top: 2%;
    left: 2%;
`;

export const ScreenView = styled.View`
    flex: 0;
    justify-content: center;
    align-items: center;
`;

export const PageTitle = styled.Text`
    font-family: 'ArgentumSans-SemiBold';
    font-size: ${scale(21)}px;
    color: #ffffff;
    margin-top: 5%;
    margin-bottom: 15%;
`;

export const LabelWrapper = styled.Text`
    width: 80%;
    margin-bottom: ${percentage(2)}px;
`;

export const InputLabel = styled.Text`
    font-family: 'ArgentumSans-Medium';
    font-size: ${scale(15)}px;
    color: #ffffff;
`;

export const Label = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(15)}px;
    color: #32323b;
`;