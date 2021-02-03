import React, {Component} from 'react';
import {SafeAreaView, Alert, NetInfo, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SwiperFlatList from 'react-native-swiper-flatlist';

import {
  GradientBackground,
  KeyboardScrollView,
  ButtonBack,
  SnowInput,
  Touch,
  SnowButton,
  Label,
} from '../../../components/SnowForms';
import {ScreenView, PageTitle, LabelWrapper, TextLabel} from './styles';
import {CoolAlert} from '../../../components/CoolAlert';

import {PasswordIcon} from '../../../img/imageConst';
import {scale} from '../../../utils/scallingUtils';
import translate from '../../../../locales/i18n';
import {API_URL} from 'react-native-dotenv';

Feather.loadFont();

class ForgetPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: null,
      verificationToken: null,
      userPwd: '',
      userPwdConfirm: '',
      showAlert: false, //Custom Alerts
      showProgressBar: false, //Custom Progress Bar
      slideIndex: 0,
    };
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
      showProgressBar: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  goToNextScreen = () => {
    const slideIndex = this.state.slideIndex + 1;
    this.setState({slideIndex});
    this.swiper.scrollToIndex({index: slideIndex});
  };

  sendToken = async () => {
    this.showAlert();
    return fetch(`${API_URL}/email_reset_password`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.userEmail,
      }),
    }).then(response => {
      this.setState({statusCode: response.status});
      if (this.state.statusCode == 200) {
        this.goToNextScreen();
        this.hideAlert();
        return response.json();
      } else {
        this.hideAlert();
        Alert.alert(
          translate('forgetPwd.invalidEmail'),
          translate('forgetPwd.tryAgain'),
        );
        //console.warn(response)
      }
    });
  };

  confirmVerificationCode = async () => {
    this.showAlert();
    return fetch(`${API_URL}/show_reset_token`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: this.state.verificationToken,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error == true) {
          this.hideAlert();
          Alert.alert(translate('getToken.invalidCode'));
        } else {
          this.setState({verificationToken: responseJson.reset_password_token});
          this.goToNextScreen();
          this.hideAlert();
        }
      });
  };

  resetPassword = async () => {
    this.showAlert();
    return fetch(`${API_URL}/reset_password`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reset_password_token: this.state.verificationToken,
        password: this.state.userPwd,
        password_confirmation: this.state.userPwdConfirm,
      }),
    }).then(response => {
      this.setState({statusCode: response.status});
      if (this.state.statusCode == 200) {
        this.hideAlert();
        Alert.alert(translate('forgetPwd.passwordChanged'));
        this.props.navigation.navigate('Login');
        return response.json();
      } else {
        this.hideAlert();
        Alert.alert(
          translate('forgetPwd.differentsPass'),
          translate('forgetPwd.tryAgain'),
        );
      }
    });
  };

  render() {
    const {showAlert} = this.state;
    const navigation = this.props.navigation;

    return (
      <>
        <SafeAreaView style={{flex: 0, backgroundColor: '#5DD39E'}} />
        <GradientBackground>
          <KeyboardScrollView>
            <SwiperFlatList
              showPagination={false}
              disableGesture={true}
              ref={swiper => (this.swiper = swiper)}>
              <ScreenView>
                <PasswordIcon
                  height={scale(68)}
                  width={scale(68)}
                  fill="#ffffff"
                />

                <PageTitle>{translate('forgetPwd.title')}</PageTitle>

                <LabelWrapper>
                  <TextLabel>{translate('forgetPwd.informEmail')}</TextLabel>
                </LabelWrapper>

                <SnowInput
                  placeholder={translate('login.email')}
                  returnKeyType="next"
                  keyboardType="email-address"
                  maxLength={100}
                  onChangeText={async text =>
                    await this.setState({userEmail: text})
                  }
                />

                <Touch
                  onPress={() =>
                    //console.warn(this.state.userEmail)
                    //this.goToNextScreen()
                    this.sendToken()
                  }>
                  <SnowButton>
                    <Label>{translate('forgetPwd.sendButton')}</Label>
                  </SnowButton>
                </Touch>
              </ScreenView>
              <ScreenView>
                <PageTitle>{translate('getToken.title')}</PageTitle>

                <LabelWrapper>
                  <TextLabel>
                    {translate('getToken.verificationCodeSent')}
                  </TextLabel>
                </LabelWrapper>

                <LabelWrapper>
                  <TextLabel>
                    {translate('getToken.spamCheckWarning')}
                  </TextLabel>
                </LabelWrapper>

                <SnowInput
                  placeholder={translate('getToken.inputVerificationCode')}
                  autoCorrect={false}
                  maxLength={10}
                  onChangeText={async text =>
                    await this.setState({verificationToken: text})
                  }
                />

                <Touch
                  onPress={() => {
                    if (!this.state.verificationToken) {
                      Alert.alert(
                        translate(
                          'getToken.errorMessages.verificationCodeBlank',
                        ),
                      );
                    } else {
                      this.confirmVerificationCode();
                    }
                    //this.goToNextScreen()
                  }}>
                  <SnowButton>
                    <Label>{translate('getToken.confirm')}</Label>
                  </SnowButton>
                </Touch>
              </ScreenView>
              <ScreenView>
                <PageTitle>{translate('changePwd.title')}</PageTitle>

                <SnowInput
                  placeholder={translate('changePwd.newPwd')}
                  autoCorrect={false}
                  secureTextEntry={true}
                  returnKeyType="next"
                  maxLength={100}
                  onChangeText={async text =>
                    await this.setState({userPwd: text})
                  }
                  onSubmitEditing={() => this.passwordInput.focus()}
                />

                <SnowInput
                  placeholder={translate('changePwd.confirmPwd')}
                  autoCorrect={false}
                  secureTextEntry={true}
                  returnKeyType="next"
                  maxLength={100}
                  ref={input => (this.passwordInput = input)}
                  onChangeText={async text =>
                    await this.setState({userPwdConfirm: text})
                  }
                  onSubmitEditing={() => this.resetPassword()}
                />

                <Touch
                  onPress={() => {
                    if (
                      this.state.userPwd.length < 8 ||
                      this.state.userPwdConfirm.length < 8
                    ) {
                      Alert.alert(
                        translate('changePwd.errorMessages.shortPwd'),
                      );
                    } else {
                      this.resetPassword();
                    }
                  }}>
                  <SnowButton>
                    <Label>{translate('changePwd.changeButton')}</Label>
                  </SnowButton>
                </Touch>
              </ScreenView>
            </SwiperFlatList>

            <ButtonBack onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" size={scale(40)} color="#ffffff" />
            </ButtonBack>
          </KeyboardScrollView>

          <CoolAlert
            show={showAlert}
            showProgress={this.state.showProgressBar}
            title={
              this.state.showProgressBar ? translate('getToken.loading') : null
            }
            closeOnTouchOutside={this.state.showProgressBar ? false : true}
            closeOnHardwareBackPress={false}
            showConfirmButton={this.state.showProgressBar ? false : true}
          />
        </GradientBackground>
      </>
    );
  }
}

//make this component available to the app
export default ForgetPwd;
