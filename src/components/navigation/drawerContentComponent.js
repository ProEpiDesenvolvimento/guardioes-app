import React, { Component } from 'react';
import { Text, View, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { getNameParts } from '../../utils/constUtils';
import { moderateScale, verticalScale, scale } from '../../utils/scallingUtils';
import * as Imagem from '../../imgs/imageConst';
import translate from '../../../locales/i18n';
import LinearGradient from 'react-native-linear-gradient';

import { 
    Container, 
    Button,
	Avatar,
	AvatarContainer, 
	UserOption, 
	TextOption, 
	Aplicativo, 
	SocialContainer,
    RedeSocial,
    TextName,
} from './styles';

Entypo.loadFont();
Feather.loadFont();
MaterialIcons.loadFont();

export default class drawerContentComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null
        }
    }

    //Funcao responsavel por pegar as variaveis do Facebook e salva-las em variaveis de estado 
    getInfo = async () => {
        let userName = await AsyncStorage.getItem('userName');
        let userAvatar = await AsyncStorage.getItem('userAvatar');
        this.setState({ userName, userAvatar })
    }

    componentDidMount() {
        this.getInfo()
    }

    //Funcao responsavel por apagar as variaveis de login do app salvas no celular ao encerrar uma sessão
    _logoutApp = async () => {
        AsyncStorage.removeItem('userID');
        AsyncStorage.removeItem('userName');
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

        //this.getInfo();

        return (
            <Container>
                <AvatarContainer>
					<Avatar 
					 	source={Imagem[this.state.userAvatar]}
					/>
                    <TextName>
                        {getNameParts(this.state.userName, true)} 
                    </TextName>
				</AvatarContainer>
                <Button onPress={() => navigate('Perfil')}>
                    <UserOption>
                        <Feather name='settings'
                            size={scale(26)} 
                            color={'#fff'} 
                            style={styles.iconStyle}
                        />
                        <TextOption>
                            Editar perfis
                        </TextOption>
                    </UserOption>
                </Button>
                <Button onPress={this._logoutApp}>
                    <UserOption>
                        <Feather name='log-out'
                            size={scale(26)} 
                            color='#ffffff' 
                            style={styles.iconStyle}
                        />
                        <TextOption>
                            Sair
                        </TextOption>
                    </UserOption>
                </Button>
                <Aplicativo>
					Aplicativo
				</Aplicativo>
                <Button>
                    <UserOption style={styles.menuOptionColor}>
                        <Feather name='share-2'
                            size={scale(26)} 
                            color='#ffffff' 
                            style={styles.iconStyle}
                        />
                        <TextOption>
                            Compartilhar
                        </TextOption>
                    </UserOption>
                </Button>
                <Button onPress={() => navigate('Ajuda')}>
                    <UserOption style={styles.menuOptionColor}>
                        <Feather name='help-circle'
                            size={scale(26)} 
                            color='#ffffff' 
                            style={styles.iconStyle}
                        />
                        <TextOption>
                            {translate("drawer.toHelp")}
                        </TextOption>
                    </UserOption>
                </Button>
                <Button onPress={() => navigate('Sobre')}>
                    <UserOption style={styles.menuOptionColor}>
                        <Feather name='info'
                            size={scale(26)} 
                            color='#ffffff' 
                            style={styles.iconStyle}
                        />
                        <TextOption>
                            {translate("drawer.toAbout")}
                        </TextOption>
                    </UserOption>
                </Button>
                <SocialContainer>
                    <Button onPress={() => Linking.openURL('https://twitter.com/guardioesunb')}>
                        <RedeSocial>
                            <Feather name='twitter'
                                size={scale(28)} 
                                color='#ffffff' 
                                style={styles.iconRedeSocial}
                            />
                        </RedeSocial>
                    </Button>
                    <Button onPress={() => Linking.openURL('https://www.instagram.com/guardioesdasaudeunb/')}>
                        <RedeSocial>
                            <Feather name='instagram'
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
            </Container>

        )
    }
}

const styles = StyleSheet.create({
	iconStyle: {
		marginLeft: scale(5),
	},
	iconRedeSocial: {
		alignSelf: 'center',
	},
	menuOptionColor: {
		backgroundColor: '#5DD39E',
	}
})

/* const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: moderateScale(230),
        backgroundColor: 'white',
        marginBottom: 15
    },
    headerText: {
        fontSize: 22,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
        color: '#166B87'
    },
    viewAvatar: {
        alignSelf: 'center',
        marginTop: 25,
    },
    itemsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 10
    },
    iconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: '15%',
        paddingLeft: '8%',
        color: 'rgba(255, 255, 255, 0.3)'
    },
    drawerItemsTxt: {
        textAlignVertical: 'center',
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: 'white',
        fontSize: verticalScale(15),

    },

}); */