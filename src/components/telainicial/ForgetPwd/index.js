import React, { Component } from 'react';
import { Alert, NetInfo, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Feather from 'react-native-vector-icons/Feather';
import SwiperFlatList from 'react-native-swiper-flatlist';

import GradientBackgroundView from '../../styled/GradientBackgroundView';
import SnowShadow from '../../styled/SnowShadow';
import SnowInput from '../../styled/SnowInput';
import SnowButton from '../../styled/SnowButton';
import { ButtonBack, ScreenView, PageTitle, LabelWrapper, TextLabel, Label } from './styles';
import PasswordIcon from '../../../imgs/icons/password.svg';

import AwesomeAlert from 'react-native-awesome-alerts';
import { scale, percentage } from '../../../utils/scallingUtils';
import translate from '../../../../locales/i18n';
import {API_URL} from 'react-native-dotenv';

Feather.loadFont();

class ForgetPwd extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            userEmail: null,
            verificationToken: null,
            userPwd: "",
            userPwdConfirm: "",
            showAlert: false, //Custom Alerts
            showProgressBar: false, //Custom Progress Bar
            slideIndex: 0,
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

    goToNextScreen = () => {
        const slideIndex = this.state.slideIndex + 1;
        this.setState({ slideIndex });
        this.swiper.scrollToIndex({index: slideIndex});
    }

    sendToken = async () => {
        this.showAlert()
        return fetch(`${API_URL}/email_reset_password`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.userEmail
            })
        })
            .then((response) => {
                this.setState({ statusCode: response.status })
                if (this.state.statusCode == 200) {
                    this.goToNextScreen();
                    this.hideAlert()
                    return response.json()
                } else {
                    this.hideAlert()
                    Alert.alert("Email Inválido", "Tente Novamente");
                    //console.warn(response)
                }
            })
    }

    confirmVerificationCode = async () => {
        this.showAlert()
        return fetch(`${API_URL}/show_reset_token`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: this.state.verificationToken
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error == true) {
                    this.hideAlert()
                    Alert.alert(translate("getToken.invalidCode"));
                } else {
                    this.setState({ verificationToken: responseJson.reset_password_token });
                    this.goToNextScreen();
                    this.hideAlert()
                }
            })
    }

    resetPassword = async () => {
        this.showAlert()
        return fetch(`${API_URL}/reset_password`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reset_password_token: this.state.verificationToken,
                password: this.state.userPwd,
                password_confirmation: this.state.userPwdConfirm
            })
        })
            .then((response) => {
                this.setState({ statusCode: response.status })
                if (this.state.statusCode == 200) {
                    this.hideAlert()
                    Alert.alert("Senha Redefinida");
                    this.props.navigation.navigate('Login');
                    return response.json()
                } else {
                    this.hideAlert()
                    Alert.alert("Senhas não conferem!", "Tente Novamente");
                }
            })
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
                <GradientBackgroundView>
                        <SwiperFlatList
                            showPagination={false}
                            disableGesture={true}
                            ref={(swiper) => this.swiper = swiper}
                        >
                            <ScreenView style={{width: percentage(100)}}>
                                <PasswordIcon height={scale(68)} width={scale(68)} fill="#ffffff" />

                                <PageTitle>{translate("forgetPwd.title")}</PageTitle>
                                
                                <LabelWrapper>
                                    <TextLabel>{translate("forgetPwd.informEmail")}</TextLabel>
                                </LabelWrapper>

                                <SnowInput
                                    placeholder={translate('login.email')}
                                    returnKeyType='next'
                                    keyboardType='email-address'
                                    maxLength={100}
                                    onChangeText={async (text) => await this.setState({ userEmail: text })}
                                />

                                <SnowShadow>
                                    <SnowButton
                                        onPress={() =>
                                            //console.warn(this.state.userEmail)
                                            this.goToNextScreen()
                                            //this.sendToken()
                                        }
                                    >
                                        <Label>{translate("forgetPwd.sendButton")}</Label>
                                    </SnowButton>
                                </SnowShadow>
                            </ScreenView>
                            <ScreenView style={{width: percentage(100)}}>
                                <PageTitle>{translate("getToken.title")}</PageTitle>

                                <LabelWrapper>
                                    <TextLabel>{translate("getToken.verificationCodeSent")}</TextLabel>
                                </LabelWrapper>

                                <LabelWrapper>
                                    <TextLabel>{translate("getToken.spamCheckWarning")}</TextLabel>
                                </LabelWrapper>

                                <SnowInput
                                    placeholder={translate("getToken.inputVerificationCode")}
                                    autoCorrect={false}
                                    maxLength={10}
                                    onChangeText={async (text) => await this.setState({ verificationToken: text })}
                                />

                                <SnowShadow>
                                    <SnowButton
                                        onPress={() => {
                                            if (!this.state.verificationToken) {
                                                Alert.alert(translate("getToken.errorMessages.verificationCodeBlank"))
                                            }
                                            else {
                                                this.confirmVerificationCode()
                                            }
                                            //this.goToNextScreen()
                                        }}
                                    >
                                        <Label>{translate("getToken.confirm")}</Label>
                                    </SnowButton>
                                </SnowShadow>
                            </ScreenView>
                            <ScreenView style={{width: percentage(100)}}>
                                <PageTitle>{translate("changePwd.title")}</PageTitle>

                                <SnowInput
                                    placeholder={translate("changePwd.newPwd")}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    returnKeyType='next'
                                    maxLength={100}
                                    onChangeText={async (text) => await this.setState({ userEmail: text })}
                                    onSubmitEditing={() => this.passwordInput.focus()}
                                />
                                
                                <SnowInput
                                    placeholder={translate("changePwd.confirmPwd")}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    returnKeyType='next'
                                    maxLength={100}
                                    ref={(input) => this.passwordInput = input}
                                    onChangeText={async (text) => await this.setState({ userPwdConfirm: text })}
                                    onSubmitEditing={() => this.resetPassword()}
                                />

                                <SnowShadow>
                                    <SnowButton
                                        onPress={() => {
                                            if (this.state.userPwd.length < 8 || this.state.userPwdConfirm.length < 8) {
                                                Alert.alert(translate("changePwd.errorMessages.shortPwd"))
                                            } else {
                                                this.resetPassword()
                                            }
                                        }}
                                    >
                                        <Label>{translate("changePwd.changeButton")}</Label>
                                    </SnowButton>
                                </SnowShadow>
                            </ScreenView>
                        </SwiperFlatList>

                    <ButtonBack onPress={() => navigate('Login')}>
                        <Feather name="chevron-left" size={scale(40)} color="#ffffff" />
                    </ButtonBack>

                    <AwesomeAlert
                        show={this.state.showAlert}
                        showProgress={this.state.showProgressBar ? true : false}
                        title={this.state.showProgressBar ? translate("getToken.loading") : null}
                        closeOnTouchOutside={this.state.showProgressBar ? false : true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={this.state.showProgressBar ? false : true}
                        confirmButtonColor="#DD6B55"
                    />
                </GradientBackgroundView>
            </KeyboardAwareScrollView>
        );
    }
}

//make this component available to the app
export default ForgetPwd;
