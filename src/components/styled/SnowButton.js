import styled from 'styled-components';

import { TouchableOpacity } from 'react-native';

import { scale } from '../../utils/scallingUtils';

export default styled(TouchableOpacity).attrs({
    activeOpacity: 0.3,
})`
    background-color: #fff;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    height: ${scale(36)}px;
    width: 100%;
`;