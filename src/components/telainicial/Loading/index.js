import React, { Component } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { GradientBackground, SnowSpinner } from '../../styled/SnowForms';
import { Container, Logo, LogoContainer, LogoWrapper, LogoUnbProEpi } from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { GDSLogoES, GDSLogoBR, ProEpiLogo2, UnBLogo2 } from '../../../imgs/imageConst';
import translate from '../../../../locales/i18n';
import {API_URL} from 'react-native-dotenv';
import OneSignal from 'react-native-onesignal';

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
        this.state = {
            userEmail: null,
            userPwd: null
        }
    }

    _fetchData = async () => { // Get user info
        const userEmail = await RNSecureStorage.get('userEmail');
        const userPwd = await RNSecureStorage.get('userPwd');
        this.setState({ userEmail, userPwd });
    }

    _logoutApp = async () => {
        AsyncStorage.removeItem('userID');
        AsyncStorage.removeItem('userName');
        AsyncStorage.removeItem('userSelected');
        AsyncStorage.removeItem('avatarSelected');
        AsyncStorage.removeItem('householdID');

        OneSignal.removeExternalUserId()

        RNSecureStorage.exists('userToken').then((res) => {
            (res) ? RNSecureStorage.remove('userToken') : false;
        });
        RNSecureStorage.exists('userEmail').then((res) => {
            (res) ? RNSecureStorage.remove('userEmail') : false;
        });
        RNSecureStorage.exists('userPwd').then((res) => {
            (res) ? RNSecureStorage.remove('userPwd') : false;
        });
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const UserID = await AsyncStorage.getItem('userID');

        if (UserID !== null) {
            this._fetchData();
            setTimeout(() => {
                this.verifyUserToken();
            }, 1500);
        } else {
            this._logoutApp();
            this.props.navigation.navigate('Cadastro');
        }
    };

    verifyUserToken = async () => {
        console.log(this.state.userEmail);

        return fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user:
                {
                    email: this.state.userEmail,
                    password: this.state.userPwd
                }
            })
        })
            .then((response) => {
                if (response.status == 200) {
                    RNSecureStorage.set('userToken', response.headers.map.authorization, {accessible: ACCESSIBLE.WHEN_UNLOCKED});
                    return response.json();
                }
                else if (response.status == 401) {
                    this._logoutApp();
                    this.props.navigation.navigate('Cadastro');
                }
                else {
                    this.props.navigation.navigate('Cadastro');
                }
            })
            .then((responseJson) => {
                AsyncStorage.setItem('userBirth', responseJson.user.birthdate);
                this.props.navigation.navigate('BottomMenu');
            }) 
    };

    // Render any loading content that you like here
    render() {

        let LogoType;
        if (translate("lang.code") === "es") {
            LogoType = GDSLogoES
        }
        else {
            LogoType = GDSLogoBR
        }

        return (
            <>
            <SafeAreaView style={{flex: 0, backgroundColor: '#5DD39E'}} />
            <StatusBar backgroundColor='#5DD39E' barStyle="light-content"/>
            <GradientBackground> 
                <Container>
                    <Logo source={LogoType} />

                    <LogoContainer>
                        <LogoWrapper>
                            <LogoUnbProEpi source={ProEpiLogo2} />
                        </LogoWrapper>
                        <LogoWrapper>
                            <LogoUnbProEpi source={UnBLogo2} />
                        </LogoWrapper>
                    </LogoContainer>

                    <SnowSpinner />
                </Container>
            </GradientBackground>
            </>
        );
    }
}

export default AuthLoadingScreen;