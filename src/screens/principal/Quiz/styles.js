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
    margin-bottom: ${scale(22)}px;
`

export const ContentContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: ${percentage(7)}px;
`

export const SwiperContainer = styled.View`
    width: ${percentage(100)}px;
    padding-horizontal: ${percentage(7)}px;
`

export const QuizContainer = styled.View`
    padding-horizontal: ${percentage(7)}px;
    flex: 1;
    align-items: center;
`

export const QuizBox = styled.View`
    width: 100%;
    background-color: #fff;
    align-items: center;
    padding-horizontal: ${scale(15)}px;
    padding-vertical: ${scale(20)}px;
    border-radius: ${scale(12)}px;
    margin-bottom: ${scale(30)}px;
`

export const QuizTitle = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(18)}px;
    color: #348eac;
    text-align: center;
    margin-bottom: ${scale(20)}px;
    include-font-padding: false;
    padding: 0;
`

export const QuizIconWrapper = styled.View`
    align-items: center;
    justify-content: center;
    margin-bottom: ${scale(20)}px;
`

export const QuizBodyText = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(14)}px;
    text-align: justify;
    color: #2b3d51;
`
