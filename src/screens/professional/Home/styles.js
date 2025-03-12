import styled from 'styled-components/native'

import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native'
import ShadowView from 'react-native-simple-shadow-view'

import { scale, percentage, vPercentage } from '../../../utils/scalling'

export const Container = styled.View`
    flex: 1;
    background-color: #348eac;
`

export const ScrollViewStyled = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#f4f4f4',
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 20,
    },
})``

export const Background = styled(LinearGradient).attrs({
    colors: ['#348eac', '#5DD39E'],
})`
    min-height: ${vPercentage(42)}px;
    width: 100%;
    border-bottom-left-radius: ${scale(25)}px;
    border-bottom-right-radius: ${scale(25)}px;
`

export const MenuBars = styled(TouchableOpacity).attrs({
    activeOpacity: 0.2,
})`
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 6%;
    top: 6%;
    padding: 2%;
`

export const Button = styled(TouchableOpacity).attrs({
    activeOpacity: 0.5,
})`
    align-items: center;
    justify-content: center;
`

const margin = scale(25)

export const UserView = styled.View`
    position: absolute;
    height: ${100 - margin}%;
    width: 100%;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
`

export const NamesContainer = styled.View`
    margin-left: ${scale(8)}%;
`

export const TextName = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(18)}px;
    color: white;
    include-font-padding: false;
    margin-bottom: ${scale(8)}px;
`

export const AppName = styled.Text`
    font-size: ${scale(16)}px;
    font-family: ArgentumSans;
    color: white;
    include-font-padding: false;
`

export const StatusContainer = styled(ShadowView).attrs({})`
    width: 88%;
    margin-top: ${-margin}%;
    background: white;
    border-radius: ${scale(20)}px;
    padding-vertical: ${percentage(12)}px;
    align-items: center;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 6px;
    shadow-offset: 0px 4px;
`

export const TextStyle = styled.Text`
    margin-bottom: ${scale(20)}px;
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    color: #32323b;
`

export const StatusBemMal = styled.View`
    align-self: center;
    flex-direction: row;
`

// In this case, shadow only shows on iOS
const BemMal = `
  height: ${scale(50)}px;
  width: ${scale(114)}px;
  align-items: center;
  justify-content: center;
  shadow-opacity: 0.4;
  shadow-radius: 6px;
  shadow-offset: 0px 0px;
`

export const Bem = styled(TouchableOpacity).attrs({
    activeOpacity: 0.5,
})`
    ${BemMal}
    background: ${(props) => (props.disabled ? '#c4c4c4' : '#348eac')};
    border-bottom-left-radius: ${scale(18)}px;
    border-top-left-radius: ${scale(18)}px;
    margin-right: ${scale(2)}px;
    shadow-color: ${(props) => (props.disabled ? '#c4c4c4' : '#348eac')};
`

export const Mal = styled(TouchableOpacity).attrs({
    activeOpacity: 0.5,
})`
    ${BemMal}
    background: ${(props) => (props.disabled ? '#c4c4c4' : '#f18f01')};
    border-bottom-right-radius: ${scale(18)}px;
    border-top-right-radius: ${scale(18)}px;
    margin-left: ${scale(2)}px;
    shadow-color: ${(props) => (props.disabled ? '#c4c4c4' : '#f18f01')};
`

export const StatusText = styled.Text`
    font-size: ${scale(14)}px;
    font-family: ArgentumSans-Medium;
    color: white;
`

export const Tips = styled.Text`
    width: 88%;
    font-size: ${scale(16)}px;
    font-family: ArgentumSans-SemiBold;
    color: #32323b;
    margin-top: ${percentage(7)}px;
    margin-bottom: ${percentage(6)}px;
    margin-left: ${scale(20)}px;
`

export const TipButton = styled(TouchableOpacity).attrs({
    activeOpacity: 0.5,
})`
    width: 88%;
    margin-bottom: ${percentage(7)}px;
`

export const Users = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.6);
    align-items: center;
    justify-content: center;
`

export const UserSelector = styled(ShadowView).attrs({})`
    width: 88%;
    background-color: #ffffff;
    border-radius: ${scale(20)}px;
    shadow-color: #000000;
    shadow-opacity: 0.2;
    shadow-radius: 6px;
    shadow-offset: 0px 4px;
`

export const UserScroll = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingTop: scale(20),
        paddingHorizontal: scale(20),
    },
})``

export const UserWrapper = styled.View`
    width: 46%;
    margin-bottom: ${percentage(6)}px;
`

export const UserName = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: #348eac;
    text-align: center;
    margin-top: ${scale(10)}px;
`
