import styled from 'styled-components/native'
import { scale } from '../../utils/scalling'

export const ModalView = styled.View`
    margin: auto;
    backgroundColor: transparent;
    borderRadius: ${scale(12)}px;
    width: 90%;
    alignItems: center;
    color: #32323B;
    height: auto;
`

export const ModalFade = styled.View`
    background-color: 'rgba(0, 0, 0, 0.6)';
    height: 100%;
`

export const TextInputModal = styled.TextInput`
    background-color: white;
    fontFamily: 'ArgentumSans';
    borderRadius: ${scale(12)}px;
    width: 100%;
    text-align: center; 
`

export const ScrollModalView = styled.ScrollView`
    background-color: white;
    width: 100%;
    margin-top: ${scale(10)}px;
    borderRadius: ${scale(12)}px;
    max-height: 70%
`

export const TextModalView = styled.Text`
    fontFamily: 'ArgentumSans';
    color: #32323B;
    padding: ${scale(10)}px;
    fontSize: ${scale(14)}px;
    text-align: center;
`

export const CancelButton = styled.Text`
    background-color: #348eac;
    color: white;
    padding: ${scale(10)}px;
    borderRadius: ${scale(14)}px;
    marginTop: ${scale(10)}px;
    width: 100%
    font-family: 'ArgentumSans';
    text-align: center;
`

export const AutocompleteModal = styled.Modal.attrs({
    animationType: "slide",
    transparent: true,
})`
`

export const AutocompleteText = styled.Text`
    background-color: white;
    font-family: 'ArgentumSans';
    border-radius: ${scale(14)}px;
    height: ${scale(30)}px;
    text-align: center;
    width: 90%;
`