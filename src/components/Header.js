import styled from 'styled-components/native'

import { TouchableOpacity } from 'react-native'

import { scale, percentage } from '../utils/scalling'

export const Container = styled.View`
    background-color: #f4f4f4;
`

export const HeaderNavigator = styled.View`
    width: 100%;
    background-color: #348eac;
    border-bottom-left-radius: ${scale(18)}px;
    border-bottom-right-radius: ${scale(18)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: ${percentage(10)}px;
    padding-horizontal: ${percentage(4)}px;
    padding-bottom: ${percentage(4)}px;
`

export const BackButton = styled(TouchableOpacity).attrs({
    activeOpacity: 0.2,
})``

export const ScreenTitle = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(18)}px;
    color: #ffffff;
`

export const Empty = styled.View`
    width: ${scale(38)}px;
`
