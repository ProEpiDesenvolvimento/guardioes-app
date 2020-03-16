import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView, StyleSheet, Image, processColor } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Avatar } from 'react-native-elements';
import * as Imagem from '../../imgs/imageConst';
import { Dimensions } from 'react-native';
import translate from '../../../locales/i18n';
import { API_URL } from '../../constUtils';
import { scale } from '../scallingUtils';
const GreenBlue = "rgb(26, 182, 151)";
const petrel = "rgb(59, 145, 153)";

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();
let h = data.getHours();

let today = y + "-" + m + "-" + d + "T" + h;

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

const chartDescriptionTranslated = { text: translate("diary.charts.chartDescription") }

class Diario extends Component {
    constructor(props) {
        super(props);
        this.props.navigation.addListener('didFocus', payload => {
            //console.warn(payload)
            this.getInfos();
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

    getInfos = async () => { //Ger user infos
        let userName = await AsyncStorage.getItem('userName');
        let userSelected = await AsyncStorage.getItem('userSelected');
        let avatarSelect = await AsyncStorage.getItem('avatarSelected');
        let userID = await AsyncStorage.getItem('userID');
        let userToken = await AsyncStorage.getItem('userToken');
        this.setState({ userName, userSelected, userID, userToken, avatarSelect });

        //Para não dar BO de variavel nula no IOS -- So puxa o async quando é um household
        if (this.state.userSelected == this.state.userName) {
            this.setState({ householdID: null })
        } else {
            let householdID = await AsyncStorage.getItem('householdID');
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
        let GoodPercent = ((markedDateNo.length / totalReports) * 100).toFixed(2)
        let BadPercent = ((markedDate.length / totalReports) * 100).toFixed(2)

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

        let BadReport = markedDate.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: '#BF092E' } }), {});
        let GoodReport = markedDateNo.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: '#058B09' } }), {});

        Object.assign(GoodReport, BadReport);

        this.setState({ datesMarked: GoodReport });
    }

    render() {
        const AUXdata = this.state.BadData
        const BadplotAux = this.state.BadPlot
        const NoPlotAux = this.state.NoPlot
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView >
                    <View style={styles.Top}>
                        <View style={styles.userAvatar}>
                            <Avatar
                                large
                                rounded
                                source={Imagem[this.state.avatarSelect]}
                                activeOpacity={0.7}
                                style={{ borderWidth: 1, borderColor: '#BF092E', margin: '10%' }}
                            />
                        </View>
                        <View style={styles.UserInfos}>
                            <Text style={styles.UserName}>
                                {this.state.userSelected}
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
    },
    Top: {
        //paddingTop: scale(15),
        height: '16%',
        flexDirection: 'row',
        backgroundColor: '#2298BF',
        borderColor: 'red',
        //borderWidth: 1,
    },
    userAvatar: {
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    UserInfos: {
        borderColor: 'green',
        //borderWidth: 1,
    },
    UserName: {
        fontFamily: 'roboto',
        fontSize: 24,
        color: 'white',
        marginTop: 15,
    },
    NumReports: {
        fontSize: 20,
        color: '#166B87',
        fontWeight: 'bold',
        margin: 10,
    },
    LeftTop: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    UserReport: {
        flexDirection: 'row',
        margin: 2
    },
    UserData: {
        alignItems: 'center',
        width: '43%',
    },
    percentReport: {
        fontFamily: 'roboto',
        fontSize: 24,
        color: '#166B87',
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
        backgroundColor: '#348EAC',
        alignItems: 'center',
    },
    Calendario: {
        fontFamily: 'roboto',
        fontSize: 28,
        color: 'white'

    },
    CalendarDate: {
        marginBottom: 10,
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
export default Diario;