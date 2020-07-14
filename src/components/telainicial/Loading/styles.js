import styled from 'styled-components';

import { scale } from '../../../utils/scallingUtils';

export const Logo = styled.Image`
    height: ${scale(160)}px;
    resize-mode: contain;
    margin-bottom: 2%;
`;

export const LogoContainer = styled.View`
    height: ${scale(100)}px;
    flex-direction: row;
    justify-content: center;
`;

export const LogoWrapper = styled.View`
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-right: 5%;
    margin-left: 5%;
`;

export const LogoUnbProEpi = styled.Image`
    width: ${scale(60)}px;
    resize-mode: contain;
`;