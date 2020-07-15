import styled from 'styled-components';

import { scale } from '../../../utils/scallingUtils';

export const Logo = styled.Image`
    height: ${scale(105)}px;
    resize-mode: contain;
`;

export const ButtonBack = styled.TouchableOpacity`
    position: absolute;
    top: 2%;
    left: 2%;
`;

export const PageTitle = styled.Text`
    font-family: 'ArgentumSans-SemiBold';
    font-size: ${scale(21)}px;
    color: #ffffff;
    margin-top: 15%;
    margin-bottom: 5%;
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

export const LabelVisible = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    text-decoration-line: underline;
    color: #ffffff;
`;