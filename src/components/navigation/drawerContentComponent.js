import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Linking, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Emoji from 'react-native-emoji';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
Entypo.loadFont();
Feather.loadFont();
MaterialIcons.loadFont();
import { moderateScale, verticalScale, scale } from '../scallingUtils';
import { Avatar } from 'react-native-elements';
import * as Imagem from '../../imgs/imageConst';
import translate from '../../../locales/i18n';
import LinearGradient from 'react-native-linear-gradient';

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

    //Funcao responsavel por apagar as variaveis de login do app salvas no celular ao encerrar uma sessão
    _logoutApp = async () => {
        AsyncStorage.removeItem('userName');
        AsyncStorage.removeItem('userID');
        AsyncStorage.removeItem('householdID');
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('appID');
        AsyncStorage.removeItem('userSelected');
        AsyncStorage.removeItem('avatarSelected');
        AsyncStorage.removeItem('userEmail');
        AsyncStorage.removeItem('appPwd');
        this.props.navigation.navigate('TelaInicial')
    }

    render() {
        const { navigate } = this.props.navigation;

        this.getInfo();

        return (
            <View style={styles.container}>
                <LinearGradient style={styles.container} colors={['#348EAC', '#013444']} start={{ x: 1.5, y: 0.6 }} end={{ x: -0.2, y: 1.4 }}>
                    <View style={styles.headerContainer}>
                        <View style={styles.viewAvatar}>
                            <Avatar
                                size="xlarge"
                                rounded
                                source={Imagem[this.state.userAvatar]}
                                activeOpacity={0.7}
                            />
                        </View>
                        <Text style={styles.headerText}>{this.state.userName}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('Perfil')}
                    >
                        <MaterialIcons name='supervisor-account' size={verticalScale(25)} style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>Perfis</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('Mapa')}
                    >
                        <MaterialIcons name='explore' size={verticalScale(25)} style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>{translate("drawer.healthMap")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('Diario')}
                    >
                        <MaterialIcons name='dashboard' size={verticalScale(25)} style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>{translate("drawer.healthDiary")}</Text>
                    </TouchableOpacity>

                    {/*<TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('Home')}
                    >
                        <FontAwesome name='bell' size={verticalScale(25)} style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>Eventos Massivos</Text>
                    </TouchableOpacity>*/}

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => Linking.openURL('https://www.facebook.com/AssociacaoProEpi/')}
                    >
                        <Entypo name='facebook' size={verticalScale(25)} style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>{translate("drawer.toFacebook")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('Ajuda')}
                    >
                        <Feather name='help-circle' size={verticalScale(25)} style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>{translate("drawer.toHelp")}</Text>
                    </TouchableOpacity>

                    <View style={[{ flexDirection: 'row', justifyContent: 'center', padding: 8, marginTop: 85 }]}>
                        <Text style={[styles.drawerItemsTxt, { fontSize: 20, fontWeight: 'bold' }]} onPress={this._logoutApp}>
                            {translate("drawer.logOut")}
                        </Text>
                    </View>
                </LinearGradient>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: moderateScale(250),
        backgroundColor: 'white',
        marginBottom: 15
    },
    headerText: {
        fontSize: 24,
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

});