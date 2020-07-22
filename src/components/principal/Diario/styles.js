import styled from 'styled-components';

import LinearGradient from 'react-native-linear-gradient';
import ShadowView from 'react-native-simple-shadow-view';
import { Calendar } from 'react-native-calendars';

import { scale, percentage } from '../../../utils/scallingUtils';

export const ScrollViewStyled = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#F8F8F8',
        flexGrow: 1
    }
})``;

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
    padding-bottom: 210px;
`;

export const AvatarContainer = styled.View`
    justify-content: center;
    margin-right: ${scale(13)}px;
`;

export const UserInfo = styled.View`
    width: 80%;
`;

export const UserName = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(18)}px;
    color: #ffffff;
`;

export const UserDetails = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(15)}px;
    color: #ffffff;
`;

export const UserDash = styled.View`
    align-items: center;
    marginTop: -180px;
`;

export const ChartContainer = styled.View`
    width: ${percentage(100)}px;
    align-items: center;
    overflow: visible;
`;

export const UserChart = styled(ShadowView).attrs({
})`
    width: 90%;
    background-color: #ffffff;
    border-radius: 20px;
    margin-bottom: ${percentage(7)}px;
    padding: ${scale(8)}px;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 10px;
    shadow-offset: 0px 4px;
`;

export const Chart = styled.View`
    flex-direction: row;
`;

export const ChartTitle = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(16)}px;
    color: #32323B;
    margin: ${scale(12)}px;
    align-self: center;
`;

const chartlabels = `
    height: ${scale(14)}px;
    width: ${scale(14)}px;
    border-radius: 100px;
    margin-right: ${scale(14)}px;
`;

export const ChartLabelGreen = styled.View`
    ${chartlabels}
    background-color: #5DD39E;
`;

export const ChartLabelOrange = styled.View`
    ${chartlabels}
    background-color: #F18F01;
`;

export const ChartLabelGray = styled.View`
    ${chartlabels}
    background-color: #c4c4c4;
`;

export const ChartLabel = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(14)}px;
    color: #32323B;
    margin-bottom: ${scale(0)}px;
    
`;

export const UserReports = styled.View`
    width: 90%;
    margin-bottom: ${percentage(8)}px;
`;

export const ReportsTitleWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${percentage(6)}px;
    padding-horizontal: ${scale(9)}px;
`;

export const ReportsTitle = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    color: #32323B;
`;

export const ReportsSubtitle = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: #32323B;
`;

export const ReportsAll = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const ReportsWell = styled(ShadowView).attrs({
})`
    min-width: 47%;
    background-color: #5DD39E;
    border-radius: ${scale(18)}px;
    flex-direction: row;
    align-items: center;
    padding: ${scale(12)}px;
    shadow-color: #5DD39E;
    shadow-opacity: 0.4;
    shadow-radius: 10px;
    shadow-offset: 0px 4px;
`;

export const ReportsIll = styled(ShadowView).attrs({
})`
    min-width: 47%;
    background-color: #F18F01;
    border-radius: ${scale(18)}px;
    flex-direction: row;
    align-items: center;
    padding: ${scale(12)}px;
    shadow-color: #F18F01;
    shadow-opacity: 0.4;
    shadow-radius: 10px;
    shadow-offset: 0px 4px;
`;

export const ReportData = styled.View`
    flex-direction: column;
    margin-left: ${scale(10)}px;
`;

export const ReportDataTitle = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(18)}px;
    color: #ffffff;
`;

export const ReportDataInfo = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(15)}px;
    color: #ffffff;
`;

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
    }
})``;