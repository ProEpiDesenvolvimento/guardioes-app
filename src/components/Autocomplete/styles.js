import styled from 'styled-components/native'
import { scale } from '../../utils/scalling'

export const ModalView = styled.View`
    margin: auto;
    backgroundColor: white;
    borderRadius: ${scale(12)};
    width: 90%;
    alignItems: center;
    color: #32323B;
    height: auto;
`

export const TextModalView = styled.Text`
    fontFamily: 'ArgentumSans';
    color: #32323B;
    fontSize: ${scale(14)};
`

export const CancelButton = styled.Button`
    backgroundColor: #ffffff,
    borderRadius: ${scale(14)},
    marginTop: ${scale(10)},
`

export const AutocompleteModal = styled.Modal.attrs({
    animationType: "slide",
    transparent: true,
})`
    width: 90%
`

export const AutocompleteButton = styled.Button`
`