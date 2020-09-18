import React, { Component } from 'react';
import { Text, View, NetInfo, Alert, Platform } from 'react-native';

import ScreenLoader from '../../userData/ScreenLoader';
import { ScrollViewStyled, User, IconWrapper, InfoWrapper, Name, DateSince, DateText, DateSelector } from './styles';
import { FormTitleWrapper, FormTitle, CheckBoxStyled, Button } from './styles';
import { Container, FormInline, FormLabel, Selector, SendContainer, SendText } from '../../styled/NormalForms';

import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import Emoji from 'react-native-emoji';
import { scale } from '../../../utils/scallingUtils';
import { API_URL } from 'react-native-dotenv';
import translate from '../../../../locales/i18n';
import { Avatar } from 'react-native-elements';
import { getNameParts, handleAvatar, getInitials } from '../../../utils/constUtils';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { country, localSymptom } from '../../../utils/selectorUtils';
import { Redirect } from '../../../utils/constUtils';
import Share from "react-native-share";
import { cardWhatsapp } from '../../../imgs/cardWhatsapp/cardWhatsapp_base64';
import OneSignal from 'react-native-onesignal';

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();

let today = d + "-" + m + "-" + y;

const shareOptions = {
    message: translate("badReport.alertMessages.covidSuspect"),
    url: cardWhatsapp
};

class BadReport extends Component {
    static navigationOptions = {
        title: translate("badReport.title")
    }

    constructor(props) {
        super(props);
        this.getLocation();
        this.props.navigation.addListener('willFocus', payload => {
            this.fetchData();
        })
        this.state = {
            isLoading: true,
            country: 'Brazil',
            contactWithSymptomCheckbox: false,
            contactWithSymptom: null,
            lookedForHospital: false,
            hadTraveled: false,
            symptoms: [],
            today_date: today,
            showAlert: false, //Custom Alerts
            progressBarAlert: false, //Custom Progress Bar
            alertMessage: null
        }
    }

    showAlert = (responseJson) => {
        let alertMessage = ""
        if (responseJson !== null && !responseJson.errors) {
            alertMessage = translate("badReport.alertMessages.reportSent")
        } else {
            alertMessage = translate("badReport.alertMessages.reportNotSent")
        }
        this.setState({
            alertMessage: <Text>{alertMessage}{emojis[0]}{"\n"}{translate("badReport.alertMessages.seeADoctor")}</Text>,
            progressBarAlert: false
        });
    }

    showLoadingAlert = () => {
        this.setState({
            alertMessage: null,
            showAlert: true,
            progressBarAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false,
            progressBarAlert: true
        })
    }

    _isconnected = () => {
        NetInfo.isConnected.fetch().then(isConnected => {
            isConnected ? this.verifyLocalization() : Alert.alert(
                translate("noInternet.noInternetConnection"),
                translate("noInternet.ohNo"),
                [
                    { text: translate("noInternet.alertAllRightMessage"), onPress: () => null }
                ]
            )
        });
    }

    getLocation() {
        this.requestFineLocationPermission();
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    userLatitude: position.coords.latitude,
                    userLongitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 50000 },
        );
    }

    getSymptoms = () => {//Get Symptoms
        return fetch(`${API_URL}/symptoms`, {
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const alfabetica = responseJson.symptoms.sort(function (a, b) {
                    return (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0);
                });
                this.setState({
                    dataSource: alfabetica,
                    isLoading: false
                })
            })
    }

    fetchData = async () => { //Get user info
        const userID = await AsyncStorage.getItem('userID');
        const userName = await AsyncStorage.getItem('userName');
        const userSelected = await AsyncStorage.getItem('userSelected');
        const avatarSelected = await AsyncStorage.getItem('avatarSelected');
        const userToken = await RNSecureStorage.get('userToken');
        this.setState({ userName, userSelected, avatarSelected, userID, userToken });

        //Para não dar BO de variavel nula no IOS -- So puxa o async quando é um household
        if (this.state.userSelected === this.state.userName) {
            this.setState({ householdID: null })
        } else {
            const householdID = await AsyncStorage.getItem('householdID');
            this.setState({ householdID })
        }
        this.getSymptoms();
    }

    verifyLocalization = async () => {
        if (this.state.userLatitude == 0 || this.state.userLongitude == 0 || this.state.userLatitude == null || this.state.userLongitude == null) {
            this.requestLocalization();
        } else {
            this.sendSurvey();
        }
    }

    async requestFineLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': translate("maps.locationRequest.requestLocationMessageTitle"),
                    'message': translate("maps.locationRequest.requestLocationMessageMessage")
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location');
            } else {
                console.warn(translate("maps.locationRequest.requestDenied"))

                if (Platform.OS === 'android') {
                    this.props.navigation.navigate('Home')
                }
            }
        } catch (err) {
            console.warn(err)
        }
    }

    requestLocalization = () => {
        Alert.alert(
            "Erro Na Localização",
            "Permita a localização para prosseguir",
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'permitir', onPress: () => this.requestFineLocationPermission() },
            ],
            { cancelable: false },
        );
    }

    showSyndromeAlert = (responseJson) => {
        let data = []
        if (responseJson.messages.top_3[0].name === "Síndrome Gripal") {
            data = [
                { text: 'Mais informações', onPress: () => { Redirect("Ministerio da Saúde", "Deseja ser redirecionado para o website do Ministério da Saúde?", "https://coronavirus.saude.gov.br/sobre-a-doenca#se-eu-ficar-doente") } },
                { text: 'Ok', onPress: () => this.showWhatsappAlert(responseJson) }
            ]
        } else {
            data = [
                { text: 'Ok', onPress: () => this.showAlert(responseJson) }
            ]
        }
        Alert.alert(
            responseJson.messages.top_syndrome_message.title,
            responseJson.messages.top_syndrome_message.warning_message,
            data,
            { cancelable: false }
        )
    }

    showWhatsappAlert = (responseJson) => {
        Alert.alert(
            'Alertar Contatos',
            'Deseja compartilhar um comunicado para pessoas com que teve contato?',
            [
                { text: 'Não, irei avisá-los mais tarde', onPress: () => this.showAlert(responseJson) },
                {
                    text: 'Sim', onPress: () => {
                        Share.open(shareOptions)
                            .then((res) => { console.log(res) })
                            .catch((err) => { err && console.log(err); });
                        this.showAlert(responseJson)
                    }
                }
            ],
            { cancelable: false }
        )
    }

    countScore = async () => {
        const lastReport = await AsyncStorage.getItem('lastReport')
        const userScore = parseInt(await AsyncStorage.getItem('userScore'))

        this.setState({lastReport, userScore})

        let dt1 = new Date(this.state.lastReport)
        let dt2 = new Date() // Today

        let auxCount = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24))

        switch (auxCount) {
            case 1:
                // Acrescenta um dia na contagem e atualiza o lastReport
                console.warn("reportou no dia anterior")
                this.setState({userScore: this.state.userScore + 1})
                AsyncStorage.setItem('lastReport', dt2.toString())
                AsyncStorage.setItem('userScore', this.state.userScore.toString())
                break;
            case 0:
                // Nada acontece
                console.warn("Já reportou hoje")
                break;
            default:
                // Zera a contagem e atualiza o lastReport
                console.warn("Não reportou no dia anterior")
                this.setState({userScore: 0})
                AsyncStorage.setItem('lastReport', dt2.toString())
                AsyncStorage.setItem('userScore', this.state.userScore.toString())
                break;
        }
        console.warn("User Score: " + this.state.userScore)
        OneSignal.sendTags({score: this.state.userScore});
    }

    sendSurvey = async () => {
        this.countScore()
        this.showLoadingAlert();
        try {
            let currentPin = {
                household_id: this.state.householdID,
                latitude: this.state.userLatitude,
                longitude: this.state.userLongitude,
                symptom: this.state.symptoms
            }
            await AsyncStorage.setItem(
                "localpin",
                JSON.stringify(currentPin)
            )
        } catch (error) {
            console.warn("Não conseguiu guardar pino local")
        }
        return fetch(`${API_URL}/users/${this.state.userID}/surveys`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.userToken}`
            },
            body: JSON.stringify({
                survey:
                {
                    household_id: this.state.householdID,
                    latitude: this.state.userLatitude,
                    longitude: this.state.userLongitude,
                    bad_since: this.state.today_date,
                    traveled_to: this.state.hadTraveled,
                    went_to_hospital: this.state.lookedForHospital,
                    contact_with_symptom: this.state.contactWithSymptom,
                    symptom: this.state.symptoms
                }
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && !responseJson.errors && responseJson.messages.top_3) {
                    if (responseJson.messages.top_3[0])
                        this.showSyndromeAlert(responseJson)
                    else
                        this.showAlert(responseJson)
                } else {
                    this.showAlert(responseJson)
                }
            })
    }

    render() {
        const { showAlert } = this.state;
        const symptomsData = this.state.dataSource;

        if (this.state.isLoading) {
            return <ScreenLoader />
        }

        const traveled = (
            <FormInline>
                <FormLabel>
                    {translate("badReport.checkboxes.fourth")}
                </FormLabel>
                <Selector
                    initValue={translate("selector.label")}
                    cancelText={translate("selector.cancelButton")}
                    data={country}
                    onChange={(option) => this.setState({ country: option.key })}
                />
            </FormInline>
        )

        let traveledTrue;
        if (this.state.hadTraveled == true) {
            traveledTrue = traveled
        }

        return (
            <Container>
                <ScrollViewStyled>
                    <User>
                        <IconWrapper>
                            <Avatar
                                size={scale(58)}
                                source={handleAvatar(this.state.avatarSelected)}
                                title={getInitials(this.state.userSelected)}
                                rounded
                            />
                        </IconWrapper>
                        <InfoWrapper>
                            <Name>
                                {getNameParts(this.state.userSelected, true)}
                            </Name>
                        </InfoWrapper>
                    </User>

                    <DateSince>
                        <DateText>
                            {translate("badReport.sickAge")}
                        </DateText>
                        <DateSelector
                            placeholder={translate("badReport.datePlaceHolder")}
                            date={this.state.today_date}
                            format="DD-MM-YYYY"
                            minDate="01-01-2018"
                            maxDate={today}
                            locale={'pt-BR'}
                            confirmBtnText={translate("birthDetails.confirmButton")}
                            cancelBtnText={translate("birthDetails.cancelButton")}
                            onDateChange={(date) => { this.setState({ today_date: date }) }}
                        />
                    </DateSince>

                    <FormTitleWrapper>
                        <FormTitle>
                            {translate("badReport.symptoms")}
                        </FormTitle>
                    </FormTitleWrapper>
                    {symptomsData != null ?
                        symptomsData.map((symptom, index) => {
                            return (
                                <CheckBoxStyled
                                    key={index}
                                    title={symptom.description}
                                    checked={this.state[symptom.code]}
                                    onPress={async () => {
                                        await this.setState({
                                            [symptom.code]: !this.state[symptom.code]
                                        })
                                        if (this.state[symptom.code] == true) {
                                            let symptomsClone = this.state.symptoms.slice(); //creates the clone of the state
                                            symptomsClone[index] = symptom.code;
                                            await this.setState({ symptoms: symptomsClone });
                                            //console.warn(symptom.description + ": " + this.state[symptom.code])
                                        } else {
                                            let symptomsClone = this.state.symptoms.slice(); //creates the clone of the state
                                            symptomsClone[index] = null;
                                            await this.setState({ symptoms: symptomsClone });
                                            //console.warn(symptom.description + ": " + this.state[symptom.code])
                                        }
                                    }}
                                />
                            )
                        })
                        : null}

                    <FormTitleWrapper>
                        <FormTitle>
                            {translate("badReport.answerQuestions")}
                        </FormTitle>
                    </FormTitleWrapper>
                    <CheckBoxStyled
                        title={translate("badReport.checkboxes.third")}
                        checked={this.state.hadTraveled}
                        onPress={async () => await this.setState({ hadTraveled: !this.state.hadTraveled })}
                    />
                    {/*traveledTrue*/}
                    <CheckBoxStyled
                        title={translate("badReport.checkboxes.first")}
                        checked={this.state.contactWithSymptomCheckbox}
                        onPress={async () => await this.setState({ contactWithSymptomCheckbox: !this.state.contactWithSymptomCheckbox })}
                    />
                    {this.state.contactWithSymptomCheckbox ?
                        <FormInline>
                            <FormLabel>
                                Local onde ocorreu o contato:
                            </FormLabel>
                            <Selector
                                initValue={translate("selector.label")}
                                cancelText={translate("selector.cancelButton")}
                                data={localSymptom}
                                onChange={(option) => this.setState({ contactWithSymptom: option.key })}
                            />
                        </FormInline>
                        : null}
                    <CheckBoxStyled
                        title={translate("badReport.checkboxes.second")}
                        checked={this.state.lookedForHospital}
                        onPress={async () => await this.setState({ lookedForHospital: !this.state.lookedForHospital })}
                    />

                    <Button onPress={() => this.verifyLocalization()}>
                        <SendContainer>
                            <SendText>
                                {translate("badReport.checkboxConfirm")}
                            </SendText>
                        </SendContainer>
                    </Button>
                </ScrollViewStyled>

                <AwesomeAlert
                    show={showAlert}
                    showProgress={this.state.progressBarAlert ? true : false}
                    title={this.state.progressBarAlert ? translate("badReport.alertMessages.sending") : <Text>{translate("badReport.alertMessages.thanks")} {emojis[1]}</Text>}
                    message={<Text>{this.state.alertMessage}</Text>}
                    closeOnTouchOutside={this.state.progressBarAlert ? false : true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={this.state.progressBarAlert ? false : true}
                    cancelText="No, cancel"
                    confirmText="Voltar"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.props.navigation.navigate('Mapa')
                    }}
                    onDismiss={() => this.props.navigation.navigate('Mapa')}
                />
            </Container>
        );
    }
}

const emojis = [
    (
        <Emoji //Emoji heart up
            name='heart'
            style={{ fontSize: scale(15) }}
        />
    ),
    (
        <Emoji //Emoji tada up
            name='heavy_check_mark'
            style={{ fontSize: scale(15) }}
        />
    )
]

//make this component available to the app
export default BadReport;
