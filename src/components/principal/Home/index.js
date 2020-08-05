import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, NetInfo, Alert, Modal, ScrollView } from 'react-native';

import { Container, ScrollViewStyle, Background, UserView, Button, NamesContainer, TextName, AppName } from './styles';
import { StatusContainer, TextStyle, StatusBemMal, StatusText, Bem, Mal, Alertas, StatusBairro, StatusTitle, StatusBairroText, BairroContainer } from './styles';

import { PermissionsAndroid } from 'react-native';
import {API_URL} from 'react-native-dotenv';
import RNSecureStorage from 'rn-secure-storage';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import Geolocation from 'react-native-geolocation-service';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Emoji from 'react-native-emoji';
import { Avatar } from 'react-native-elements';
import * as Imagem from '../../../imgs/imageConst';
import { getNameParts, getInitials } from '../../../utils/constUtils';
import translate from "../../../../locales/i18n";
import { scale } from "../../../utils/scallingUtils";

Feather.loadFont();
SimpleLineIcons.loadFont();

let todayDate = new Date();
let d = todayDate.getDate();
let m = todayDate.getMonth() + 1;
let y = todayDate.getFullYear();

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
        this.fetchData()

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

    fetchData = async () => { //Get user infos
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
                    userBirth: responseJson.households[0].user.birthdate
                })
                //console.warn(this.state.data)
                AsyncStorage.setItem('userBirth', this.state.userBirth);
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

      const hasBadReports = this.state.userBadReports > 2

      return (          
          <Container>
            <StatusBar backgroundColor='#348EAC' barStyle="light-content"/>

            <ScrollViewStyle>
              <Background>
                <UserView>  
                  <NamesContainer>
                    <TextName>{welcomeMessage}</TextName>
                    <AppName>{translate("home.nowAGuardian")}</AppName>
                  </NamesContainer>
                  <Avatar
                    containerStyle={styles.userAvatar}
                    size={scale(58)}
                    source={{uri: this.state.avatarSelect}}
                    title={getInitials(this.state.userSelect)}
                    activeOpacity={0.6}
                    rounded
                    onPress={() => {
                        this.getHouseholds();
                        this.setModalVisible(true);
                    }}
                  />
                </UserView>
              </Background>

              <StatusContainer>
                <TextStyle>{translate("home.userHowYouFelling")}</TextStyle>
                <StatusBemMal>
                  <Bem onPress={() => this.verifyLocalization()}>
                    <StatusText>{translate("report.goodChoice")}</StatusText>
                  </Bem>
                  <Mal onPress={() => navigate('BadReport')}>
                    <StatusText>{translate("report.badChoice")}</StatusText>
                  </Mal>
                </StatusBemMal>
              </StatusContainer>
              
              <Alertas>Alertas</Alertas>

              {/*<BairroContainer>
                <SimpleLineIcons name='exclamation' size={48} color='#ffffff' />  
                <StatusBairro>
                  <StatusTitle>Status do seu bairro:</StatusTitle>
                  <StatusBairroText>Maioria sentindo-se bem</StatusBairroText>
                </StatusBairro>
              </BairroContainer>*/}

              <BairroContainer alert={hasBadReports}>
                <SimpleLineIcons name={hasBadReports ? "exclamation" : "check"} size={48} color='#ffffff' /> 
                <StatusBairro>
                  <StatusTitle>{translate("home.statusLast7Days")}</StatusTitle>
                  <StatusBairroText>
                      {hasBadReports ? translate("home.statusLast7DaysBad") : translate("home.statusLast7DaysGood")}
                  </StatusBairroText>
                </StatusBairro>
              </BairroContainer>

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
                            onPress={async () => {
                                await this.setState({ householdID: null, userSelect: this.state.userName, avatarSelect: this.state.userAvatar });
                                this.setModalVisible(!this.state.modalVisible);
                                AsyncStorage.setItem('userSelected', this.state.userSelect);
                                AsyncStorage.setItem('avatarSelected', this.state.avatarSelect);
                                AsyncStorage.setItem('userBirth', this.state.userBirth);
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
                                    source={{uri: household.picture}}
                                    title={getInitials(household.description)}
                                    activeOpacity={0.6}
                                    rounded
                                    onPress={async () => {
                                        await this.setState({ householdID: household.id, householdName: household.description, userSelect: household.description, avatarSelect: household.picture });
                                        this.setModalVisible(!this.state.modalVisible);
                                        AsyncStorage.setItem('userSelected', this.state.userSelect);
                                        AsyncStorage.setItem('avatarSelected', this.state.avatarSelect);
                                        AsyncStorage.setItem('userBirth', household.birthdate);
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
                          <Feather name="plus-circle" size={scale(30)} color='rgba(22, 107, 135, 1)' />
                          <Text>{translate("home.addProfile")}</Text>
                        </TouchableOpacity>
                      </View>
                  </View>
                </Modal>
              </View>

            </ScrollViewStyle>

            <Button
                style={styles.menuBars}
                onPress={() => this.props.navigation.openDrawer()}
            >
                <SimpleLineIcons name="menu" size={26} color='#ffffff' />
            </Button>

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
            name='tada'
            style={{ fontSize: scale(15) }}
        />
    )
]

const styles = StyleSheet.create({
    menuBars: {
        position: 'absolute',
        left: '6%',
        top: '3%',
        padding: '2%',
    },
    userAvatar: {
        marginRight: `${scale(8)}%`,
        backgroundColor: '#ffffff',
        borderRadius: 50,
        borderColor: '#ffffff',
        borderWidth: 3,
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
});

//make this component available to the app
export default Home;
