import styled from 'styled-components'

import LinearGradient from 'react-native-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import ShadowView from 'react-native-simple-shadow-view'
import Spinner from 'react-native-spinkit'

import { scale, percentage } from '../utils/scalling'

export const GradientBackground = styled(LinearGradient).attrs({
    colors: ['#5DD39E', '#348EAC'],
})`
    flex: 1;
`

export const KeyboardScrollView = styled(KeyboardAwareScrollView).attrs({
    contentContainerStyle: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})``

export const ButtonBack = styled.TouchableOpacity`
    position: absolute;
    top: 2%;
    left: 2%;
`

export const FormSeparator = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
`

export const SnowInput = styled.TextInput.attrs({
    placeholderTextColor: '#ffffff',
    autoCapitalize: 'none',
    multiline: false,
})`
    width: 80%;
    height: ${scale(38)}px;
    border-color: #ffffff;
    border-width: 3px;
    border-radius: ${scale(16)}px;
    font-family: ArgentumSans-Medium;
    font-size: ${scale(15)}px;
    color: #ffffff;
    text-align: center;
    margin-top: ${percentage(4)}px;
    padding-bottom: 0;
    padding-top: 0;
`

export const Touch = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    width: 80%;
    margin-top: ${scale(21)}px;
`

export const SnowButton = styled(ShadowView).attrs({})`
    height: ${scale(36)}px;
    background-color: #ffffff;
    border-radius: ${scale(14)}px;
    align-items: center;
    justify-content: center;
    shadow-color: #ffffff;
    shadow-opacity: 0.4;
    shadow-radius: 6px;
    shadow-offset: 0px 0px;
`

export const Label = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(15)}px;
    color: #32323b;
`

export const TransparentButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.2,
})`
    width: 80%;
    justify-content: center;
    margin-top: ${scale(10)}px;
    height: ${scale(38)}px;
`

export const SnowSpinner = styled(Spinner).attrs({
    type: 'ThreeBounce',
    color: '#ffffff',
    size: scale(72),
})`
    position: absolute;
    bottom: 10%;
`
