import styled from 'styled-components';

import Spinner from 'react-native-spinkit';
import { scale } from '../../utils/scallingUtils';

export default styled(Spinner).attrs({
    type: "ThreeBounce",
    color: "#ffffff",
    size: scale(72)
})`
    position: absolute;
    bottom: 0;
    bottom: 10%;
`;