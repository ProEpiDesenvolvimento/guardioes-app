import styled from 'styled-components/native'

import Feather from 'react-native-vector-icons/Feather'

import { scale } from '../../utils/scalling'

export const Container = styled.View`
    width: 100%
    align-items: center;
`

export const ModalView = styled.SafeAreaView`
    margin: auto;
    background-color: transparent;
    width: 90%;
    flex: 1;
    flex-direction: column;
    justify-content: center;
`

export const ModalFade = styled.View`
    background-color: 'rgba(0, 0, 0, 0.6)';
    height: 100%;
`

export const TextInputModal = styled.TextInput`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: #32323b;
    width: 80%;
    text-align: left;
`
export const TextInputIcon = styled(Feather).attrs({
    name: 'search',
    size: scale(28),
    color: 'rgba(0, 0, 0, 0.6)',
})`
    padding: 10px;
`
export const TextInputView = styled.View`
    background-color: white;
    flex-direction: row;
    border-radius: ${scale(12)}px;
    width: 100%;
`

export const ScrollToView = styled.View`
    max-height: 70%;
`

export const FlatModalView = styled.FlatList`
    background-color: white;
    width: 100%;
    margin-top: ${scale(10)}px;
    border-radius: ${scale(12)}px;
`

export const TextModalView = styled.Text`
    font-family: ArgentumSans;
    color: #348eac;
    padding: ${scale(10)}px;
    font-size: ${scale(14)}px;
    max-height: ${scale(60)}px;
    text-align: center;
`

export const CancelText = styled.Text`
    color: white;
    width: 100%
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    text-align: center;
`

export const AutocompleteModal = styled.Modal.attrs({
    animationType: 'slide',
    transparent: true,
})``

export const AutocompleteButton = styled.TouchableOpacity`
    background-color: white;
    border-radius: ${scale(14)}px;
    align-items: center;
    min-height: ${scale(36)}px;
    border-radius: ${scale(12)}px;
    width: 100%;
`

export const AutocompleteText = styled.Text`
    width: 100%
    font-family: ArgentumSans;
    text-align: center;
    font-size: ${scale(14)}px;
    color: #32323b;
    padding: ${scale(10)}px;
`

export const CancelTouch = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    background-color: #348eac;
    color: white;
    padding: ${scale(10)}px;
    border-radius: ${scale(14)}px;
    margin-top: ${scale(10)}px;
    width: 100%;
    text-align: center;
`

export const NoResultText = styled.Text`
    font-family: ArgentumSans;
    color: #32323b;
    padding: ${scale(10)}px;
    font-size: ${scale(14)}px;
    max-height: ${scale(60)}px;
    text-align: center;
`
