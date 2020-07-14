import styled from 'styled-components';

import { ActivityIndicator } from 'react-native';
import { scale } from '../../utils/scallingUtils';

export default styled(ActivityIndicator).attrs({
    color: "#ffffff",
    size: scale(35),
})`
    position: absolute;
    bottom: 10%;
`;