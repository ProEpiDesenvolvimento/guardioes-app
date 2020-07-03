import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, NetInfo, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import { CheckBox } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import AwesomeAlert from 'react-native-awesome-alerts';
import Emoji from 'react-native-emoji';
import { scale } from '../../utils/scallingUtils';
import { API_URL } from 'react-native-dotenv';
import translate from '../../../locales/i18n';
import { Avatar } from 'react-native-elements';
import * as Imagem from '../../imgs/imageConst';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import ModalSelector from 'react-native-modal-selector';
import { country, localSymptom } from '../../utils/selectorUtils';
import { Redirect } from '../../utils/constUtils';
import Share from "react-native-share";
import { cardWhatsapp } from '../../imgs/cardWhatsapp/cardWhatsapp_base64';

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
        this.getInfo();
        this.state = {
            cca2: 'BR',
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
                this.setState({
                    dataSource: responseJson.symptoms
                })
            })
    }

    getInfo = async () => { //Get user info
        const userID = await AsyncStorage.getItem('userID');
        const userName = await AsyncStorage.getItem('userName');
        const userSelected = await AsyncStorage.getItem('userSelected');
        const avatarSelect = await AsyncStorage.getItem('avatarSelected');
        const userToken = await RNSecureStorage.get('userToken');
        this.setState({ userName, userSelected, avatarSelect, userID, userToken });

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
                android.permission.ACCESS_FINE_LOCATION,
                {
                    'title': translate("maps.locationRequest.requestLocationMessageTitle"),
                    'message': translate("maps.locationRequest.requestLocationMessageMessage")
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.componentDidMount
            } else {
                console.warn(translate("maps.locationRequest.requestDenied"))
                this.props.navigation.navigate('Home')
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
                { text: 'Premitir', onPress: () => this.requestFineLocationPermission() },
            ],
            { cancelable: false },
        );
    }

    showCovidAlert = (responseJson) => {
        Alert.alert(
            responseJson.messages.top_syndrome_message.title,
            responseJson.messages.top_syndrome_message.warning_message,
            [
                { text: 'Mais informações', onPress: () => { Redirect("Ministerio da Saúde", "Deseja ser redirecionado para o website do Ministério da Saúde?", "https://coronavirus.saude.gov.br/")} },
                { text: 'Ok', onPress: () => this.showWhatsappAlert(responseJson) },
            ],
            { cancelable: false }
        )
    }

    showWhatsappAlert = (responseJson) => {
        Alert.alert(
            'Alertar Contatos',
            'Deseja compartilhar um comunicado para pessoas com que teve contato?',
            [
                { text: 'Não, irei avisá-los mais tarde', onPress: () => this.showAlert(responseJson) },
                { text: 'Sim', onPress: () =>  {
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

    sendSurvey = async () => {
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
                    traveled_to: this.state.country,
                    went_to_hospital: this.state.lookedForHospital,
                    contact_with_symptom: this.state.contactWithSymptom,
                    symptom: this.state.symptoms
                }
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && !responseJson.errors) {
                    if (responseJson.messages.top_3[0].name === "Síndrome Gripal")
                        this.showCovidAlert(responseJson)
                } else {
                    this.showAlert(responseJson)
                }
            })
    }

    render() {
        const { showAlert } = this.state;
        const symptomsData = this.state.dataSource;

        const traveled = (
            <View style={styles.viewRowCenter}>
                <View><Text style={styles.commomTextView}>{translate("badReport.checkboxes.fourth")}</Text></View>
                <View >
                    <ModalSelector
                        initValueTextStyle={{ color: 'black' }}
                        style={{ width: '80%', height: '70%', alignSelf: 'center' }}
                        data={country}
                        initValue={"Selecionar"}
                        onChange={(option) => this.setState({ country: option.key })}
                    />
                </View>
            </View>
        )

        let traveledTrue;
        if (this.state.hadTraveled == true) {
            traveledTrue = traveled
        }

        return (
            <View style={styles.container}>
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
                            {this.state.userSelected}
                        </Text>
                    </View>
                </View>
                <View style={{ width: '100%', alignSeft: 'center', marginBottom: '2%', marginTop: '2%' }}>
                    <Text style={styles.dateText}>
                        {translate("badReport.sickAge")}
                    </Text>
                    <DatePicker
                        style={{ width: '94%', marginLeft: '3%', backgroundColor: '#a9cedb', borderRadius: 5 }}
                        date={this.state.today_date}
                        androidMode='spinner'
                        locale={'pt-BR'}
                        mode="date"
                        placeholder={translate("badReport.datePlaceHolder")}
                        format="DD-MM-YYYY"
                        minDate="01-01-2018"
                        maxDate={today}
                        confirmBtnText={translate("birthDetails.confirmButton")}
                        cancelBtnText={translate("birthDetails.cancelButton")}
                        customStyles={{
                            dateInput: {
                                borderWidth: 0
                            },
                            dateText: {
                                fontFamily: 'roboto',
                                fontSize: 20
                            },
                            placeholderText: {
                                marginLeft: 14,
                                fontFamily: 'roboto',
                                fontSize: 18,
                                color: '#465F6C'
                            }
                        }}
                        onDateChange={(date) => { this.setState({ today_date: date }) }}
                    />
                </View>
                <ScrollView style={styles.scroll}>
                    <View style={styles.viewText}>
                        <Text style={styles.sintomasText}>
                            {translate("badReport.symptoms")}
                        </Text>
                    </View>
                    {symptomsData != null ?
                        symptomsData.map((symptom, index) => {
                            return (
                                <CheckBox
                                    key={index}
                                    textStyle={{ color: '#348EAC', fontFamily: 'roboto' }}
                                    checkedColor={'#348EAC'}
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
                    <View style={styles.viewText}>
                        <Text style={styles.sintomasText}>{translate("badReport.answerQuestions")}</Text>
                    </View>
                    <CheckBox
                        title={translate("badReport.checkboxes.third")}
                        textStyle={{ color: '#348EAC', fontFamily: 'roboto' }}
                        checkedColor={'#348EAC'}
                        checked={this.state.hadTraveled}
                        onPress={async () => await this.setState({ hadTraveled: !this.state.hadTraveled })}
                    />
                    {traveledTrue}
                    <CheckBox
                        title={translate("badReport.checkboxes.first")}
                        textStyle={{ color: '#348EAC', fontFamily: 'roboto' }}
                        checkedColor={'#348EAC'}
                        checked={this.state.contactWithSymptomCheckbox}
                        onPress={async () => await this.setState({ contactWithSymptomCheckbox: !this.state.contactWithSymptomCheckbox })}
                    />
                    {this.state.contactWithSymptomCheckbox ?
                        <View style={styles.viewRowCenter}>
                            <View><Text style={styles.commomTextView}>Selecione o local onde ocorreu o contato</Text></View>
                            <ModalSelector
                                initValueTextStyle={{ color: 'black' }}
                                style={{ width: '80%', height: '70%', alignSelf: 'center' }}
                                data={localSymptom}
                                initValue={"Selecionar"}
                                onChange={(option) => this.setState({ contactWithSymptom: option.key })}
                            />
                        </View>
                        : null}
                    <CheckBox
                        title={translate("badReport.checkboxes.second")}
                        textStyle={{ color: '#348EAC', fontFamily: 'roboto' }}
                        checkedColor={'#348EAC'}
                        checked={this.state.lookedForHospital}
                        onPress={async () => await this.setState({ lookedForHospital: !this.state.lookedForHospital })}
                    />

                    <View style={styles.buttonView}>
                        <Button title={translate("badReport.checkboxConfirm")} color="#348EAC" onPress={() =>
                            this.verifyLocalization()
                        } />
                    </View>
                </ScrollView>
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
            </View>
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

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 550,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    Top: {
        height: '15%',
        width: '100%',
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
    scroll: {
        paddingRight: '5%',
        //borderColor: 'green',
        //borderWidth: 3,
    },
    sintomasText: {
        textAlign: 'left',
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 5,
        fontSize: 17,
        fontFamily: 'roboto',
        color: '#348EAC'
    },
    dateText: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 17,
        fontFamily: 'roboto',
        color: '#348EAC'
    },
    viewText: {
        borderTopWidth: 2,
        alignSelf: 'center',
        width: '95%',
        borderTopColor: '#348EAC',
    },
    buttonView: {
        alignSelf: 'center',
        //marginTop: 15,
        //marginBottom: 20,
        width: "60%",
        //borderWidth: 1,
        //borderColor: 'red'
    },
    commomTextView: {
        fontSize: 15,
        alignSelf: 'center',
        paddingBottom: 4,
        fontWeight: 'bold'
    },
    textCountry: {
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: 'roboto',
    },
    viewRowCenter: {
        width: '100%',
        height: scale(65),
        justifyContent: "center"
    },
});

//make this component available to the app
export default BadReport;
