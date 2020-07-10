import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, NetInfo, Alert, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import * as Imagem from '../../imgs/imageConst';
import { getNameParts, getInitials } from '../../utils/constUtils';
import { scale } from '../../utils/scallingUtils';
import translate from "../../../locales/i18n";
import Emoji from 'react-native-emoji';
import AwesomeAlert from 'react-native-awesome-alerts';
import {API_URL} from 'react-native-dotenv';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import LinearGradient from 'react-native-linear-gradient';

FontAwesome.loadFont();

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();

class Home extends Component {
    navOptions // rolê para acessar a drawer em uma função estática

    constructor(props) {
        super(props);
        this.getLocation();
        this.requestFineLocationPermission();
        this.state = {
            modalVisible: false,
            userSelect: null,
            userName: null,
            userID: null,
            userToken: null,
            householdName: null,
            householdID: null,
            userLastSurveys: [{ household: {} }],
            userLatitude: 'unknown',
            userLongitude: 'unknown',
            error: null,
            showAlert: false, //Custom Alerts
            showProgressBar: false, //Custom Progress Bar
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
            alertMessage: <Text>{alertMessage}{emojis[0]}</Text>,
            showProgressBar: false
        });
        console.warn(alertMessage)
    }

    showLoadingAlert = () => {
        this.setState({
            alertMessage: null,
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
            isConnected ? this.verifyLocalization() : Alert.alert(
                translate("noInternet.noInternetConnection"),
                translate("noInternet.ohNo"),
                [
                    { text: translate("noInternet.alertAllRightMessage"), onPress: () => null }
                ]
            )
        });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    onHeaderEventControl() { // rolê para acessar a drawer em uma função estática
        const { params = {} } = navOptions.state;
        params._openNav()
    }

    componentDidMount() {
        this.getInfo()

        this.props.navigation.setParams({ // rolê para acessar a drawer em uma função estática
            _onHeaderEventControl: this.onHeaderEventControl,
            _openNav: () => this.openDrawer()
        })
    }

    openDrawer() { // rolê para acessar a drawer em uma função estática
        this.props.navigation.openDrawer();
    }

    getLocation() {
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

    getInfo = async () => { //Get user infos
        const userID = await AsyncStorage.getItem('userID');
        const userName = await AsyncStorage.getItem('userName');
        const userAvatar = await AsyncStorage.getItem('userAvatar');
        const isProfessional = await AsyncStorage.getItem('isProfessional');
        const userToken = await RNSecureStorage.get('userToken');
        
        this.setState({ userID, userName, userAvatar, isProfessional, userToken });
        this.setState({ userSelect: this.state.userName, avatarSelect: this.state.userAvatar });

        AsyncStorage.setItem('userSelected', this.state.userSelect);
        AsyncStorage.setItem('avatarSelected', this.state.avatarSelect);
        this.getHouseholds();
        this.getUserLastSurveys();
    }

    getHouseholds = () => {//Get households
        //console.warn("UserID " + this.state.userID + " Token " + this.state.userToken)
        return fetch(`${API_URL}/users/${this.state.userID}/households`, {
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.households,
                })
                //console.warn(this.state.data)
            })
    }

    getUserLastSurveys = async () => {
        return fetch(`${API_URL}/users/${this.state.userID}/surveys`, {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let lastWeek = new Date();
                lastWeek.setDate(d - 7);
                lastWeek.setHours(0, 0, 0, 0);

                const userLastSurveys = responseJson.surveys.filter(survey => 
                    new Date(survey.created_at).getTime() >= lastWeek.getTime()
                );

                this.setState({ userLastSurveys });
                this.getUserHealth();
            })
    }

    getUserHealth = () => {
        let userBadReports = 0

        this.state.userLastSurveys.map(survey => {
            if (this.state.householdID) {
                if (survey.symptom.length > 0 && survey.household && survey.household.id == this.state.householdID) {
                    userBadReports = userBadReports + 1;
                }
            }
            else {
                if (survey.symptom.length > 0 && !survey.household) {
                    userBadReports = userBadReports + 1;
                }
            }
        })
        this.setState({ userBadReports });
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
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Guardiões da Saúde needs Location Permission',
              message:
                'Guardiões da Saúde needs access to your location ' +
                'so you can take locarion reports.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
          } else {
            console.log('Location permission denied');
            this.props.navigation.navigate('Home')
          }
        } catch (err) {
          console.warn(err);
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

    sendSurvey = async () => { //Send Survey GOOD CHOICE
        this.showLoadingAlert();
        try {
            let currentPin = {
                household_id: this.state.householdID,
                latitude: this.state.userLatitude,
                longitude: this.state.userLongitude
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
                }
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.showAlert(responseJson)
            })

    }

    render() {
        const { showAlert } = this.state;
        const { navigate } = this.props.navigation;

        const welcomeMessage = translate("home.hello") + getNameParts(this.state.userSelect);
        const householdsData = this.state.data;

        const userIsProfessional = (
            <View style={styles.rumorView}>
                <TouchableOpacity
                    //style={{ marginRight: '4%' }}
                    onPress={() => navigate("Rumor")}
                >
                    <Text style={{ color: 'white', fontFamily: 'roboto', marginLeft: '6%' }}>{translate("home.reportRumor")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Alert.alert('', translate("home.reportRumorMessage"), [{ text: 'Ok', onPress: () => null }])}
                >
                    {/* <Text style={{ fontSize: 18, padding: '2%'}}> */}
                    <FontAwesome style={{ marginRight: '2%'}} name="info-circle" size={25} color="white" />
                    {/* </Text> */}
                </TouchableOpacity>
            </View>
        )

        let isProfessionalTrue
        if (this.state.isProfessional == "true") {
            isProfessionalTrue = userIsProfessional
        } else {
            //isProfessionalTrue = userIsProfessional //Para aparecer sempre
        }

        const userHowYouFelling = (
            <Text style={styles.textFelling}>
                {translate("home.userHowYouFelling")}
            </Text>
        )

        const hasBadReports = this.state.userBadReports > 2

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#348EAC' barStyle="light-content" />

                <ScrollView contentContainerStyle={styles.scrollView}>
                    <LinearGradient style={styles.viewTop} colors={['#348EAC', '#166b87']}>
                        <Avatar
                            size="xlarge"
                            rounded
                            source={{uri: this.state.avatarSelect}}
                            title={getInitials(this.state.userSelect)}
                            activeOpacity={0.6}
                            containerStyle={styles.avatarTop}
                            onPress={() => {
                                this.getHouseholds();
                                this.setModalVisible(true);
                            }}
                        />
                        <View style={styles.viewWelcome}>
                            <Text style={styles.textHelloUser}>
                                {welcomeMessage}
                            </Text>

                            <Text style={styles.textNewGuardion}>
                                {translate("home.nowAGuardian")}
                            </Text>
                        </View>
                    </LinearGradient>

                    <View style={[styles.viewReport, styles.shadow]}>
                        {userHowYouFelling}

                        <View style={styles.containerGoodBad}>
                            <TouchableOpacity //onPress={this._isconnected}
                                style={[styles.viewChildGood, styles.shadow]}
                                activeOpacity={0.6}
                                onPress={() => this.verifyLocalization()}
                            >
                                <Text style={styles.textChoiceButton}>{translate("report.goodChoice")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.viewChildBad, styles.shadow]}
                                activeOpacity={0.6}
                                onPress={() => navigate('BadReport')}
                            >
                                <Text style={styles.textChoiceButton}>{translate("report.badChoice")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.viewHouseholdSelect}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                this.setModalVisible(!this.state.modalVisible); //Exit to modal view
                            }}>
                            <View style={styles.modalView}>
                                <View style={styles.modalViewTop}>
                                    <View style={styles.viewAvatar}>
                                        <Avatar
                                            size="large"
                                            rounded
                                            source={{uri: this.state.userAvatar}}
                                            title={getInitials(this.state.userName)}
                                            activeOpacity={0.6}
                                            onPress={async () => {
                                                await this.setState({ householdID: null, userSelect: this.state.userName, avatarSelect: this.state.userAvatar });
                                                this.setModalVisible(!this.state.modalVisible);
                                                AsyncStorage.setItem('userSelected', this.state.userSelect);
                                                AsyncStorage.setItem('avatarSelected', this.state.avatarSelect);
                                                AsyncStorage.removeItem('householdID');
                                                this.getUserHealth();
                                            }}
                                        />
                                        <Text>{getNameParts(this.state.userName, true)}</Text>
                                    </View>
                                    <ScrollView horizontal={true}>
                                        {householdsData != null ?
                                            householdsData.map((household, key) => {
                                                return (
                                                    <View style={styles.viewAvatar} key={key}>
                                                        <Avatar
                                                            size="large"
                                                            rounded
                                                            source={Imagem[household.picture]}
                                                            title={getInitials(household.description)}
                                                            activeOpacity={0.6}
                                                            onPress={async () => {
                                                                await this.setState({ householdID: household.id, householdName: household.description, userSelect: household.description, avatarSelect: household.picture });
                                                                this.setModalVisible(!this.state.modalVisible);
                                                                AsyncStorage.setItem('userSelected', this.state.userSelect);
                                                                AsyncStorage.setItem('avatarSelected', this.state.avatarSelect);
                                                                AsyncStorage.setItem('householdID', this.state.householdID.toString());
                                                                this.getUserHealth();
                                                            }}
                                                        />
                                                        <Text>{getNameParts(household.description, true)}</Text>
                                                    </View>
                                                )
                                            })
                                            : null}
                                    </ScrollView>
                                </View>
                                <View style={styles.modalViewBottom}>
                                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                                        navigate('Household');
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                        <FontAwesome name="plus-circle" size={scale(30)} color='rgba(22, 107, 135, 1)' />
                                        <Text>{translate("home.addProfile")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>

                    <View style={[styles.viewStatus, hasBadReports ? styles.viewStatusBad : styles.viewStatusGood]}>
                        <View style={styles.viewStatusIcon}>
                            <FontAwesome name={hasBadReports ? "exclamation-circle" : "check-circle"} size={50} color='#ffffff' style={styles.statusIcon} />
                        </View>
                        
                        <View style={styles.viewStatusContent}>
                            <Text style={styles.textStatusTitle}>
                                {translate("home.statusLast7Days")}
                            </Text>
                            <Text style={styles.textStatusContent}>
                                {hasBadReports ? translate("home.statusLast7DaysBad") : translate("home.statusLast7DaysGood")}
                            </Text>
                        </View>
                    </View>

                    {isProfessionalTrue}
                </ScrollView>

                <FontAwesome name="bars" onPress={() => this.props.navigation.openDrawer()} size={32} color='#ffffff' style={styles.menuBars}/>

                <AwesomeAlert
                    show={showAlert}
                    showProgress={this.state.showProgressBar ? true : false}
                    title={this.state.showProgressBar ? translate("badReport.alertMessages.sending") : <Text>{translate("badReport.alertMessages.thanks")} {emojis[1]}{emojis[1]}{emojis[1]}</Text>}
                    message={<Text style={{ alignSelf: 'center' }}>{this.state.alertMessage}</Text>}
                    closeOnTouchOutside={this.state.showProgressBar ? false : true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={this.state.showProgressBar ? false : true}
                    confirmText={translate("badReport.alertMessages.confirmText")}
                    confirmButtonColor='green'
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                    onDismiss={() => this.hideAlert()}
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
    scrollView: {
        backgroundColor: '#f4f4f4',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    menuBars: {
        position: 'absolute',
        left: '2%',
        top: 0,
        padding: '2%',
    },
    viewTop: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    avatarTop: {
        borderColor: '#ffffff',
        borderWidth: 3,
        height: scale(108),
        width: scale(108),
        marginTop: 50
    },
    viewWelcome: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 95,
    },
    textHelloUser: {
        fontSize: scale(22),
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: '3%'
    },
    textNewGuardion: {
        fontSize: scale(16),
        fontFamily: 'roboto',
        color: '#ffffff',
    },
    viewReport: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: -75,
    },
    textFelling: {
        fontFamily: 'roboto',
        fontWeight: 'bold',
        fontSize: scale(18),
        color: '#32323B',
        marginTop: scale(25)
    },
    containerGoodBad: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: scale(20),
        marginBottom: scale(32)
    },
    viewChildBad: {
        width: '49.25%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#F18F01',
        justifyContent: 'center',
        paddingVertical: 15
    },
    viewChildGood: {
        width: '49.25%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: '#5DD39E',
        justifyContent: 'center',
        paddingVertical: 15
    },
    textChoiceButton: {
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 18,
        alignSelf: 'center'
    },
    viewStatus: {
        backgroundColor: '#348EAC',
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        borderRadius: 10,
        //borderColor: '#c4c4c4',
        //borderWidth: 1,
        marginTop: scale(8),
        padding: scale(22),
    },
    viewStatusGood: {
        backgroundColor: '#348EAC',
    },
    viewStatusBad: {
        backgroundColor: '#F18F01',
    },
    viewStatusIcon: {
        marginRight: scale(20),
    },
    viewStatusContent: {
        //borderColor: '#c4c4c4',
        //borderWidth: 1,
    },
    textStatusTitle: {
        fontFamily: 'roboto',
        fontWeight: 'bold',
        fontSize: scale(16),
        color: '#ffffff',
    },
    textStatusContent: {
        fontFamily: 'roboto',
        fontSize: scale(16),
        color: '#ffffff',
    },
    viewHouseholdSelect: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: '4%',
    },
    modalView: {
        alignSelf: 'center',
        width: '93%',
        marginTop: scale(210),
        borderRadius: 15,
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 15
    },
    modalViewTop: {
        flexDirection: 'row'
    },
    modalViewBottom: {
        alignItems: 'center',
        marginBottom: 17
    },
    viewAvatar: {
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 17,
        marginBottom: 13
    },
    rumorView: {
        backgroundColor: '#348EAC',
        borderRadius: 20,
        flexDirection: 'row',
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 16,
        height: 38,
        justifyContent: 'center',
        //width: '35%',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

//make this component available to the app
export default Home;
