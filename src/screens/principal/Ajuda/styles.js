import styled from 'styled-components'

import ShadowView from 'react-native-simple-shadow-view'

import { scale, percentage } from '../../../utils/scalling'

export const Help = styled.View`
    background-color: #f4f4f4;
    flex: 1;
    padding-top: ${percentage(8)}px;
    padding-horizontal: ${percentage(7)}px;
`

export const Box = styled(ShadowView).attrs({})`
    width: 100%;
    background-color: #f4f4f4;
    border-radius: ${scale(18)}px;
    margin-bottom: ${percentage(7)}px;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 6px;
    shadow-offset: 0px 4px;
`

export const Button = styled.TouchableOpacity`
    width: 100%;
    background-color: #ffffff;
    flex-direction: row;
    border-radius: ${scale(18)}px;
    margin-right: ${percentage(4)}px;
    padding: ${scale(15)}px;
`

export const IconWrapper = styled.View`
    margin-right: ${percentage(4)}px;
`

export const InfoWrapper = styled.View`
    flex: 1;
    justify-content: center;
`

export const Title = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    color: #348eac;
`
