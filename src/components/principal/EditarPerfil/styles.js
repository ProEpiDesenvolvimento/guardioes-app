import styled from 'styled-components';

import { TouchableOpacity } from 'react-native';

import { scale } from '../../../utils/scallingUtils';

export const Delete = styled(TouchableOpacity).attrs({
    activeOpacity: 0.5
})`
    background-color: #348EAC;
    border-radius: 100px;
    position: absolute;
    top: 0;
    right: 0;
    padding: ${scale(8)}px;
`;