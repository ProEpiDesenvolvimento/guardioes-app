import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import Share from 'react-native-share';
import OneSignal from 'react-native-onesignal';
import Geolocation from 'react-native-geolocation-service';

import ScreenLoader from '../../../components/ScreenLoader';
import {
  ScrollViewStyled,
  DateSince,
  DateText,
  DateSelector,
  FormTitleWrapper,
  FormTitle,
  CheckBoxStyled,
  Button,
} from './styles';
import {
  Container,
  FormInline,
  FormLabel,
  Selector,
  SendContainer,
  SendText,
} from '../../../components/NormalForms';
import { CoolAlert } from '../../../components/CoolAlert';
import translate from '../../../../locales/i18n';
import {
  getNameParts,
  handleAvatar,
  getInitials,
  Redirect,
} from '../../../utils/constUtils';
import { localSymptom } from '../../../utils/selectorUtils';
import { cardWhatsapp } from '../../../img/cardWhatsapp/cardWhatsapp_base64';
import { getSymptoms, sendSurvey } from '../../../services/BadReportService';
import UserCard from './components/UserCard';
import SymptomsCheck from './components/SymtomsCheck';
import emojis from './Emojis';
import requestFineLocationPermission from './RequestLocation';

const data = new Date();
const today = `${data.getDate()}-${data.getMonth() + 1}-${data.getFullYear()}`;

const shareOptions = {
  message: translate('badReport.alertMessages.covidSuspect'),
  url: cardWhatsapp,
};
class BadReport extends Component {
  static navigationOptions = {
    title: translate('badReport.title'),
  };

  constructor(props) {
    super(props);
    this.getLocation();
    const { navigation } = props;
    navigation.addListener('willFocus', () => {
      this.fetchData();
    });
    this.state = {
      isLoading: true,
      country: 'Brazil',
      contactWithSymptomCheckbox: false,
      contactWithSymptom: null,
      lookedForHospital: false,
      hadTraveled: false,
      symptoms: [],
      today_date: today,
      showAlert: false, // Custom Alerts
      progressBarAlert: false, // Custom Progress Bar
      alertMessage: null,
    };
  }

  getLocation() {
    requestFineLocationPermission();
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLatitude: position.coords.latitude,
          userLongitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 50000 }
    );
  }

  showAlert = (responseJson) => {
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
          {'\n'}
          {translate('badReport.alertMessages.seeADoctor')}
        </Text>
      ),
      progressBarAlert: false,
    });
    console.warn(alertMessage);
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
      progressBarAlert: true,
    });
  };

  showLoadingAlert = () => {
    this.setState({
      alertMessage: null,
      showAlert: true,
      progressBarAlert: true,
    });
  };

  fetchData = async () => {
    // Get user info
    const userID = await AsyncStorage.getItem('userID');
    const userName = await AsyncStorage.getItem('userName');
    const userSelected = await AsyncStorage.getItem('userSelected');
    const avatarSelected = await AsyncStorage.getItem('avatarSelected');
    const userToken = await RNSecureStorage.get('userToken');
    this.setState({
      userName,
      userSelected,
      avatarSelected,
      userID,
      userToken,
    });

    // Para não dar BO de variavel nula no IOS -- So puxa o async quando é um household
    if (this.state.userSelected === this.state.userName) {
      this.setState({ householdID: null });
    } else {
      const householdID = await AsyncStorage.getItem('householdID');
      this.setState({ householdID });
    }
    const alfabetica = await getSymptoms(userToken);

    this.setState({
      dataSource: alfabetica,
      isLoading: false,
    });
  };

  verifyLocalization = async () => {
    if (
      this.state.userLatitude === 0 ||
      this.state.userLongitude === 0 ||
      this.state.userLatitude == null ||
      this.state.userLongitude == null
    ) {
      this.requestLocalization();
    } else {
      this.sendSurvey();
    }
  };

  requestLocalization = () => {
    Alert.alert(
      translate('home.locationError'),
      translate('home.locationError'),
      [
        {
          text: translate('selector.cancelButton'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'permitir',
          onPress: () => requestFineLocationPermission(),
        },
      ],
      { cancelable: false }
    );
  };

  showSyndromeAlert = (responseJson) => {
    let response = [];
    if (responseJson.messages.top_3[0].name === 'Síndrome Gripal') {
      response = [
        {
          text: translate('advices.moreInformations'),
          onPress: () => {
            Redirect(
              'Ministerio da Saúde',
              'Deseja ser redirecionado para o website do Ministério da Saúde?',
              'https://coronavirus.saude.gov.br/sobre-a-doenca#se-eu-ficar-doente'
            );
          },
        },
        { text: 'Ok', onPress: () => this.showWhatsappAlert(responseJson) },
      ];
    } else {
      response = [{ text: 'Ok', onPress: () => this.showAlert(responseJson) }];
    }
    Alert.alert(
      responseJson.messages.top_syndrome_message.title,
      responseJson.messages.top_syndrome_message.warning_message,
      response,
      { cancelable: false }
    );
  };

  showWhatsappAlert = (responseJson) => {
    Alert.alert(
      translate('map.alert'),
      translate('map.share'),
      [
        {
          text: translate('map.noAlert'),
          onPress: () => this.showAlert(responseJson),
        },
        {
          text: translate('badReport.yes'),
          onPress: () => {
            Share.open(shareOptions)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => err && console.log(err));
            this.showAlert(responseJson);
          },
        },
      ],
      { cancelable: false }
    );
  };

  countUserScore = async () => {
    const lastReport = await AsyncStorage.getItem('lastReport');
    const userScore = parseInt(await AsyncStorage.getItem('userScore'), 10);

    this.setState({ lastReport, userScore });

    const dt1 = new Date(this.state.lastReport);
    const dt2 = new Date(); // Today

    const auxCount = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );

    switch (auxCount) {
      case 1:
        // Acrescenta um dia na contagem e atualiza o lastReport
        console.warn('reportou no dia anterior');
        this.setState({ userScore: this.state.userScore + 1 });
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
        this.setState({ userScore: 0 });
        AsyncStorage.setItem('lastReport', dt2.toString());
        AsyncStorage.setItem('userScore', this.state.userScore.toString());
        break;
    }
    console.warn(`User Score: ${this.state.userScore}`);
    OneSignal.sendTags({ score: this.state.userScore });
  };

  sendSurvey = async () => {
    this.showLoadingAlert();

    const currentPin = {
      household_id: this.state.householdID,
      latitude: this.state.userLatitude,
      longitude: this.state.userLongitude,
      symptom: this.state.symptoms,
    };

    const {
      householdID,
      userLatitude,
      userLongitude,
      today_date,
      hadTraveled,
      lookedForHospital,
      contactWithSymptom,
      symptoms,
      userID,
      userToken,
    } = this.state;

    sendSurvey(
      {
        householdID,
        userLatitude,
        userLongitude,
        today_date,
        hadTraveled,
        lookedForHospital,
        contactWithSymptom,
        symptoms,
      },
      userToken,
      userID
    ).then((responseJson) => {
      this.countUserScore();
      AsyncStorage.setItem('localpin', JSON.stringify(currentPin));

      if (responseJson && !responseJson.errors && responseJson.messages.top_3) {
        if (responseJson.messages.top_3[0]) {
          this.showSyndromeAlert(responseJson);
        } else this.showAlert(responseJson);
      } else {
        this.showAlert(responseJson);
      }
    });
  };

  onSelectSymptom = async (symptomCode, index) => {
    await this.setState({
      [symptomCode]: !this.state[symptomCode],
    });
    if (this.state[symptomCode] === true) {
      const symptomsClone = this.state.symptoms.slice(); // creates the clone of the state
      symptomsClone[index] = symptomCode;
      await this.setState({ symptoms: symptomsClone });
      // console.warn(symptom.description + ": " + this.state[symptom.code])
    } else {
      const symptomsClone = this.state.symptoms.slice(); // creates the clone of the state
      symptomsClone[index] = null;
      await this.setState({ symptoms: symptomsClone });
      // console.warn(symptom.description + ": " + this.state[symptom.code])
    }
  };

  render() {
    const { showAlert } = this.state;
    const symptomsData = this.state.dataSource;

    if (this.state.isLoading) {
      return <ScreenLoader />;
    }

    return (
      <Container>
        <ScrollViewStyled>
          <UserCard
            avatarSelected={handleAvatar(this.state.avatarSelected)}
            nameInitials={getInitials(this.state.userSelected)}
            avatarSize={58}
            nameParts={getNameParts(this.state.userSelected, true)}
          />

          <DateSince>
            <DateText>{translate('badReport.sickAge')}</DateText>
            <DateSelector
              placeholder={translate('badReport.datePlaceHolder')}
              date={this.state.today_date}
              format='DD-MM-YYYY'
              minDate='01-01-2018'
              maxDate={today}
              locale='pt-BR'
              confirmBtnText={translate('birthDetails.confirmButton')}
              cancelBtnText={translate('birthDetails.cancelButton')}
              onDateChange={(date) => {
                this.setState({ today_date: date });
              }}
            />
          </DateSince>
          <SymptomsCheck
            checked={(symptomCode) => this.state[symptomCode]}
            onPress={(symptomCode, index) =>
              this.onSelectSymptom(symptomCode, index)
            }
            symptomsData={symptomsData}
          />
          <FormTitleWrapper>
            <FormTitle>{translate('badReport.answerQuestions')}</FormTitle>
          </FormTitleWrapper>
          <CheckBoxStyled
            title={translate('badReport.checkboxes.third')}
            checked={this.state.hadTraveled}
            onPress={async () =>
              this.setState({ hadTraveled: !this.state.hadTraveled })
            }
          />
          {/* traveledTrue */}
          <CheckBoxStyled
            title={translate('badReport.checkboxes.first')}
            checked={this.state.contactWithSymptomCheckbox}
            onPress={async () =>
              this.setState({
                contactWithSymptomCheckbox: !this.state
                  .contactWithSymptomCheckbox,
              })
            }
          />
          {this.state.contactWithSymptomCheckbox ? (
            <FormInline>
              <FormLabel>Local onde ocorreu o contato:</FormLabel>
              <Selector
                initValue={translate('selector.label')}
                cancelText={translate('selector.cancelButton')}
                data={localSymptom}
                onChange={(option) =>
                  this.setState({ contactWithSymptom: option.key })
                }
              />
            </FormInline>
          ) : null}
          <CheckBoxStyled
            title={translate('badReport.checkboxes.second')}
            checked={this.state.lookedForHospital}
            onPress={async () =>
              this.setState({
                lookedForHospital: !this.state.lookedForHospital,
              })
            }
          />

          <Button onPress={() => this.verifyLocalization()}>
            <SendContainer>
              <SendText>{translate('badReport.checkboxConfirm')}</SendText>
            </SendContainer>
          </Button>
        </ScrollViewStyled>

        <CoolAlert
          show={showAlert}
          showProgress={this.state.progressBarAlert}
          title={
            this.state.progressBarAlert ? (
              translate('badReport.alertMessages.sending')
            ) : (
              <Text>
                {translate('badReport.alertMessages.thanks')} {emojis[1]}
              </Text>
            )
          }
          message={this.state.alertMessage}
          closeOnTouchOutside={this.state.progressBarAlert}
          closeOnHardwareBackPress={false}
          showConfirmButton={!this.state.progressBarAlert}
          confirmText={translate('badReport.alertMessages.button')}
          onConfirmPressed={() => this.props.navigation.navigate('Mapa')}
          onDismiss={() => this.props.navigation.navigate('Mapa')}
        />
      </Container>
    );
  }
}

// make this component available to the app
export default BadReport;
