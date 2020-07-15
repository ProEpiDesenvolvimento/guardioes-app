import styled from 'styled-components';

import { TouchableOpacity } from 'react-native';

import { scale } from '../../utils/scallingUtils';

export default styled(TouchableOpacity).attrs({
    activeOpacity: 0.3,
})`
    width: 80%;
    justify-content: center;
    margin-top: ${scale(10)}px;
    height: ${scale(38)}px;
`;