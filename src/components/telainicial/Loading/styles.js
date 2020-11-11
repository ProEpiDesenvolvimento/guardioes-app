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
    margin-bottom: 2%;
`;

export const LogoContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const LogoWrapper = styled.View`
    align-items: center;
    justify-content: center;
    margin-horizontal: 5%;
`;

export const LogoUnbProEpi = styled.Image`
    width: ${scale(60)}px;
    resize-mode: contain;
`;