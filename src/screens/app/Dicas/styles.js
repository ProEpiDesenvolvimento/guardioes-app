import styled from 'styled-components'

import ShadowView from 'react-native-simple-shadow-view'
import { TouchableOpacity } from 'react-native'

import { scale, percentage } from '../../../utils/scalling'

export const Container = styled.View`
    background-color: #348eac;
    flex: 1;
`

export const ScrollViewStyled = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: scale(28),
        borderTopRightRadius: scale(28),
        flexGrow: 1,
        paddingTop: percentage(6),
        paddingHorizontal: percentage(7),
        paddingBottom: scale(20), // Same as TabBar margin top
    },
})``

export const TitleWrapper = styled.View`
    margin-bottom: ${percentage(6)}px;
`

export const Title = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(19)}px;
    color: #32323b;
    include-font-padding: false;
    margin-bottom: ${scale(5)}px;
`

export const SubTitle = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: #c4c4c4;
    include-font-padding: false;
`

export const AdvicesView = styled.View`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
`

export const Touch = styled(TouchableOpacity).attrs({
    activeOpacity: 0.5,
})`
    width: 46%;
    margin-bottom: ${percentage(7)}px;
`

export const Advice = styled(ShadowView).attrs({})`
    background-color: #5dd39e;
    border-radius: ${scale(18)}px;
    padding: ${scale(14)}px;
    shadow-color: #5dd39e;
    shadow-opacity: 0.4;
    shadow-radius: 6px;
    shadow-offset: 0px 0px;
    height: ${scale(180)}px;
    justify-content: space-evenly;
    align-items: center;
`

export const AdviceTitle = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    margin-bottom: ${scale(10)}px;
    color: #ffffff;
`

export const AdviceIcon = styled.View`
    align-self: center;
    background-color: #ffffff;
    border-radius: 100px;
    padding: ${scale(12)}px;
`

export const DetailsContainer = styled.View`
    background-color: #348eac;
    flex: 1;
`

export const Details = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: scale(22),
        borderTopRightRadius: scale(22),
        flexGrow: 1,
        paddingTop: percentage(5),
        paddingBottom: percentage(15),
        paddingHorizontal: percentage(5),
    },
})``

export const DetailsIcon = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${scale(10)}px;
`

export const DetailsTitleWrapper = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
`

export const DetailsTitle = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(19)}px;
    color: #348eac;
    margin-bottom: ${scale(15)}px;
`

export const DetailsBodyText = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(14)}px;
    color: #2b3d51;
    text-align: justify;
    height: 100%;
`

export const DetailsSeeMore = styled.View`
    background-color: #ffffff;
`

export const DetailsButton = styled(TouchableOpacity).attrs({
    activeOpacity: 0.5,
})`
    width: 100%;
    bottom: 0px;
    background-color: #348eac;
`

export const DetailsButtonLabel = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(15)}px;
    color: #ffffff;
    text-align: center;
    margin-vertical: ${percentage(3)}px;
`
