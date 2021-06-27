import styled from 'styled-components'

import { getStatusBarHeight } from 'react-native-status-bar-height'

export const StatusBarIOS = styled.View`
    width: 100%;
    height: ${getStatusBarHeight}px;
    background-color: ${(props) =>
        props.backgroundColor ? props.backgroundColor : 'transparent'};
    position: absolute;
    z-index: 100;
`
