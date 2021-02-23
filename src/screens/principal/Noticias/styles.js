import styled from 'styled-components/native'

import ShadowView from 'react-native-simple-shadow-view'

import { scale, percentage } from '../../../utils/scalling'

export const Container = styled.View`
    background-color: #348eac;
    flex: 1;
`

export const NoticiasList = styled.FlatList.attrs({
    contentContainerStyle: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: scale(28),
        borderTopRightRadius: scale(28),
        flexGrow: 1,
        paddingTop: percentage(6),
        paddingHorizontal: percentage(7),
        paddingBottom: scale(20), // Same as TabBar margin top
    },
})``

export const TwitterOption = styled.View`
    align-self: center;
    flex-direction: row;
    margin-bottom: ${percentage(7)}px;
`

const options = `
    height: ${scale(50)}px;
    width: 48%;
    align-items: center;
    justify-content: center;
`

export const OptionLeft = styled.TouchableOpacity`
    ${options}
    background: ${(props) => (props.selected ? '#348eac' : '#5dd39e')};
    border-bottom-left-radius: ${scale(18)}px;
    border-top-left-radius: ${scale(18)}px;
    margin-right: ${scale(1)}px;
`

export const OptionRight = styled.TouchableOpacity`
    ${options}
    background: ${(props) => (props.selected ? '#348eac' : '#5dd39e')};
    border-bottom-right-radius: ${scale(18)}px;
    border-top-right-radius: ${scale(18)}px;
    margin-left: ${scale(1)}px;
`

export const OptionText = styled.Text`
    font-size: ${scale(14)}px;
    font-family: ArgentumSans-Medium;
    color: white;
`

export const NoticiasTitle = styled.Text`
    font-size: ${scale(19)}px;
    color: #32323b;
    font-family: ArgentumSans-SemiBold;
    include-font-padding: false;
    margin-bottom: ${scale(5)}px;
`

export const FeedTitle = styled.Text`
    font-size: ${scale(14)}px;
    font-family: ArgentumSans-Medium;
    color: #c4c4c4;
    include-font-padding: false;
    margin-bottom: ${percentage(6)}px;
`

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
