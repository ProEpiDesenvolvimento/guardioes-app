import styled from 'styled-components'

import Feather from 'react-native-vector-icons/Feather'
import { Image as Img } from 'react-native'

import { scale, percentage } from '../../../utils/scalling'

export const ScrollViewStyled = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#f4f4f4',
        flexGrow: 1,
        paddingVertical: percentage(7),
        paddingHorizontal: percentage(7),
    },
})``

export const Title = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(20)}px;
    text-align: center;
    color: #348eac;
    padding: 0;
`

export const Feath = styled(Feather)`
    align-self: center;
    margin-right: 10px;
    color: #348eac;
    font-size: ${scale(30)}px;
`

export const Subtitle = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    text-decoration-line: underline;
    color: #348eac;
    margin-top: ${scale(20)}px;
    margin-bottom: ${scale(10)}px;
`

export const ImageContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: ${scale(20)}px;
    margin-bottom: ${scale(20)}px;
    align-self: flex-start;
`

export const Image = styled(Img)`
    width: 300px;
    height: 300px;
    resize-mode: cover;
    align-self: center;
    margin: 20px 0px;
`

export const BodyText = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(14)}px;
    text-align: justify;
    color: #2b3d51;
`
