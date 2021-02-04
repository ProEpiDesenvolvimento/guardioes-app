import styled from 'styled-components'

import { TouchableOpacity } from 'react-native'

import { scale } from '../../../utils/scalling'

export const ExitMap = styled(TouchableOpacity).attrs({
    activeOpacity: 0.2,
})`
    background-color: #348eac;
    border-radius: 100px;
    position: absolute;
    bottom: 3%;
    left: 4%;
    padding: ${scale(8)}px;
`

export const ConfirmMap = styled(TouchableOpacity).attrs({
    activeOpacity: 0.2,
})`
    background-color: #348eac;
    border-radius: 100px;
    position: absolute;
    bottom: 3%;
    right: 4%;
    padding: ${scale(8)}px;
`

export const MapFormMarker = styled.View`
    background-color: #ffffff;
    border-radius: ${scale(16)}px;
    flex-direction: row;
    padding: ${scale(10)}px;
`

export const MapFormText = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(12)}px;
    color: #32323b;
    margin-right: ${scale(5)}px;
`
