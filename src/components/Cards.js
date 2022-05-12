import styled from 'styled-components'

import ShadowView from 'react-native-simple-shadow-view'
import { TouchableOpacity } from 'react-native'

import { scale, percentage } from '../utils/scalling'

export const ScrollViewStyled = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#f4f4f4',
        flexGrow: 1,
        paddingTop: percentage(7),
        paddingHorizontal: percentage(7),
    },
})``

export const CardWrapper = styled.View`
    padding-horizontal: ${scale(9)}px;
    margin-bottom: ${percentage(6)}px;
`

export const CardTitle = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(16)}px;
    color: #32323b;
`

const Card = `
    flex-direction: row;
    border-radius: ${scale(18)}px;
    margin-bottom: ${percentage(7)}px;
    padding: ${scale(15)}px;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 6px;
    shadow-offset: 0px 4px;
`

export const CardBlue = styled(ShadowView).attrs({})`
    ${Card}
    background-color: #348EAC;
`

export const CardWhite = styled(ShadowView).attrs({})`
    ${Card}
    background-color: #ffffff;
`

const Name = `
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    include-font-padding: false;
    margin-bottom: ${scale(5)}px;
`

export const CardNameBlue = styled.Text`
    ${Name}
    color: #ffffff;
`

export const CardNameWhite = styled.Text`
    ${Name}
    color: #348eac;
`

const Details = `
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    include-font-padding: false;
`

export const CardDetailsBlue = styled.Text`
    ${Details}
    color: #ffffff;
`

export const CardDetailsWhite = styled.Text`
    ${Details}
    color: #c4c4c4;
`

export const AvatarWrapper = styled.View`
    justify-content: center;
    padding-right: ${percentage(4)}px;
`

export const InfoContainer = styled.View`
    flex: 1;
    flex-direction: row;
`

export const InfoWrapper = styled.View`
    flex: 1;
    justify-content: center;
`

export const ButtonsWrapper = styled.View`
    justify-content: center;
`

export const Button = styled(TouchableOpacity).attrs({
    activeOpacity: 0.2,
})``
