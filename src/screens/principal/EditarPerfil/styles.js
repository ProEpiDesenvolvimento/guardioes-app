import styled from 'styled-components'

import { TouchableOpacity } from 'react-native'

import { scale } from '../../../utils/scalling'

export const Delete = styled(TouchableOpacity).attrs({
    activeOpacity: 0.5,
})`
    background-color: #348eac;
    border-radius: 100px;
    position: absolute;
    top: 0;
    right: 0;
    padding: ${scale(8)}px;
`

export const ButtonInput = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    min-height: ${scale(36)}px;
    width: 90%;
    justify-content: center;
    background-color: #ffffff;
    border-radius: ${scale(12)}px;
    padding: ${scale(8)}px;
    padding-vertical: ${scale(6)}px;
    padding-horizontal: ${scale(12)}px;
`

export const ButtonInputLabel = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(13)}px;
    color: #32323b;
    text-align: center;
`
