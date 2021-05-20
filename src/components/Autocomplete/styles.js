import styled from 'styled-components/native'
import { scale } from '../../utils/scalling'
import Feather from 'react-native-vector-icons/Feather'

export const Container = styled.View`
    width: 100%
    align-items: center;
`

export const ModalView = styled.SafeAreaView`
    margin: auto;
    backgroundColor: transparent;
    width: 90%;
    flex: 1;
    flexDirection: column;
    justifyContent: center;
`

export const ModalFade = styled.View`
    background-color: 'rgba(0, 0, 0, 0.6)';
    height: 100%;
`

export const TextInputModal = styled.TextInput`
    fontFamily: 'ArgentumSans';
    width: 80%;
    text-align: left; 
`
export const TextInputIcon = styled(Feather).attrs({
    name: 'search',
    size: 30,
    color: 'rgba(0, 0, 0, 0.6)'
})`
    padding: 10px
`
export const TextInputView = styled.View`
    background-color: white;
    flex: 1;
    flexDirection: row;
    borderRadius: ${scale(12)}px;
    width: 100%; 
    maxHeight: ${scale(50)}px;
`

export const ScrollToView = styled.View`    
    maxHeight: 70%;
`

export const ScrollModalView = styled.ScrollView`
    background-color: white;
    width: 100%;
    margin-top: ${scale(10)}px;
    borderRadius: ${scale(12)}px;
`

export const TextModalView = styled.Text`
    fontFamily: 'ArgentumSans';
    color: #32323B;
    padding: ${scale(10)}px;
    fontSize: ${scale(14)}px;
    max-height: ${scale(60)}px;
    text-align: center;
`

export const CancelText = styled.Text`
    color: white;
    width: 100%
    font-family: 'ArgentumSans';
    text-align: center;
`

export const AutocompleteModal = styled.Modal.attrs({
    animationType: "slide",
    transparent: true,
})`
`

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
    font-family: 'ArgentumSans';
    text-align: center;
    fontSize: ${scale(14)}px;
    padding-vertical: ${scale(10)}px;
`

export const CancelTouch = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    background-color: #348eac;
    color: white;
    padding: ${scale(10)}px;
    borderRadius: ${scale(14)}px;
    marginTop: ${scale(10)}px;
    width: 100%
    font-family: 'ArgentumSans';
    text-align: center;
`