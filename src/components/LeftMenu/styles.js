import styled from 'styled-components/native'

import ShadowView from 'react-native-simple-shadow-view'
import { Platform, TouchableOpacity } from 'react-native'

import { scale, percentage } from '../../utils/scalling'

export const ScrollViewStyled = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#ffffff',
        borderTopRightRadius: scale(28),
        borderBottomRightRadius: Platform.OS === 'ios' ? scale(28) : 0,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : scale(1),
        borderColor: '#f4f4f4',
        flexGrow: 1,
    },
})``

export const Button = styled(TouchableOpacity).attrs({
    activeOpacity: 0.5,
})``

export const AvatarContainer = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: center;
    margin-vertical: ${percentage(10)}px;
`

const option = `
  margin-bottom: ${scale(15)}px;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  align-items: center;
  border-radius: ${scale(18)}px;
  margin-right: ${scale(16)}px;
  margin-left: ${scale(16)}px;
  padding: ${scale(10)}px;
  shadow-opacity: 0.4;
  shadow-radius: 6px;
  shadow-offset: 0px 0px;
`

export const UserOptionBlue = styled(ShadowView).attrs({})`
    ${option}
    background-color: #348eac;
    shadow-color: #348eac;
`

export const UserOptionGreen = styled(ShadowView).attrs({})`
    ${option}
    background-color: #5DD39E;
    shadow-color: #5dd39e;
`

export const TextOption = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(14)}px;
    margin-left: ${scale(16)}px;
    color: white;
`

export const Aplicativo = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(16)}px;
    margin-top: ${percentage(5)}px;
    margin-bottom: ${scale(15)}px;
    margin-left: ${scale(8)}%;
`

export const SocialContainer = styled.View`
    flex-direction: row;
    margin-top: ${percentage(5)}px;
    margin-bottom: ${percentage(8)}px;
    margin-left: ${scale(75)}px;
    margin-right: ${scale(75)}px;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`

export const RedeSocial = styled(ShadowView).attrs({})`
    border-radius: 100px;
    background-color: #348eac;
    padding: ${scale(10)}px;
    shadow-color: #348eac;
    shadow-opacity: 0.4;
    shadow-radius: 6px;
    shadow-offset: 0px 0px;
`
