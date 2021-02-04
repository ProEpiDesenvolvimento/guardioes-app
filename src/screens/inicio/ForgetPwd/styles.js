import styled from 'styled-components'

import { scale, percentage } from '../../../utils/scalling'

export const ScreenView = styled.View`
    width: ${percentage(100)}px;
    justify-content: center;
    align-items: center;
`

export const PageTitle = styled.Text`
    font-family: 'ArgentumSans-SemiBold';
    font-size: ${scale(21)}px;
    color: #ffffff;
    margin-top: 10%;
    margin-bottom: 15%;
`

export const LabelWrapper = styled.Text`
    width: 80%;
    margin-bottom: ${percentage(2)}px;
`

export const TextLabel = styled.Text`
    font-family: 'ArgentumSans-Medium';
    font-size: ${scale(15)}px;
    color: #ffffff;
`
