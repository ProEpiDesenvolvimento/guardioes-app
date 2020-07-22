import styled from 'styled-components';

import { scale, percentage } from '../../utils/scallingUtils';

export const HeaderNavigator = styled.View`
    width: 100%;
    background-color: #348EAC;
    border-bottom-left-radius: ${scale(18)}px;
    border-bottom-right-radius: ${scale(18)}px;
    flex-direction: row;
    justify-content: center;
    padding-top: ${percentage(10)}px;
    padding-horizontal: ${percentage(4)}px;
    padding-bottom: ${percentage(4)}px;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 15px;
    bottom: 10px;
`;

export const ScreenTitle = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(18)}px;
    color: #ffffff;
`;