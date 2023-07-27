import styled from 'styled-components/native'

import ShadowView from 'react-native-simple-shadow-view'

import { scale, percentage } from '../../utils/scalling'

export const NoticiaContainer = styled(ShadowView).attrs({})`
    background-color: #5dd39e;
    border-radius: ${scale(18)}px;
    padding: ${scale(16)}px;
    margin-bottom: ${percentage(7)}px;
    shadow-color: #5dd39e;
    shadow-opacity: 0.4;
    shadow-radius: 6px;
    shadow-offset: 0px 0px;
`

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const TwitterInfo = styled.View``

export const TwitterName = styled.Text`
    font-size: ${scale(16)}px;
    font-family: ArgentumSans-SemiBold;
    color: #ffffff;
`

export const TwitterHandle = styled.Text`
    font-size: ${scale(14)}px;
    font-family: ArgentumSans-Medium;
    color: #348eac;
`

export const Data = styled.Text`
    font-size: ${scale(14)}px;
    font-family: ArgentumSans-Medium;
    color: #ffffff;
`

export const NoticiaText = styled.Text`
    font-size: ${scale(14)}px;
    color: #ffffff;
    font-family: ArgentumSans;
    margin-top: ${scale(10)}px;
`

export const Imagem = styled.Image`
    margin-top: ${scale(6)}px;
    height: ${scale(200)}px;
    resize-mode: cover;
    border-radius: 10px;
`

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})``
