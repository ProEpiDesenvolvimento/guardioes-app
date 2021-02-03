import styled from 'styled-components';

import { scale } from '../../../utils/scallingUtils';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    height: ${scale(160)}px;
    resize-mode: contain;
`;

export const WelcomeText = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(17)}px;
    color: #fff;
    margin-top: 2%;
    margin-bottom: 20%;
`;