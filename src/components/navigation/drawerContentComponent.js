import React, { Component } from 'react';
import { StyleSheet, Linking, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { Container, ScrollViewStyled, Button, AvatarContainer,  UserOptionGreen, UserOptionBlue } from './styles';
import { TextOption, Aplicativo, SocialContainer, RedeSocial } from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import { handleAvatar, getInitials } from '../../utils/constUtils';
import { Avatar } from 'react-native-elements';
import Share from "react-native-share";
import { scale } from '../../utils/scallingUtils';
import translate from '../../../locales/i18n';
import {API_URL} from 'react-native-dotenv';
import OneSignal from 'react-native-onesignal';

Feather.loadFont();
SimpleLineIcons.loadFont();

export default class drawerContentComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            householdsData: null,
            householdsSize: 0
        }
    }

    fetchData = async () => { //Get user infos
        const userID = await AsyncStorage.getItem('userID');
        const userName = await AsyncStorage.getItem('userName');
        const userAvatar = await AsyncStorage.getItem('userAvatar');
        const isProfessional = await AsyncStorage.getItem('isProfessional');
        const userToken = await RNSecureStorage.get('userToken');

        this.setState({ userID, userName, userAvatar, isProfessional, userToken })
        this.getHouseholds()
        this.getHouseholdAvatars()
    }

    componentDidMount() {
        this.fetchData()
    }

    getHouseholds = () => {//Get households
        return fetch(`${API_URL}/users/${this.state.userID}/households`, {
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    householdsData: responseJson.households,
                    householdsSize: responseJson.households.length
                })
            })
    }

    getHouseholdAvatars = async () => {
        let householdAvatars = JSON.parse(await AsyncStorage.getItem('householdAvatars'))
        
        if (!householdAvatars) {
            householdAvatars = {}
        }

        this.setState({ householdAvatars })
    }

    //Funcao responsavel por apagar as variaveis de login do app salvas no celular ao encerrar uma sessão
    _logoutApp = async () => {
        AsyncStorage.removeItem('userID');
        AsyncStorage.removeItem('userName');
        AsyncStorage.removeItem('userAvatar');
        AsyncStorage.removeItem('userSelected');
        AsyncStorage.removeItem('avatarSelected');
        AsyncStorage.removeItem('householdID');

        RNSecureStorage.remove('userToken');
        RNSecureStorage.remove('userEmail');
        RNSecureStorage.remove('userPwd');

        OneSignal.removeExternalUserId()
        OneSignal.deleteTag("group")
        OneSignal.deleteTag("city")
        OneSignal.deleteTag("school_unit_id")
        
        this.props.navigation.navigate('TelaInicial');
    }

    render() {
        const { navigate } = this.props.navigation;
        const householdsData = this.state.householdsData;
        const householdAvatars = this.state.householdAvatars;

        let index = this.state.householdsSize + 1

        return (
            <Container>
                <ScrollViewStyled>
                    <AvatarContainer>
                        <Avatar
                            containerStyle={[styles.Avatar, { zIndex: index-- }]}
                            size={scale(60)}
                            source={handleAvatar(this.state.userAvatar)}
                            title={getInitials(this.state.userName)}
                            rounded
                        />
                        {householdsData != null ?
                            householdsData.map((household) => {
                              return (
                                <Avatar
                                    key={household.id}
                                    containerStyle={[styles.Avatars, { zIndex: index-- }]}
                                    size={scale(60)}
                                    source={handleAvatar(householdAvatars[household.id])}
                                    title={getInitials(household.description)}
                                    rounded
                                />
                              )
                            })
                        : null}
                    </AvatarContainer>
                    {this.state.isProfessional == "true" &&
                    <Button onPress={() => navigate("Rumor")}>
                        <UserOptionGreen>
                            <Feather name='info'
                                size={scale(26)} 
                                color='#ffffff' 
                                style={styles.iconStyle}
                            />
                            <TextOption>
                                {translate("home.reportRumor")}
                            </TextOption>
                        </UserOptionGreen>
                    </Button>
                    }
                    <Button onPress={() => navigate('Perfis')}>
                        <UserOptionGreen>
                            <Feather name='settings'
                                size={scale(26)} 
                                color={'#fff'} 
                                style={styles.iconStyle}
                            />
                            <TextOption>
                                Editar perfis
                            </TextOption>
                        </UserOptionGreen>
                    </Button>
                    <Button onPress={this._logoutApp}>
                        <UserOptionGreen>
                            <Feather name='log-out'
                                size={scale(26)} 
                                color='#ffffff' 
                                style={styles.iconStyle}
                            />
                            <TextOption>
                                {translate("drawer.logOut")}
                            </TextOption>
                        </UserOptionGreen>
                    </Button>
                    <Aplicativo>
                        Aplicativo
                    </Aplicativo>
                    <Button onPress={() =>  {
                        Share.open(shareOptions)
                            .then((res) => { console.log(res) })
                            .catch((err) => { err && console.log(err); });
                        }
                    }>
                        <UserOptionBlue>
                            <Feather name='share-2'
                                size={scale(26)} 
                                color='#ffffff' 
                                style={styles.iconStyle}
                            />
                            <TextOption>
                                Compartilhar
                            </TextOption>
                        </UserOptionBlue>
                    </Button>
                    <Button onPress={() => navigate('Ajuda')}>
                        <UserOptionBlue>
                            <Feather name='help-circle'
                                size={scale(26)} 
                                color='#ffffff' 
                                style={styles.iconStyle}
                            />
                            <TextOption>
                                {translate("drawer.toHelp")}
                            </TextOption>
                        </UserOptionBlue>
                    </Button>
                    <Button onPress={() => navigate('Sobre')}>
                        <UserOptionBlue>
                            <Feather name='info'
                                size={scale(26)} 
                                color='#ffffff' 
                                style={styles.iconStyle}
                            />
                            <TextOption>
                                {translate("drawer.toAbout")}
                            </TextOption>
                        </UserOptionBlue>
                    </Button>
                    <SocialContainer>
                        <Button onPress={() => Linking.openURL('https://twitter.com/guardioesunb')}>
                            <RedeSocial>
                                <SimpleLineIcons name='social-twitter'
                                    size={scale(28)} 
                                    color='#ffffff' 
                                    style={styles.iconRedeSocial}
                                />
                            </RedeSocial>
                        </Button>
                        <Button onPress={() => Linking.openURL('https://www.instagram.com/guardioesdasaudeunb/')}>
                            <RedeSocial>
                                <SimpleLineIcons name='social-instagram'
                                    size={scale(28)} 
                                    color='#ffffff' 
                                    style={styles.iconRedeSocial}
                                />
                            </RedeSocial>
                        </Button>
                    </SocialContainer>        
                </ScrollViewStyled>
            </Container>
        )
    }
}

const shareOptions = {
    message: translate("drawer.share")
}

const styles = StyleSheet.create({
    Avatar: {
        borderColor: '#ffffff',
        borderWidth: 3
    },
    Avatars: {
        marginLeft: scale(-20),
        borderColor: '#ffffff',
        borderWidth: 3
    },
	iconStyle: {
		marginLeft: scale(5),
	},
	iconRedeSocial: {
		marginBottom: Platform.OS === 'ios' ? -3 : 0,
	}
});