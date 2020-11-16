import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  StyleSheet,
  NetInfo,
  Alert,
  Modal,
} from 'react-native';

import {
  Container,
  ScrollViewStyle,
  Background,
  MenuBars,
  UserView,
  Button,
  NamesContainer,
  TextName,
  AppName,
} from './styles';
import {
  StatusContainer,
  TextStyle,
  StatusBemMal,
  StatusText,
  Bem,
  Mal,
  Alerts,
  AlertContainer,
} from './styles';
import {
  StatusAlert,
  StatusTitle,
  StatusAlertText,
  Users,
  UserSelector,
  UserScroll,
  UserWrapper,
  UserName,
} from './styles';
import {CoolAlert} from '../../../components/CoolAlert';

import {PermissionsAndroid} from 'react-native';
import {API_URL} from 'react-native-dotenv';
import RNSecureStorage from 'rn-secure-storage';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Emoji from 'react-native-emoji';
import {Avatar} from 'react-native-elements';
import {
  getNameParts,
  handleAsyncAvatar,
  handleAvatar,
  getInitials,
  logoutApp,
} from '../../../utils/constUtils';
import translate from '../../../../locales/i18n';
import {scale} from '../../../utils/scallingUtils';
import OneSignal from 'react-native-onesignal';

Feather.loadFont();
SimpleLineIcons.loadFont();

class Home extends Component {
  navOptions; // rolê para acessar a drawer em uma função estática

  constructor(props) {
    super(props);
    this.getLocation();
    this.props.navigation.addListener('willFocus', payload => {
      if (!this.state.isLoading) this.fetchData();
    });
    this.state = {
      userSelected: '',
      userName: null,
      userID: null,
      userToken: null,
      householdName: null,
      householdID: null,
      userLastSurveys: [{household: {}}],
      userLatitude: 'unknown',
      userLongitude: 'unknown',
      error: null,
      modalVisible: false,
      showTermsConsent: false,
      showAlert: false, //Custom Alerts
      showProgressBar: false, //Custom Progress Bar
      alertMessage: null,
      isLoading: true,
    };
  }

  showAlert = responseJson => {
    let alertMessage = '';
    if (responseJson !== null && !responseJson.errors) {
      alertMessage = responseJson.feedback_message
        ? responseJson.feedback_message
        : translate('badReport.alertMessages.reportSent');
    } else {
      alertMessage = translate('badReport.alertMessages.reportNotSent');
    }
    this.setState({
      alertMessage: (
        <Text>
          {alertMessage} {emojis[0]}
        </Text>
      ),
      showProgressBar: false,
    });
    console.warn(alertMessage);
  };

  showLoadingAlert = () => {
    this.setState({
      alertMessage: null,
      showAlert: true,
      showProgressBar: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _isconnected = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      isConnected
        ? this.verifyLocalization()
        : Alert.alert(
            translate('noInternet.noInternetConnection'),
            translate('noInternet.ohNo'),
            [
              {
                text: translate('noInternet.alertAllRightMessage'),
                onPress: () => null,
              },
            ],
          );
    });
  };

  newTermsPolicy = () => {
    this.setState({showTermsConsent: false});

    Alert.alert(
      Terms.title,
      Terms.text,
      [
        {
          text: Terms.disagree,
          onPress: () => {
            logoutApp(this.props.navigation);
          },
          style: 'cancel',
        },
        {
          text: Terms.agree,
          onPress: () => {
            this.updateUserTermsConsent();
          },
        },
      ],
      {cancelable: false},
    );
  };

  onHeaderEventControl() {
    // rolê para acessar a drawer em uma função estática
    const {params = {}} = navOptions.state;
    params._openNav();
  }

  componentDidMount() {
    this.verifyUserTermsConsent();
    this.fetchData();
    this.updateUserInfosToOneSignal();

    this.props.navigation.setParams({
      // rolê para acessar a drawer em uma função estática
      _onHeaderEventControl: this.onHeaderEventControl,
      _openNav: () => this.openDrawer(),
    });
  }

  openDrawer() {
    // rolê para acessar a drawer em uma função estática
    this.props.navigation.openDrawer();
  }

  getLocation() {
    this.requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLatitude: position.coords.latitude,
          userLongitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 50000},
    );
  }

  verifyUserTermsConsent = () => {
    const {params} = this.props.navigation.state;
    const currentPolicyTerms = Terms.version;
    const userPolicyTerms = params.userTermsVersion;

    if (userPolicyTerms && userPolicyTerms < currentPolicyTerms) {
      this.setState({showTermsConsent: true});
    }
  };

  updateUserTermsConsent = async () => {
    return fetch(`${API_URL}/users/${this.state.userID}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
        Authorization: `${this.state.userToken}`,
      },
      body: JSON.stringify({
        policy_version: Terms.version,
      }),
    }).then(response => {
      console.warn(response.status);
    });
  };

  initUserSelected = async () => {
    const userSelected = await AsyncStorage.getItem('userSelected');
    const birthSelected = await AsyncStorage.getItem('birthSelected');

    if (userSelected && birthSelected) {
      const avatarSelected = await AsyncStorage.getItem('avatarSelected');
      const createdSelected = await AsyncStorage.getItem('createdSelected');

      this.setState({
        userSelected,
        birthSelected,
        avatarSelected,
        createdSelected,
      });
    } else {
      AsyncStorage.setItem('userSelected', this.state.userName);
      AsyncStorage.setItem('birthSelected', this.state.userBirth);
      AsyncStorage.setItem(
        'avatarSelected',
        handleAsyncAvatar(this.state.userAvatar),
      );
      AsyncStorage.setItem('createdSelected', this.state.userCreatedAt);

      this.setState({
        userSelected: this.state.userName,
        birthSelected: this.state.userBirth,
        avatarSelected: this.state.userAvatar,
        createdSelected: this.state.userCreatedAt,
      });
    }
  };

  fetchData = async () => {
    //Get user infos
    const userID = await AsyncStorage.getItem('userID');
    const userName = await AsyncStorage.getItem('userName');
    const userBirth = await AsyncStorage.getItem('userBirth');
    const userAvatar = await AsyncStorage.getItem('userAvatar');
    const userCreatedAt = await AsyncStorage.getItem('userCreatedAt');
    const userToken = await RNSecureStorage.get('userToken');
    this.setState({
      userID,
      userName,
      userBirth,
      userAvatar,
      userCreatedAt,
      userToken,
    });

    this.initUserSelected();
    this.getHouseholds();
    this.getHouseholdAvatars();
    this.getUserLastSurveys();
    this.setState({isLoading: false});
  };

  getHouseholds = () => {
    //Get households
    return fetch(`${API_URL}/users/${this.state.userID}/households`, {
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `${this.state.userToken}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          data: responseJson.households,
        });
        //console.warn(this.state.data)
      });
  };

  getHouseholdAvatars = async () => {
    let householdAvatars = JSON.parse(
      await AsyncStorage.getItem('householdAvatars'),
    );

    if (!householdAvatars) {
      householdAvatars = {};
    }

    this.setState({householdAvatars});
  };

  getUserLastSurveys = async () => {
    return fetch(`${API_URL}/users/${this.state.userID}/surveys`, {
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
        Authorization: `${this.state.userToken}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let todayDate = new Date();

        let lastWeek = new Date();
        lastWeek.setDate(todayDate.getDate() - 7);
        lastWeek.setHours(0, 0, 0, 0);

        const userLastSurveys = responseJson.surveys.filter(
          survey => new Date(survey.created_at).getTime() >= lastWeek.getTime(),
        );

        this.setState({userLastSurveys});
        this.getUserHealth();
      });
  };

  getUserHealth = () => {
    let userBadReports = 0;

    this.state.userLastSurveys.map(survey => {
      if (this.state.householdID) {
        if (
          survey.symptom.length > 0 &&
          survey.household &&
          survey.household.id == this.state.householdID
        ) {
          userBadReports = userBadReports + 1;
        }
      } else {
        if (survey.symptom.length > 0 && !survey.household) {
          userBadReports = userBadReports + 1;
        }
      }
    });

    this.setState({userBadReports});
  };

  verifyLocalization = async () => {
    if (
      this.state.userLatitude == 0 ||
      this.state.userLongitude == 0 ||
      this.state.userLatitude == null ||
      this.state.userLongitude == null
    ) {
      this.requestLocationAlert();
    } else {
      this.sendSurvey();
    }
  };

  requestLocationAlert = () => {
    Alert.alert(
      translate('home.locationError'),
      translate('home.locationError2'),
      [
        {
          text: translate('selector.cancelButton'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: translate('home.permission'),
          onPress: () => this.requestLocationPermission(),
        },
      ],
      {cancelable: false},
    );
  };

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: translate('home.localPermissionTitle'),
          message:
            translate('home.localPermissionMessage1') +
            translate('home.localPermissionMessage2'),
          buttonNegative: translate('selector.cancelButton'),
          buttonPositive: translate('okText'),
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied on Android');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  sendSurvey = async () => {
    //Send Survey GOOD CHOICE
    this.showLoadingAlert();

    let currentPin = {
      household_id: this.state.householdID,
      latitude: this.state.userLatitude,
      longitude: this.state.userLongitude,
    };

    return fetch(`${API_URL}/users/${this.state.userID}/surveys`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
        Authorization: `${this.state.userToken}`,
      },
      body: JSON.stringify({
        survey: {
          household_id: this.state.householdID,
          latitude: this.state.userLatitude,
          longitude: this.state.userLongitude,
        },
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.showAlert(responseJson);
        this.countUserScore();
        AsyncStorage.setItem('localpin', JSON.stringify(currentPin));
      });
  };

  countUserScore = async () => {
    const lastReport = await AsyncStorage.getItem('lastReport');
    const userScore = parseInt(await AsyncStorage.getItem('userScore'));

    this.setState({lastReport, userScore});

    let dt1 = new Date(this.state.lastReport);
    let dt2 = new Date(); // Today

    const auxCount = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24),
    );

    switch (auxCount) {
      case 1:
        // Acrescenta um dia na contagem e atualiza o lastReport
        console.warn('Reportou no dia anterior');
        this.setState({userScore: this.state.userScore + 1});
        AsyncStorage.setItem('lastReport', dt2.toString());
        AsyncStorage.setItem('userScore', this.state.userScore.toString());
        break;
      case 0:
        // Nada acontece
        console.warn('Já reportou hoje');
        break;
      default:
        // Zera a contagem e atualiza o lastReport
        console.warn('Não reportou no dia anterior');
        this.setState({userScore: 0});
        AsyncStorage.setItem('lastReport', dt2.toString());
        AsyncStorage.setItem('userScore', this.state.userScore.toString());
        break;
    }
    console.warn('User Score: ' + this.state.userScore);
    OneSignal.sendTags({score: this.state.userScore});
  };

  updateUserInfosToOneSignal = async () => {
    return fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: await RNSecureStorage.get('userEmail'),
          password: await RNSecureStorage.get('userPwd'),
        },
      }),
    })
      .then(response => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then(responseJson => {
        //Send User ID to Push Notification API
        OneSignal.setExternalUserId(responseJson.user.id.toString());

        // Variables to OneSignal API
        AsyncStorage.setItem(
          'userGroup',
          responseJson.user.group.split('/')[3],
        );
        AsyncStorage.setItem('userCity', responseJson.user.city);
        AsyncStorage.setItem(
          'userSchoolID',
          responseJson.user.school_unit_id.toString(),
        );

        //Send user TAGs
        OneSignal.sendTags({
          group: responseJson.user.group.split('/')[3],
          city: responseJson.user.city,
          school_unit_id: responseJson.user.school_unit_id.toString(),
        });
      });
  };

  render() {
    const {showTermsConsent} = this.state;
    const {showAlert} = this.state;
    const {navigate} = this.props.navigation;

    const householdsData = this.state.data;
    const householdAvatars = this.state.householdAvatars;

    const hasBadReports = this.state.userBadReports > 2;

    return (
      <>
        <SafeAreaView style={{flex: 0, backgroundColor: '#348EAC'}} />
        <StatusBar backgroundColor="#348EAC" barStyle="light-content" />
        <Container>
          <ScrollViewStyle>
            <Background>
              <UserView>
                <NamesContainer>
                  <TextName>
                    {translate('home.hello') +
                      getNameParts(this.state.userSelected)}
                  </TextName>
                  <AppName>{translate('home.nowAGuardian')}</AppName>
                </NamesContainer>
                <Avatar
                  containerStyle={styles.Avatar}
                  size={scale(58)}
                  source={handleAvatar(this.state.avatarSelected)}
                  title={getInitials(this.state.userSelected)}
                  editButton={{
                    name: null,
                    type: 'feather',
                    style: styles.dotAvatar,
                  }}
                  showEditButton
                  activeOpacity={0.5}
                  rounded
                  onPress={() => {
                    this.getHouseholds();
                    this.setModalVisible(true);
                  }}
                />
              </UserView>
            </Background>

            <StatusContainer>
              <TextStyle>{translate('home.userHowYouFelling')}</TextStyle>
              <StatusBemMal>
                <Bem onPress={() => this.verifyLocalization()}>
                  <StatusText>{translate('report.goodChoice')}</StatusText>
                </Bem>
                <Mal onPress={() => navigate('BadReport')}>
                  <StatusText>{translate('report.badChoice')}</StatusText>
                </Mal>
              </StatusBemMal>
            </StatusContainer>

            <Alerts>{translate('home.alerts')}</Alerts>

            <AlertContainer alert={hasBadReports}>
              <SimpleLineIcons
                name={hasBadReports ? 'exclamation' : 'check'}
                size={48}
                color="#ffffff"
              />
              <StatusAlert>
                <StatusTitle>{translate('home.statusLast7Days')}</StatusTitle>
                <StatusAlertText>
                  {hasBadReports
                    ? translate('home.statusLast7DaysBad')
                    : translate('home.statusLast7DaysGood')}
                </StatusAlertText>
              </StatusAlert>
            </AlertContainer>

            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!this.state.modalVisible); //Exit to modal view
              }}>
              <Users>
                <UserSelector>
                  <UserScroll>
                    <UserWrapper>
                      <Button
                        onPress={async () => {
                          await this.setState({
                            householdID: null,
                            userSelected: this.state.userName,
                            birthSelected: this.state.userBirth,
                            avatarSelected: this.state.userAvatar,
                            createdSelected: this.state.userCreatedAt,
                          });
                          this.setModalVisible(!this.state.modalVisible);
                          AsyncStorage.setItem(
                            'userSelected',
                            this.state.userSelected,
                          );
                          AsyncStorage.setItem(
                            'birthSelected',
                            this.state.birthSelected,
                          );
                          AsyncStorage.setItem(
                            'avatarSelected',
                            handleAsyncAvatar(this.state.avatarSelected),
                          );
                          AsyncStorage.setItem(
                            'createdSelected',
                            this.state.createdSelected,
                          );
                          AsyncStorage.removeItem('householdID');
                          this.getUserHealth();
                        }}>
                        <Avatar
                          size={scale(60)}
                          source={handleAvatar(this.state.userAvatar)}
                          title={getInitials(this.state.userName)}
                          rounded
                        />
                        <UserName>
                          {getNameParts(this.state.userName, true)}
                        </UserName>
                      </Button>
                    </UserWrapper>
                    {householdsData != null
                      ? householdsData.map(household => {
                          return (
                            <UserWrapper key={household.id}>
                              <Button
                                onPress={async () => {
                                  await this.setState({
                                    householdID: household.id,
                                    householdName: household.description,
                                    userSelected: household.description,
                                    birthSelected: household.birthdate,
                                    avatarSelected:
                                      householdAvatars[household.id],
                                    createdSelected: household.created_at,
                                  });
                                  this.setModalVisible(
                                    !this.state.modalVisible,
                                  );
                                  AsyncStorage.setItem(
                                    'userSelected',
                                    this.state.userSelected,
                                  );
                                  AsyncStorage.setItem(
                                    'birthSelected',
                                    this.state.birthSelected,
                                  );
                                  AsyncStorage.setItem(
                                    'avatarSelected',
                                    handleAsyncAvatar(
                                      this.state.avatarSelected,
                                    ),
                                  );
                                  AsyncStorage.setItem(
                                    'createdSelected',
                                    this.state.createdSelected,
                                  );
                                  AsyncStorage.setItem(
                                    'householdID',
                                    this.state.householdID.toString(),
                                  );
                                  this.getUserHealth();
                                }}>
                                <Avatar
                                  size={scale(60)}
                                  source={handleAvatar(
                                    householdAvatars[household.id],
                                  )}
                                  title={getInitials(household.description)}
                                  rounded
                                />
                                <UserName>
                                  {getNameParts(household.description, true)}
                                </UserName>
                              </Button>
                            </UserWrapper>
                          );
                        })
                      : null}
                    <UserWrapper>
                      <Button
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                          navigate('NovoPerfil');
                        }}>
                        <Feather name="plus" size={scale(60)} color="#c4c4c4" />
                        <UserName>{translate('home.addProfile')}</UserName>
                      </Button>
                    </UserWrapper>
                  </UserScroll>
                </UserSelector>
              </Users>
            </Modal>
          </ScrollViewStyle>

          <MenuBars onPress={() => this.props.navigation.openDrawer()}>
            <SimpleLineIcons name="menu" size={26} color="#ffffff" />
          </MenuBars>

          <CoolAlert
            show={showTermsConsent}
            title={translate('useTerms.consentTitle')}
            message={translate('useTerms.consentMessage')}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText={translate('useTerms.seeTerms')}
            onConfirmPressed={() => this.newTermsPolicy()}
          />

          <CoolAlert
            show={showAlert}
            showProgress={this.state.showProgressBar}
            title={
              this.state.showProgressBar ? (
                translate('badReport.alertMessages.sending')
              ) : (
                <Text>
                  {translate('badReport.alertMessages.thanks')} {emojis[1]}
                  {emojis[1]}
                  {emojis[1]}
                </Text>
              )
            }
            message={this.state.alertMessage}
            closeOnTouchOutside={this.state.showProgressBar ? false : true}
            closeOnHardwareBackPress={false}
            showConfirmButton={this.state.showProgressBar ? false : true}
            confirmText={translate('badReport.alertMessages.confirmText')}
            onCancelPressed={() => this.hideAlert()}
            onConfirmPressed={() => this.hideAlert()}
            onDismiss={() => this.hideAlert()}
          />
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  Avatar: {
    marginRight: `${scale(8)}%`,
    borderColor: '#ffffff',
    borderWidth: 3,
  },
  dotAvatar: {
    height: scale(14),
    width: scale(14),
    backgroundColor: '#ffffff',
    left: 0,
    shadowOpacity: 0,
  },
});

const Terms = {
  title: translate('useTerms.title'),
  text: `${translate('useTerms.terms.textoTermosTitulo')}\n
        ${translate('useTerms.terms.textoTermos_1')}\n
        ${translate('useTerms.terms.textoTermos_2')}\n
        ${translate('useTerms.terms.textoTermos_3')}\n
        ${translate('useTerms.terms.textoTermos_4')}\n
        ${translate('useTerms.terms.textoTermos_5')}\n
        ${translate('useTerms.terms.textoTermos_6')}\n
        ${translate('useTerms.terms.textoTermos_7')}\n
        ${translate('useTerms.terms.textoTermos_8')}\n
        ${translate('useTerms.terms.textoTermos_9')}\n
        ${translate('useTerms.terms.textoTermos_10')}\n
        ${translate('useTerms.terms.textoTermos_11')}\n
        ${translate('useTerms.terms.textoTermos_12')}\n
        ${translate('useTerms.terms.textoTermos_13')}`,
  version: translate('useTerms.compilation'),
  disagree: translate('useTerms.disagree'),
  agree: translate('useTerms.agree'),
};

const emojis = [
  <Emoji //Emoji heart up
    name="heart"
    style={{fontSize: scale(15)}}
  />,
  <Emoji //Emoji tada up
    name="tada"
    style={{fontSize: scale(15)}}
  />,
];

//make this component available to the app
export default Home;
