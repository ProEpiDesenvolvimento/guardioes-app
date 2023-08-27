import styled from 'styled-components'

import { scale, percentage } from '../../../utils/scalling'

export const ScrollViewStyled = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#f4f4f4',
        flexGrow: 1,
        paddingVertical: percentage(6),
    },
})``

export const QuestionInfo = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: #348eac;
    text-align: center;
    margin-bottom: ${scale(22)}px;
`

export const ContentContainer = styled.View`
    padding-horizontal: ${percentage(7)}px;
`

export const SwiperContainer = styled.View`
    width: ${percentage(100)}px;
    padding-horizontal: ${percentage(7)}px;
`
