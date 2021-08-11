import styled from 'styled-components'

import { ScrollView, TouchableOpacity } from 'react-native'
import ShadowView from 'react-native-simple-shadow-view'
import DatePicker from 'react-native-datepicker'
import { CheckBox } from 'react-native-elements'

import { scale, percentage } from '../../../utils/scalling'

export const ScrollViewStyled = styled(ScrollView).attrs({
    contentContainerStyle: {
        flexGrow: 1,
        paddingVertical: percentage(8),
        paddingHorizontal: percentage(7),
    },
})``

export const User = styled(ShadowView).attrs({})`
    width: 100%;
    background-color: #ffffff;
    border-radius: ${scale(18)}px;
    flex-direction: row;
    margin-bottom: ${percentage(6)}px;
    padding: ${scale(15)}px;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 6px;
    shadow-offset: 0px 4px;
`

export const IconWrapper = styled.View`
    margin-right: ${percentage(4)}px;
`

export const InfoWrapper = styled.View`
    flex: 1;
    justify-content: center;
`

export const Name = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    color: #348eac;
`

export const CheckBoxStyled = styled(CheckBox).attrs({
    containerStyle: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: scale(15),
        borderWidth: 0,
        marginLeft: 0,
        marginRight: 0,
    },
    textStyle: {
        fontFamily: 'ArgentumSans',
        fontSize: scale(14),
        color: '#32323B',
    },
    iconType: 'feather',
    checkedIcon: 'check-circle',
    uncheckedIcon: 'circle',
    checkedColor: '#348EAC',
    uncheckedColor: '#c4c4c4',
    size: scale(25),
})``

export const DateSince = styled.View`
    width: 100%;
    align-self: center;
    align-items: center;
    margin-top: ${scale(5)}px;
`

export const DateText = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: #348eac;
    text-align: center;
    margin-bottom: ${scale(5)}px;
`

export const DateSelector = styled(DatePicker).attrs({
    useNativeDriver: true,
    showIcon: true,
    androidMode: 'spinner',
    customStyles: {
        dateInput: {
            borderWidth: 0,
        },
        dateText: {
            fontFamily: 'ArgentumSans',
            fontSize: scale(13),
            color: '#ffffff',
        },
    },
})`
    width: 95%;
    background-color: #348eac;
    border-radius: ${scale(12)}px;
`

export const FormTitleWrapper = styled.View`
    margin-top: ${scale(20)}px;
    margin-bottom: ${scale(10)}px;
`

export const FormTitle = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(16)}px;
    color: #348eac;
    text-align: left;
    margin-left: ${scale(8)}px;
`

export const Button = styled(TouchableOpacity).attrs({
    activeOpacity: 0.5,
})`
    margin-top: ${scale(20)}px;
`
