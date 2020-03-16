import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, AsyncStorage, NetInfo, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import CountryPicker from 'react-native-country-picker-modal';
import AwesomeAlert from 'react-native-awesome-alerts';
import Emoji from 'react-native-emoji';
import { scale } from '../scallingUtils';
import { API_URL } from '../../constUtils';
import translate from '../../../locales/i18n';
import { Avatar } from 'react-native-elements';
import * as Imagem from '../../imgs/imageConst';
import { userLocation } from '../../constUtils';
import { PermissionsAndroid } from 'react-native';

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();

let today = y + "-" + m + "-" + d;

class BadReport extends Component {
    static navigationOptions = {
        title: translate("badReport.title")
    }

    constructor(props) {
        super(props);
        this.getLocation();
        this.getInfos();
        this.state = {
            cca2: 'BR',
            country: 'Brazil',
            contactWithSymptom: false,
            lookedForHospital: false,
            hadTraveled: false,
            symptoms: [],
            today_date: today,
            showAlert: false, //Custom Alerts
            showProgressBar: false //Custom Progress Bar
        }
    }

    showAlert = () => {
        this.setState({
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
        navigator.geolocation.getCurrentPosition(
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

    getInfos = async () => { //Ger user infos
        let userName = await AsyncStorage.getItem('userName');
        let userSelected = await AsyncStorage.getItem('userSelected');
        let avatarSelect = await AsyncStorage.getItem('avatarSelected');
        let userID = await AsyncStorage.getItem('userID');
        let userToken = await AsyncStorage.getItem('userToken');
        this.setState({ userName, userSelected, avatarSelect, userID, userToken });

        //Para não dar BO de variavel nula no IOS -- So puxa o async quando é um household
        if (this.state.userSelected === this.state.userName) {
            this.setState({ householdID: null })
        } else {
            let householdID = await AsyncStorage.getItem('householdID');
            this.setState({ householdID })
        }
        this.getSymptoms();
    }

    verifyLocalization = async () => {
        if(this.state.userLatitude == 0 || this.state.userLongitude == 0 || this.state.userLatitude == null || this.state.userLongitude == null){
            this.requestLocalization();
        } else{
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

    sendSurvey = async () => {
        this.showAlert();
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
                    went_to_hospital: this.state.lookedForHospital,
                    contact_with_symptom: this.state.contactWithSymptom,
                    symptom: this.state.symptoms
                }
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson !== null) {
                    this.setState({ showProgressBar: false });
                    console.warn("ENVIOU")
                    this.props.navigation.navigate('Home')
                } else {
                    console.warn("NÂO ENVIOU")
                    this.setState({ showProgressBar: false });
                }
            })
    }

    render() {
        const { showAlert } = this.state;
        const symptomsData = this.state.dataSource;

        const traveled = (
            <View>
                <View><Text style={styles.commomTextView}>{translate("badReport.checkboxes.fourth")}</Text></View>
                <CountryPicker
                    onChange={value => {
                        this.setState({ cca2: value.cca2, country: value.name })
                    }}
                    cca2={this.state.cca2}
                    translation="por"
                />
                <Text style={styles.textCountry}>{this.state.country}</Text>
                <View><Text style={{ alignSelf: 'center', paddingTop: 2, fontSize: 13 }}>{translate("badReport.checkboxes.fifth")}</Text></View>
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
                <View style={{ width: '100%', alignSeft: 'center', marginBottom: '2%', marginTop: '2%' }}>
                    <Text style={styles.dateText}>
                        {translate("badReport.sickAge")}
                    </Text>
                    <DatePicker
                        style={{ width: '94%', marginLeft: '3%', backgroundColor: '#a9cedb', borderRadius: 5 }}
                        date={this.state.today_date}
                        mode="date"
                        placeholder={translate("badReport.datePlaceHolder")}
                        format="YYYY-MM-DD"
                        minDate="2018-01-01"
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
                        title={translate("badReport.checkboxes.first")}
                        textStyle={{ color: '#348EAC', fontFamily: 'roboto' }}
                        checkedColor={'#348EAC'}
                        checked={this.state.contactWithSymptom}
                        onPress={async () => await this.setState({ contactWithSymptom: !this.state.contactWithSymptom })}
                    />
                    <CheckBox
                        title={translate("badReport.checkboxes.second")}
                        textStyle={{ color: '#348EAC', fontFamily: 'roboto' }}
                        checkedColor={'#348EAC'}
                        checked={this.state.lookedForHospital}
                        onPress={async () => await this.setState({ lookedForHospital: !this.state.lookedForHospital })}
                    />
                    <CheckBox
                        title={translate("badReport.checkboxes.third")}
                        textStyle={{ color: '#348EAC', fontFamily: 'roboto' }}
                        checkedColor={'#348EAC'}
                        checked={this.state.hadTraveled}
                        onPress={async () => await this.setState({ hadTraveled: !this.state.hadTraveled })}
                    />
                    {traveledTrue}
                    <View style={styles.buttonView}>
                        <Button title={translate("badReport.checkboxConfirm")} color="#348EAC" onPress={() => {
                            if (this.state.date !== null) {
                                //this._isconnected();
                                this.verifyLocalization();
                            }
                            else {
                                alert(translate("badReport.checkboxDateConfirmation"));
                            }
                        }
                        } />
                    </View>
                </ScrollView>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={this.state.progressBarAlert ? true : false}
                    title={this.state.progressBarAlert ? translate("badReport.alertMessages.sending") : <Text>{translate("badReport.alertMessages.thanks")} {emojis[1]}</Text>}
                    message={this.state.progressBarAlert ? null : <Text>{translate("badReport.alertMessages.reportSent")}{"\n"}{translate("badReport.alertMessages.seeADoctor")} {emojis[0]}{emojis[0]}{emojis[0]}</Text>}
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
                        this.props.navigation.navigate('Home')
                    }}
                    onDismiss={() => this.props.navigation.navigate('Home')}
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
        paddingRight: '5%'
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
        marginTop: 15,
        marginBottom: 20,
        width: "60%"
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
    }
});

//make this component available to the app
export default BadReport;
