import styled from 'styled-components/native'

import { scale } from '../../../utils/scalling'

export const Title = styled.Text`
    align-self: flex-start;
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(20)}px;
    text-align: left;
    color: #348eac;
    include-font-padding: false;
    margin-bottom: ${scale(20)}px;
    padding: 0;
`

export const BodyText = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(14)}px;
    text-align: justify;
    color: #2b3d51;
    margin-bottom: ${scale(30)}px;
`
