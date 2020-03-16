import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, AsyncStorage, NetInfo, Alert } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Imagem from '../../imgs/imageConst';
import { PermissionsAndroid } from 'react-native';
import { scale } from '../scallingUtils';
import Emoji from 'react-native-emoji';
import translate from '../../../locales/i18n';

const { height } = Dimensions.get('window')
let data = new Date();

class Report extends Component {
    static navigationOptions = {
        title: translate("report.title")
    }

    constructor(props) {
        super(props);
        this.state = {
            userLatitude: 'unknown',
            userLongitude: 'unknown',
            UserID: "",
            error: null,
            HouseholdId: "",
            showAlert: false, //Custom Alerts
            showProgressBar: false //Custom Progress Bar
        }
    }

    showAlert = () => {
        this.setState({
            showAlert: true,
            showProgressBar: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        })
    }

    _isconnected = () => {
        NetInfo.isConnected.fetch().then(isConnected => {
            isConnected ? this.sendSurvey() : Alert.alert(
                translate("noInternet.noInternetConnection"),
                translate("noInternet.ohNo"),
                [
                    {text: translate("noInternet.alertAllRightMessage"), onPress: () => null}
                ]
            )
        });
    }

    componentDidMount() {
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

    //Function that creates a requisition to send the survey to the API
    sendSurvey = async () => {
        this.showAlert();
        this.requestFineLocationPermission

        let UserID = await AsyncStorage.getItem('userID');
        this.setState({ UserID: UserID })

        let HouseholdId = await AsyncStorage.getItem('HouseholdId');
        this.setState({ HouseholdId: HouseholdId })

        fetch('https://guardianes.centeias.net/survey/create', {
            method: 'POST',
            body: JSON.stringify({
                user_id: this.state.UserID,
                houselhold_id: this.state.HouseholdId,
                lat: this.state.userLatitude,
                lon: this.state.userLongitude,
                no_symptom: "Y",
                week_of: data,
                hadContagiousContact: "none",
                hadHealthCare: "none",
                hadTravlledAbroad: "none",
                travelLocation: "none",
                app_token: "d41d8cd98f00b204e9800998ecf8427e",
                platform: "",

            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === false) {
                    this.setState({ showProgressBar: false });
                    AsyncStorage.setItem('survey_id', responseJson.id);
                } else {
                    alert(responseJson.message)
                    this.setState({ showProgressBar: false });
                }
            })
            .done();
    }


    render() {
        const { showAlert } = this.state;

        return (
            <View style={styles.container}>
                <ImageBackground source={Imagem.imagemFundo} style={styles.container} imageStyle={{ resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }}>
                    <View style={styles.textoPerguntaView}>
                        <Text style={styles.textoPergunta}>{translate("report.howHealth")}</Text>
                    </View>
                    <View style={styles.reportView}>
                        <TouchableOpacity onPress={this._isconnected}>
                            <Image style={{ width: 150, height: 150 }} source={Imagem.imagemGood} />
                            <Text style={styles.moodText}> {translate("report.goodChoice")} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BadReport')}>
                            <Image style={{ width: 150, height: 150 }} source={Imagem.imagemBad} />
                            <Text style={styles.moodText}> {translate("report.badChoice")} </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.reportFooter}>
                        {translate("report.else")}
                        </Text>
                    </View>
                </ImageBackground>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={this.state.showProgressBar ? true : false}
                    title={ this.state.showProgressBar ? translate("badReport.alertMessages.sending") : <Text>{translate("badReport.alertMessages.thanks")} {emojis[1]}{emojis[1]}{emojis[1]}</Text> }
                    message={this.state.showProgressBar ? null : <Text style={{ alignSelf: 'center' }}>{translate("badReport.alertMessages.reportSent")} {emojis[0]}{emojis[0]}{emojis[0]}</Text>}
                    closeOnTouchOutside={this.state.showProgressBar ? false : true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={this.state.showProgressBar ? false : true}
                    confirmText={translate("badReport.alertMessages.confirmText")}
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
            name='tada'
            style={{ fontSize: scale(15) }}
        />
    )
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titulo: {

    },
    textoPerguntaView: {
        marginTop: '7%',
        alignItems: 'center',
    },
    textoPergunta: {
        justifyContent: 'center',
        fontSize: 36,
        fontFamily: 'roboto',
        textAlign: 'center',
        color: '#465F6C',
    },
    reportView: {
        flex: 1,
        marginTop: '19%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    reportFooter: {
        justifyContent: 'center',
        fontFamily: 'roboto',
        fontSize: 16,
        textAlign: 'center',
        margin: '2%'
    },
    moodText: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'roboto',
        marginTop: '9%'
    },
})

//make this component available to the app
export default Report;
