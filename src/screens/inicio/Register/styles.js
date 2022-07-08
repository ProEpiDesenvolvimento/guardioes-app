import styled from 'styled-components'

import { scale } from '../../../utils/scalling'

export const PageTitle = styled.Text`
    font-family: 'ArgentumSans-SemiBold';
    font-size: ${scale(21)}px;
    color: #ffffff;
    margin-top: 10%;
    margin-bottom: 10%;
`

export const FormLabel = styled.Text`
    align-self: flex-start;
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: #ffffff;
    text-align: left;
    margin-bottom: ${scale(12)}px;
`

export const FormTip = styled.Text`
    align-self: flex-start;
    font-family: ArgentumSans;
    font-size: ${scale(12)}px;
    color: #ffffff;
    margin-top: ${scale(6)}px;
    margin-left: ${scale(12)}px;
`
