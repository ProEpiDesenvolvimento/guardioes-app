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