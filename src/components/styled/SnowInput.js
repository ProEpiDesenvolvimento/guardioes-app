import styled from 'styled-components';

import { TextInput } from 'react-native';

export default styled(TextInput).attrs({
    placeholderTextColor: "#ffffff",
    autoCapitalize: 'none',
    multiline: false,
})`
    width: 80%;
    height: 45px;
    border-color: #ffffff;
    border-width: 3px;
    border-radius: 18px;
    font-family: ArgentumSans-Medium;
    font-size: 18px;
    color: #ffffff;
    text-align: center;
    margin-top: 4%;
    padding-bottom: 0;
    padding-top: 0;
`;