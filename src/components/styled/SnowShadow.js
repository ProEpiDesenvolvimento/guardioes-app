import styled from 'styled-components';

import ShadowView from 'react-native-simple-shadow-view';

import { scale } from '../../utils/scallingUtils';

export default styled(ShadowView).attrs({
})`
    width: 80%;
    background-color: #ffffff;
    border-radius: 20px;
    margin-top: ${scale(21)}px;
    shadow-color: #ffffff;
    shadow-opacity: 0.5;
    shadow-radius: 8px;
`;