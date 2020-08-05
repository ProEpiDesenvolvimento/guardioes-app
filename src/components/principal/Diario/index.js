import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { LocaleConfig } from 'react-native-calendars';
import { PieChart } from 'react-native-svg-charts'

import { ScrollViewStyled, UserData, AvatarContainer, UserInfo, UserName, UserDetails, UserDash, SliderContainer, SwiperStyled } from './styles';
import { ChartContainer, UserChart, LabelContainer, LabelWrapper, ChartLabelGreen, ChartLabelOrange, ChartLabelGray, ChartLabel, ChartTitle, CalendarStyled } from './styles';
import { UserReports, ReportsTitleWrapper, ReportsTitle, ReportsSubtitle, ReportsAll, ReportsWell, ReportsIll, ReportData, ReportDataTitle, ReportDataInfo } from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';

import moment from 'moment';
import { Avatar } from 'react-native-elements';
import { HappyIcon, SadIcon } from '../../../imgs/imageConst';
import { scale } from '../../../utils/scallingUtils';
import { getNameParts, getInitials } from '../../../utils/constUtils';
import translate from '../../../../locales/i18n';
import {API_URL} from 'react-native-dotenv';

Feather.loadFont();

LocaleConfig.locales['pt'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
    dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
};

LocaleConfig.defaultLocale = 'pt';

const todayDate = new Date()

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

class Diario extends Component {
    static navigationOptions = {
        title: translate("diary.title")
    }
    constructor(props) {
        super(props)
        this.props.navigation.addListener('didFocus', payload => {
            this.fetchData();
        })
        this.state = {
            data: [],
            x: 0,
            datesMarked: {},
            BadData: [],
            BadPlot: [{ y: 0, x: 0, marked: "" }],
            NoPlot: [{ y: 0, x: 0, marked: "" }],
            isLoading: true
        }
    }

    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({ ...this.state, selectedEntry: null })
        } else {
            this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
        }

        console.log(event.nativeEvent)
    }

    handleCalendarArrows(direction) {
        if (direction === 'left') {
            return (<Feather name="chevron-left" size={scale(25)} color="#c4c4c4" />)
        }
        else if (direction === 'right') {
            return (<Feather name="chevron-right" size={scale(25)} color="#c4c4c4" />)
        }
    }

    fetchData = async () => { //Get user infos
        const userID = await AsyncStorage.getItem('userID')
        const userName = await AsyncStorage.getItem('userName')
        const userBirth = await AsyncStorage.getItem('userBirth')
        const userSelected = await AsyncStorage.getItem('userSelected')
        const avatarSelect = await AsyncStorage.getItem('avatarSelected')
        const userToken = await RNSecureStorage.get('userToken')
        this.setState({ userID, userName, userBirth, userSelected, avatarSelect, userToken })

        //Para não dar BO de variavel nula no IOS -- So puxa o async quando é um household
        if (this.state.userSelected == this.state.userName) {
            this.setState({ householdID: null })
        } else {
            const householdID = await AsyncStorage.getItem('householdID')
            this.setState({ householdID })
        }

        this.getSurvey()
        this.getUserAge()
    }

    getSurvey = () => {//Get Survey
        return fetch(`${API_URL}/users/${this.state.userID}/surveys`, {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.surveys,
                    isLoading: false
                })
                this.defineMarkedDates()
                this.getUserParticipation()
            })
    }

    getUserAge = () => {
        const userBirthDate = new Date(this.state.userBirth)
        const difference = todayDate.getTime() - userBirthDate.getTime()
        const userAge = Math.floor(difference / (1000 * 60 * 60 * 24 * 365))

        this.setState({ userAge })
    }

    defineMarkedDates = () => {
        const surveyData = this.state.dataSource
        let markedDatesGood = []
        let markedDatesBad = []
        let markedDatesAll = []

        surveyData.map((survey) => {
            if (this.state.householdID == null) {//Condição para verificar se exise household
                if (survey.household == null) {
                    if (survey.symptom && survey.symptom.length) { //BadReport
                        markedDatesBad.push(survey.created_at.split("T", 1).toString())
                        markedDatesAll.push(survey)
                    }
                    else { //GoodReport
                        markedDatesGood.push(survey.created_at.split("T", 1).toString())
                    }
                }

            } else {
                if (survey.household != null) {
                    if (survey.household.id == this.state.householdID) {
                        if (survey.symptom && survey.symptom.length) { //Household BadReport
                            markedDatesBad.push(survey.created_at.split("T", 1).toString())
                            markedDatesAll.push(survey)
                        }
                        else { //Household GoodReport
                            markedDatesGood.push(survey.created_at.split("T", 1).toString())
                        }
                    }
                }
            }
        })

        let totalReports = (markedDatesGood.length + markedDatesBad.length)
        let GoodPercent = ((markedDatesGood.length / totalReports) * 100).toFixed(0)
        let BadPercent = ((markedDatesBad.length / totalReports) * 100).toFixed(0)

        this.setState({
            GoodPercent: GoodPercent,
            BadPercent: BadPercent,
            totalReports: totalReports,
            markedGoodNum: markedDatesGood.length,
            markedBadNum: markedDatesBad.length,
            markedDatesGood: markedDatesGood,
            markedDatesBad: markedDatesBad,
            markedDatesAll: markedDatesAll,
        })

        let BadReport = markedDatesBad.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: '#F18F01' } }), {})
        let GoodReport = markedDatesGood.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: '#5DD39E' } }), {})

        Object.assign(GoodReport, BadReport)

        this.setState({ datesMarked: GoodReport })
    }

    getUserParticipation = () => {
        const surveyData = this.state.dataSource.reverse();
        const GoodReports = this.state.markedGoodNum
        const BadReports = this.state.markedBadNum
        let firstSurvey;

        for (let i = 0; i < surveyData.length; i++) {
            if (this.state.householdID) {
                if (surveyData[i].household.id == this.state.householdID) {
                    firstSurvey = surveyData[i];
                    break
                }
            }
            else {
                if (!surveyData[i].household) {
                    firstSurvey = surveyData[i];
                    break
                }
            }
        }

        const firstSurveyDate = new Date(firstSurvey.created_at)
        const difference = todayDate.getTime() - firstSurveyDate.getTime()

        const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24))
        const totalParticipation = totalDays - this.state.totalReports

        const GoodAbsPercent = ((GoodReports / totalDays) * 100).toFixed(0)
        const BadAbsPercent = ((BadReports / totalDays) * 100).toFixed(0)
        const PartPercent = ((totalParticipation / totalDays) * 100).toFixed(0)

        this.setState({ GoodAbsPercent, BadAbsPercent, PartPercent, totalParticipation })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        const chartData = [
            { key: 1, value: this.state.markedGoodNum, svg: { fill: '#5DD39E' }, arc: { cornerRadius: 8, } },
            { key: 2, value: this.state.markedBadNum, svg: { fill: '#F18F01' }, arc: { cornerRadius: 8 } },
            { key: 3, value: this.state.totalParticipation, svg: { fill: '#c4c4c4' }, arc: { cornerRadius: 8 } }
        ]

        return (
            <ScrollViewStyled>
                <UserData>
                    <AvatarContainer>
                        <Avatar
                            containerStyle={{ borderColor: '#ffffff', borderWidth: 3 }}
                            size={scale(50)}
                            source={{uri: this.state.avatarSelect}}
                            title={getInitials(this.state.userSelected)}
                            rounded
                        />
                    </AvatarContainer>
                    <UserInfo>
                        <UserName>{getNameParts(this.state.userSelected, true)}</UserName>
                        <UserDetails>{this.state.userAge} anos</UserDetails>
                    </UserInfo>
                </UserData>
                <UserDash>
                    <SliderContainer>
                        <SwiperStyled
                            showPagination={true}
                            disableGesture={false}
                        >
                            <ChartContainer>
                                <UserChart>
                                    <CalendarStyled
                                        current={_today}
                                        markedDates={this.state.datesMarked}
                                        onDayPress={(day) => {
                                            let symptomDate = this.state.markedDatesAll
                                            symptomDate.map(symptomMarker => {
                                                if (symptomMarker.bad_since == day.dateString) {
                                                    console.warn(symptomMarker.symptom)
                                                }
                                            })
                                        }}
                                        renderArrow={(direction) => this.handleCalendarArrows(direction)}
                                    />
                                </UserChart>
                            </ChartContainer>
                            <ChartContainer>
                                <UserChart>
                                    <ChartTitle>Estatísticas</ChartTitle>
                                    <PieChart
                                        style={{ height: 170, marginBottom: scale(12) }}
                                        outerRadius={'100%'}
                                        innerRadius={'15%'}
                                        data={chartData}
                                    />
                                    <LabelContainer>
                                        <View>
                                            <LabelWrapper>
                                                <ChartLabelGreen />
                                                <ChartLabel>{this.state.GoodAbsPercent}% - Bem</ChartLabel>
                                            </LabelWrapper>
                                            <LabelWrapper>
                                                <ChartLabelOrange />
                                                <ChartLabel>{this.state.BadAbsPercent}% - Mal</ChartLabel>
                                            </LabelWrapper>
                                            <LabelWrapper>
                                                <ChartLabelGray />
                                                <ChartLabel>{this.state.PartPercent}% - Não Informado</ChartLabel>
                                            </LabelWrapper>
                                        </View>
                                    </LabelContainer>
                                </UserChart>
                            </ChartContainer>
                        </SwiperStyled>
                    </SliderContainer>

                    <UserReports>
                        <ReportsTitleWrapper>
                            <ReportsTitle>{translate("diary.participate")}</ReportsTitle>
                            <ReportsSubtitle>Total: {this.state.totalReports}</ReportsSubtitle>
                        </ReportsTitleWrapper>

                        <ReportsAll>
                            <ReportsWell>
                                <HappyIcon height={scale(45)} width={scale(45)} fill="#ffffff" />
                                <ReportData>
                                    <ReportDataTitle>{translate("diary.good")}</ReportDataTitle>
                                    <ReportDataInfo>
                                        {this.state.markedGoodNum === 1 ? 
                                        this.state.markedGoodNum + translate("diary.report") : 
                                        this.state.markedGoodNum + translate("diary.reports")}
                                    </ReportDataInfo>
                                </ReportData>
                            </ReportsWell>

                            <ReportsIll>
                                <SadIcon height={scale(45)} width={scale(45)} fill="#ffffff" />
                                <ReportData>
                                    <ReportDataTitle>{translate("diary.bad")}</ReportDataTitle>
                                    <ReportDataInfo>
                                        {this.state.markedBadNum === 1 ? 
                                        this.state.markedBadNum + translate("diary.report") : 
                                        this.state.markedBadNum + translate("diary.reports")}
                                    </ReportDataInfo>
                                </ReportData>
                            </ReportsIll>
                        </ReportsAll>
                    </UserReports>

                </UserDash>
            </ScrollViewStyled>
        )
    }
}

export default Diario