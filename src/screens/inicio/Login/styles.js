import styled from 'styled-components'

import { scale } from '../../../utils/scalling'

export const Logo = styled.Image`
    height: ${scale(105)}px;
    resize-mode: contain;
`

export const PageTitle = styled.Text`
    font-family: 'ArgentumSans-SemiBold';
    font-size: ${scale(21)}px;
    color: #ffffff;
    margin-top: 15%;
    margin-bottom: 5%;
`

export const LabelVisible = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    text-decoration-line: underline;
    color: #ffffff;
`
