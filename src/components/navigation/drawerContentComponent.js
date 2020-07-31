import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getNameParts, getInitials } from '../../utils/constUtils';
import { Avatar } from 'react-native-elements';
import Share from "react-native-share";
import { verticalScale, scale } from '../../utils/scallingUtils';
import * as Imagem from '../../imgs/imageConst';
import translate from '../../../locales/i18n';

import { 
    Container,
    ScrollViewStyled,
    Button,
	AvatarContainer, 
    UserOptionGreen, 
    UserOptionBlue, 
	TextOption, 
	Aplicativo, 
	SocialContainer,
    RedeSocial,
} from './styles';

Feather.loadFont();
SimpleLineIcons.loadFont();

export default class drawerContentComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null
        }
    }

    //Funcao responsavel por pegar as variaveis do Facebook e salva-las em variaveis de estado 
    fetchData = async () => {
        let userName = await AsyncStorage.getItem('userName');
        let userAvatar = await AsyncStorage.getItem('userAvatar');
        const isProfessional = await AsyncStorage.getItem('isProfessional');
        this.setState({ userName, userAvatar, isProfessional })
    }

    componentDidMount() {
        this.fetchData()
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
        
        this.props.navigation.navigate('TelaInicial');
    }

    render() {
        const { navigate } = this.props.navigation;

        //this.fetchData();

        return (
            <Container>
                <ScrollViewStyled>
                    <AvatarContainer>
                        <Avatar
                            containerStyle={{ borderColor: '#ffffff', borderWidth: 3 }}
                            size={scale(60)}
                            source={{uri: this.state.userAvatar}}
                            title={getInitials(this.state.userName)}
                            rounded
                        />
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
                        {/*<TouchableOpacity
                            style={styles.itemsContainer}
                            onPress={() => navigate('Home')}
                        >
                            <FontAwesome name='bell' size={verticalScale(25)} style={styles.iconStyle} />
                            <Text style={styles.drawerItemsTxt}>Eventos Massivos</Text>
                        </TouchableOpacity>*/}            
                </ScrollViewStyled>
            </Container>
        )
    }
}

const shareOptions = {
    message: translate("drawer.share")
}

const styles = StyleSheet.create({
	iconStyle: {
		marginLeft: scale(5),
	},
	iconRedeSocial: {
		alignSelf: 'center',
	}
});