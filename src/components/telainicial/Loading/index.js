import React from 'react';

import GradientBackgroundView from '../../styled/GradientBackgroundView';
import StatusBarLight from '../../styled/StatusBarLight';
import SnowSpinner from '../../styled/SnowSpinner';
import { Logo, LogoContainer, LogoWrapper, LogoUnbProEpi } from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { imagemLogo, imagemLogoBR, logoProEpi, logoUnB } from '../../../imgs/imageConst';
import translate from '../../../../locales/i18n';
import {API_URL} from 'react-native-dotenv';

class AuthLoadingScreen extends React.Component {
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
                    this.props.navigation.navigate('BottomMenu');
                }
                else if (response.status == 401) {
                    this._logoutApp();
                    this.props.navigation.navigate('Cadastro');
                }
                else {
                    this.props.navigation.navigate('Cadastro');
                }
            })
    };

    // Render any loading content that you like here
    render() {

        let LogoType;
        if (translate("lang.code") === "es") {
            LogoType = imagemLogo
        }
        else {
            LogoType = imagemLogoBR
        }

        return (
            <GradientBackgroundView>
                <StatusBarLight />
                <Logo source={LogoType} />

                <LogoContainer>
                    <LogoWrapper>
                        <LogoUnbProEpi source={logoProEpi} />
                    </LogoWrapper>
                    <LogoWrapper>
                        <LogoUnbProEpi source={logoUnB} />
                    </LogoWrapper>
                </LogoContainer>

                <SnowSpinner />
            </GradientBackgroundView>
        );
    }
}

export default AuthLoadingScreen;