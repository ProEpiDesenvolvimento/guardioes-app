import styled from 'styled-components';

import { TouchableHighlight } from 'react-native';

export default styled(TouchableHighlight).attrs({
    underlayColor: "#c4c4c4",
})`
    background-color: #fff;
    border-radius: 16px;
    align-items: center;
    justify-content: center;
    height: 45px;
    width: 100%;
`;