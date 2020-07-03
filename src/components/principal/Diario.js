import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Avatar } from 'react-native-elements';
import * as Imagem from '../../imgs/imageConst';
import { getNameParts } from '../../utils/constUtils';
import { Dimensions } from 'react-native';
import translate from '../../../locales/i18n';
import {API_URL} from 'react-native-dotenv';

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();
let h = data.getHours();

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

class Diario extends Component {
    constructor(props) {
        super(props);
        this.props.navigation.addListener('didFocus', payload => {
            //console.warn(payload)
            //this.getInfo();
        });
        this.state = {
            data: [],
            x: 0,
            datesMarked: {},
            BadData: [],
            BadPlot: [{ y: 0, x: 0, marked: "" }],
            NoPlot: [{ y: 0, x: 0, marked: "" }]
        };
    }
    
    componentDidMount () {
        this.getInfo();
    }


    handleSelect(event) {
        let entry = event.nativeEvent;
        if (entry == null) {
            this.setState({ ...this.state, selectedEntry: null });
        } else {
            this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
        }

        console.log(event.nativeEvent);
    }

    static navigationOptions = {
        title: translate("diary.title")
    }

    getInfo = async () => { //Get user infos
        const userID = await AsyncStorage.getItem('userID');
        const userName = await AsyncStorage.getItem('userName');
        const userSelected = await AsyncStorage.getItem('userSelected');
        const avatarSelect = await AsyncStorage.getItem('avatarSelected');
        const userToken = await RNSecureStorage.get('userToken');
        this.setState({ userName, userSelected, userID, userToken, avatarSelect });

        //Para não dar BO de variavel nula no IOS -- So puxa o async quando é um household
        if (this.state.userSelected == this.state.userName) {
            this.setState({ householdID: null })
        } else {
            const householdID = await AsyncStorage.getItem('householdID');
            this.setState({ householdID })
        }

        this.getSurvey();
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
                    dataSource: responseJson.surveys
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
                        markedDate.push(survey.bad_since);
                        markedDateAll.push(survey);
                    }
                    else { //GoodReport
                        markedDateNo.push(survey.created_at.split("T", 1).toString());
                    }
                }

            } else {
                if (survey.household != null) {
                    if (survey.household.id == this.state.householdID) {
                        if (survey.symptom && survey.symptom.length) { //Household BadReport
                            markedDate.push(survey.bad_since);
                            markedDateAll.push(survey);
                        }
                        else { //Household GoodReport
                            markedDateNo.push(survey.created_at.split("T", 1).toString());
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

        let BadReport = markedDate.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: '#F18F01' } }), {});
        let GoodReport = markedDateNo.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: '#5DD39E' } }), {});

        Object.assign(GoodReport, BadReport);

        this.setState({ datesMarked: GoodReport });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                    <View style={styles.Top}>
                        <View style={styles.userAvatar}>
                            <Avatar
                                size="large"
                                rounded
                                source={Imagem[this.state.avatarSelect]}
                                activeOpacity={0.7}
                            />
                        </View>
                        <View style={styles.UserInfos}>
                            <Text style={styles.UserName}>
                                {getNameParts(this.state.userSelected, true)}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.LeftTop}>
                            <View><Text style={styles.NumReports}> {this.state.totalReports} {translate("diary.participate")} </Text></View>
                            <View style={styles.UserReport}>
                                <View style={styles.UserData}>
                                    <Image style={{ width: 75, height: 85 }} source={Imagem.imagemGood} />
                                    <View style={styles.columnData}>
                                        <Text style={styles.percentReport}>{this.state.GoodPercent}% {translate("diary.good")}</Text>
                                        <Text style={styles.numGood}> {this.state.NummarkedDateNo === 1 ? this.state.NummarkedDateNo + translate("diary.report") : this.state.NummarkedDateNo + translate("diary.reports")}</Text>
                                    </View>
                                </View>
                                <View style={styles.UserData}>
                                    <Image style={{ width: 75, height: 85 }} source={Imagem.imagemBad} />
                                    <View style={styles.columnData}>
                                        <Text style={styles.percentReport}>{this.state.BadPercent}% {translate("diary.bad")}</Text>
                                        <Text style={styles.numBad}>{this.state.NummarkedDate === 1 ? this.state.NummarkedDate + translate("diary.report") : this.state.NummarkedDate + translate("diary.reports")}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.CalendarDate}>
                        <View style={styles.ViewCalendario}><Text style={styles.Calendario}>{translate("diary.calendar")}</Text></View>
                        <Calendar
                            current={_today}
                            markedDates={this.state.datesMarked}
                            onDayPress={(day) => {
                                let symptomDate = this.state.markedDateAll;
                                symptomDate.map(symptomMarker => {
                                    if(symptomMarker.bad_since == day.dateString){
                                        console.warn(symptomMarker.symptom)
                                    }
                                })
                            }}
                            theme={calendarTheme}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    Top: {
        //paddingTop: scale(15),
        height: '16%',
        flexDirection: 'row',
        backgroundColor: '#348EAC',
        //borderColor: 'red',
        //borderWidth: 1,
    },
    userAvatar: {
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    UserInfos: {
        //borderColor: 'green',
        //borderWidth: 1,
    },
    UserName: {
        fontFamily: 'roboto',
        fontWeight: 'bold',
        fontSize: 24,
        width: '100%',
        color: 'white',
        marginTop: 20,
    },
    NumReports: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        margin: 10,
    },
    LeftTop: {
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems: 'center',
    },
    UserReport: {
        flexDirection: 'row',
        margin: 15
    },
    UserData: {
        alignItems: 'center',
        width: '43%',
    },
    percentReport: {
        fontFamily: 'roboto',
        fontSize: 24,
        color: '#000000',
        marginTop: 7,
    },
    columnData: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    numBad: {
        fontFamily: 'roboto',
        fontSize: 16,
        marginBottom: 2,
        color: '#BF092E',
    },
    numGood: {
        fontFamily: 'roboto',
        fontSize: 16,
        marginBottom: 2,
        color: '#058B09',
    },
    ViewCalendario: {
        backgroundColor: '#166b87',
        alignItems: 'center',
    },
    CalendarDate: {
        marginBottom: 35,
    },
    Calendario: {
        fontFamily: 'roboto',
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white'
    },
    chartView: {
        flex: 1,
    },
    chart: {
        width: Dimensions.get('window').width,
        height: 375,
        marginBottom: 100
    },
    Chart: {
        fontFamily: 'roboto',
        fontSize: 23,
        margin: 5,
        color: 'white'

    },
});

const calendarTheme = {
    calendarBackground: '#348EAC',
    textSectionTitleColor: '#ffffff',
    textSectionTitleDisabledColor: '#c4c4c4',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#ffffff',
    dayTextColor: '#ffffff',
    textDisabledColor: '#c4c4c4',
    arrowColor: '#ffffff',
    disabledArrowColor: '#c4c4c4',
    monthTextColor: '#ffffff',
    textMonthFontWeight: 'bold',
    textDayFontSize: 18,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 16
}
export default Diario;