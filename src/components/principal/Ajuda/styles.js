import styled from 'styled-components';

import ShadowView from 'react-native-simple-shadow-view';

import { scale, percentage } from '../../../utils/scallingUtils';

export const Help = styled.View`
    flex: 1;
    padding-top: ${percentage(7)}px;
    padding-horizontal: ${percentage(7)}px;
`;

export const Box = styled(ShadowView).attrs({
})`
    width: 100%;
    background-color: #ffffff;
    flex-direction: row;
    border-radius: ${scale(18)}px;
    margin-bottom: ${percentage(7)}px;
    padding: ${scale(15)}px;
    shadow-color: #000000;
    shadow-opacity: 0.2;
    shadow-radius: 10px;
    shadow-offset: 0px 4px;
`;

export const IconWrapper = styled.View`
    margin-right: ${percentage(4)}px;
`;

export const InfoContainer = styled.View`
    flex: 1;
    flex-direction: row;
`;

export const InfoWrapper = styled.View`
    flex: 1;
    justify-content: center;
`;

export const Name = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    color: #348EAC;
`;