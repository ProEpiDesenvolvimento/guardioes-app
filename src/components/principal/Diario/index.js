import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { LocaleConfig } from 'react-native-calendars';
import { PieChart } from 'react-native-svg-charts'

import { ScrollViewStyled, UserData, AvatarContainer, UserInfo, UserName, UserDetails, UserDash, ChartContainer, UserChart,  } from './styles';
import { ChartLabelGreen, ChartLabelOrange, ChartLabelGray, ChartLabel, ChartTitle, CalendarStyled, UserReports } from './styles';
import { ReportsTitleWrapper, ReportsTitle, ReportsSubtitle, ReportsAll, ReportsWell, ReportsIll, ReportData, ReportDataTitle, ReportDataInfo } from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';

import moment from 'moment';
import { Avatar } from 'react-native-elements';
import * as Imagem from '../../../imgs/imageConst';
import { HappyIcon, SadIcon } from '../../../imgs/imageConst';
import { scale } from '../../../utils/scallingUtils';
import { getNameParts } from '../../../utils/constUtils';
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

let data = new Date()
let d = data.getDate()
let m = data.getMonth() + 1
let y = data.getFullYear()

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

class Diario extends Component {
    static navigationOptions = {
        title: translate("diary.title")
    }
    constructor(props) {
        super(props)
        this.props.navigation.addListener('didFocus', payload => {
            //this.fetchData();
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
    
    componentDidMount () {
        this.fetchData()
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
        const userSelected = await AsyncStorage.getItem('userSelected')
        const avatarSelect = await AsyncStorage.getItem('avatarSelected')
        const userToken = await RNSecureStorage.get('userToken')
        this.setState({ userName, userSelected, userID, userToken, avatarSelect })

        //Para não dar BO de variavel nula no IOS -- So puxa o async quando é um household
        if (this.state.userSelected == this.state.userName) {
            this.setState({ householdID: null })
        } else {
            const householdID = await AsyncStorage.getItem('householdID')
            this.setState({ householdID })
        }

        this.getSurvey()
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
            })
    }


    defineMarkedDates = () => {
        let surveyData = this.state.dataSource
        let markedDateNo = []
        let markedDate = []
        let markedDateAll = []

        surveyData.map((survey, index) => {
            if (this.state.householdID == null) {//Condição para verificar se exise household
                if (survey.household == null) {
                    if (survey.symptom && survey.symptom.length) { //BadReport
                        markedDate.push(survey.created_at.split("T", 1).toString())
                        markedDateAll.push(survey)
                    }
                    else { //GoodReport
                        markedDateNo.push(survey.created_at.split("T", 1).toString())
                    }
                }

            } else {
                if (survey.household != null) {
                    if (survey.household.id == this.state.householdID) {
                        if (survey.symptom && survey.symptom.length) { //Household BadReport
                            markedDate.push(survey.created_at.split("T", 1).toString())
                            markedDateAll.push(survey)
                        }
                        else { //Household GoodReport
                            markedDateNo.push(survey.created_at.split("T", 1).toString())
                        }
                    }
                }
            }
        })

        let totalReports = (markedDateNo.length + markedDate.length)
        let GoodPercent = ((markedDateNo.length / totalReports) * 100).toFixed(0)
        let BadPercent = ((markedDate.length / totalReports) * 100).toFixed(0)

        this.setState({
            GoodPercent: GoodPercent,
            BadPercent: BadPercent,
            totalReports: totalReports,
            NummarkedDateNo: markedDateNo.length,
            NummarkedDate: markedDate.length,
            markedDate: markedDate,
            markedDateAll: markedDateAll,
            markedDateNo: markedDateNo,
        })

        let BadReport = markedDate.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: '#F18F01' } }), {})
        let GoodReport = markedDateNo.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: '#5DD39E' } }), {})

        Object.assign(GoodReport, BadReport)

        this.setState({ datesMarked: GoodReport })
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
            {
                key: 1,
                value: this.state.NummarkedDateNo,
                svg: { fill: '#5DD39E' },
                arc: { cornerRadius: 8, }
            },
            {
                key: 2,
                value: this.state.NummarkedDate,
                svg: { fill: '#F18F01' },
                arc: { cornerRadius: 8 }
            },
            {
                key: 3,
                value: 10,
                svg: { fill: '#c4c4c4' },
                arc: { cornerRadius: 8 }
            }
        ]

        return (
            <ScrollViewStyled>
                <UserData>
                    <AvatarContainer>
                        <Avatar
                            containerStyle={styles.UserAvatar}
                            size="medium"
                            source={Imagem[this.state.avatarSelect]}
                            activeOpacity={0.7}
                            rounded
                        />
                    </AvatarContainer>
                    <UserInfo>
                        <UserName>{getNameParts(this.state.userSelected, true)}</UserName>
                        <UserDetails>20 anos</UserDetails>
                    </UserInfo>
                </UserData>
                <UserDash>
                    <SwiperFlatList
                        showPagination={true}
                        disableGesture={false}
                        paginationDefaultColor="#c4c4c4"
                        paginationActiveColor="#F18F01"
                    >
                        <ChartContainer>
                            <UserChart>
                                <CalendarStyled
                                    current={_today}
                                    markedDates={this.state.datesMarked}
                                    onDayPress={(day) => {
                                        let symptomDate = this.state.markedDateAll
                                        symptomDate.map(symptomMarker => {
                                            if(symptomMarker.bad_since == day.dateString){
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
                                    <View style={{alignItems: "center"}}>
                                        <View style={{}}>
                                            <View style={{flexDirection: 'row', alignItems: "center" }}>
                                                <ChartLabelGreen /><ChartLabel>{this.state.GoodPercent}% - Bem</ChartLabel>
                                            </View>
                                            <View style={{flexDirection: 'row', alignItems: "center"}}>
                                                <ChartLabelOrange /><ChartLabel>{this.state.BadPercent}% - Mal</ChartLabel>
                                            </View>
                                            <View style={{flexDirection: 'row', alignItems: "center"}}>
                                                <ChartLabelGray /><ChartLabel>15% - Não Informado</ChartLabel>
                                            </View>
                                        </View>
                                    </View>
                            </UserChart>
                        </ChartContainer>
                    </SwiperFlatList>

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
                                        {this.state.NummarkedDateNo === 1 ? 
                                        this.state.NummarkedDateNo + translate("diary.report") : 
                                        this.state.NummarkedDateNo + translate("diary.reports")}
                                    </ReportDataInfo>
                                </ReportData>
                            </ReportsWell>

                            <ReportsIll>
                                <SadIcon height={scale(45)} width={scale(45)} fill="#ffffff" />
                                <ReportData>
                                    <ReportDataTitle>{translate("diary.bad")}</ReportDataTitle>
                                    <ReportDataInfo>
                                        {this.state.NummarkedDate === 1 ? 
                                        this.state.NummarkedDate + translate("diary.report") : 
                                        this.state.NummarkedDate + translate("diary.reports")}
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

const styles = StyleSheet.create({
    UserAvatar: {
        borderColor: '#ffffff',
        borderWidth: 3,
        height: scale(50),
        width: scale(50),
        borderRadius: 100
    }
});

export default Diario