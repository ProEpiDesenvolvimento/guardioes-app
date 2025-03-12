import styled from 'styled-components/native'

import { TouchableOpacity } from 'react-native'

import { scale } from '../../../utils/scalling'

export const Container = styled.View`
    flex: 1;
    justify-content: flex-end;
`

export const ButtonMapChange = styled(TouchableOpacity).attrs({
    activeOpacity: 0.2,
})`
    height: 5%;
    width: 50%;
    align-items: center;
    justify-content: center;
    background-color: rgba(22, 107, 135, 0.25);
    border-radius: 100px;
    border-color: rgba(22, 107, 135, 1);
    border-width: 1px;
    position: absolute;
    left: 25%;
    bottom: 5%;
`

export const TextMapChange = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: rgba(22, 107, 135, 1);
`
