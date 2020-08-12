import styled from 'styled-components';

import { TextInput } from 'react-native';

import { scale, percentage } from '../../utils/scallingUtils';

export default styled(TextInput).attrs({
    placeholderTextColor: "#ffffff",
    autoCapitalize: 'none',
    multiline: false,
})`
    width: 80%;
    height: ${scale(36)}px;
    border-color: #ffffff;
    border-width: 3px;
    border-radius: 16px;
    font-family: ArgentumSans-Medium;
    font-size: ${scale(15)}px;
    color: #ffffff;
    text-align: center;
    margin-top: ${percentage(4)}px;
    padding-bottom: 0;
    padding-top: 0;
`;