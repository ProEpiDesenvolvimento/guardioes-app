import styled from 'styled-components'

import LinearGradient from 'react-native-linear-gradient'
import SwiperFlatList from 'react-native-swiper-flatlist'
import ShadowView from 'react-native-simple-shadow-view'
import { TouchableOpacity } from 'react-native'
import { Calendar } from 'react-native-calendars'

import { scale, percentage } from '../../../utils/scalling'

export const Container = styled.View`
    flex: 1;
    background-color: #348eac;
`

export const ScrollViewStyled = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#f4f4f4',
        flexGrow: 1,
        paddingBottom: 20,
    },
})``

const padding = 180

export const UserData = styled(LinearGradient).attrs({
    colors: ['#348EAC', '#5DD39E'],
})`
    border-bottom-left-radius: ${scale(25)}px;
    border-bottom-right-radius: ${scale(25)}px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-top: ${scale(25)}px;
    padding-horizontal: ${scale(25)}px;
    padding-bottom: ${scale(25) + padding}px;
`

export const AvatarContainer = styled.View`
    justify-content: center;
    margin-right: ${scale(13)}px;
`

export const UserInfo = styled.View`
    width: 80%;
    justify-content: space-between;
`

export const UserName = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(18)}px;
    color: #ffffff;
`

export const UserDetails = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(15)}px;
    color: #ffffff;
`

export const UserDash = styled.View`
    align-items: center;
    margin-top: -${padding}px;
`

export const SliderContainer = styled.View`
    flex: 0;
`

export const SwiperStyled = styled(SwiperFlatList).attrs({
    paginationDefaultColor: '#c4c4c4',
    paginationActiveColor: '#F18F01',
})``

export const ChartContainer = styled.View`
    width: ${percentage(100)}px;
    align-items: center;
    overflow: visible;
`

export const UserChart = styled(ShadowView).attrs({})`
    width: 90%;
    background-color: #ffffff;
    border-radius: 20px;
    margin-bottom: ${percentage(10)}px;
    padding: ${scale(8)}px;
    padding-bottom: ${scale(10)}px;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 6px;
    shadow-offset: 0px 4px;
`

export const ChartTitle = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(16)}px;
    color: #32323b;
    margin: ${scale(10)}px;
    align-self: center;
`

export const Chart = styled(TouchableOpacity).attrs({
    activeOpacity: 0.5,
})``

const chartlabels = `
    height: ${scale(14)}px;
    width: ${scale(14)}px;
    border-radius: 100px;
    margin-right: ${scale(14)}px;
`

export const LabelContainer = styled.View`
    align-items: center;
    margin-bottom: ${scale(10)}px;
`

export const LabelWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`

export const ChartLabelGreen = styled.View`
    ${chartlabels}
    background-color: #5DD39E;
`

export const ChartLabelOrange = styled.View`
    ${chartlabels}
    background-color: #F18F01;
`

export const ChartLabelGray = styled.View`
    ${chartlabels}
    background-color: #c4c4c4;
`

export const ChartLabel = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(14)}px;
    color: #32323b;
    margin-bottom: ${scale(0)}px;
`

export const UserReports = styled.View`
    width: 90%;
    margin-bottom: ${percentage(6)}px;
`

export const ReportsTitleWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${percentage(6)}px;
    padding-horizontal: ${scale(9)}px;
`

export const ReportsTitle = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    color: #32323b;
`

export const ReportsSubtitle = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: #32323b;
`

export const ReportsAll = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const ReportsWell = styled(ShadowView).attrs({})`
    min-width: 47%;
    background-color: #5dd39e;
    border-radius: ${scale(18)}px;
    flex-direction: row;
    align-items: center;
    padding: ${scale(12)}px;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 6px;
    shadow-offset: 0px 4px;
`

export const ReportsIll = styled(ShadowView).attrs({})`
    min-width: 47%;
    background-color: #f18f01;
    border-radius: ${scale(18)}px;
    flex-direction: row;
    align-items: center;
    padding: ${scale(12)}px;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 6px;
    shadow-offset: 0px 4px;
`

export const ReportData = styled.View`
    flex-direction: column;
    margin-left: ${scale(10)}px;
`

export const ReportDataTitle = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(18)}px;
    color: #ffffff;
    include-font-padding: false;
    margin-bottom: ${scale(8)}px;
`

export const ReportDataInfo = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(15)}px;
    color: #ffffff;
    include-font-padding: false;
`

export const CalendarStyled = styled(Calendar).attrs({
    theme: {
        calendarBackground: 'transparent',
        textSectionTitleColor: '#c4c4c4',
        textSectionTitleDisabledColor: '#c4c4c4',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#348EAC',
        dayTextColor: '#32323B',
        textDisabledColor: '#c4c4c4',
        disabledArrowColor: '#ffffff',
        monthTextColor: '#348EAC',
        textDayFontFamily: 'ArgentumSans',
        textMonthFontFamily: 'ArgentumSans-Medium',
        textDayHeaderFontFamily: 'ArgentumSans-Medium',
        textDayFontSize: scale(14),
        textMonthFontSize: scale(16),
        textDayHeaderFontSize: scale(14),
    },
})``
