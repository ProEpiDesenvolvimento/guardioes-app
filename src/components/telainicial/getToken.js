import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, Alert, Keyboard, NetInfo } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Imagem from '../../imgs/imageConst'
import AwesomeAlert from 'react-native-awesome-alerts';
import Emoji from 'react-native-emoji';
import { scale } from '../../utils/scallingUtils';
import translate from '../../../locales/i18n';
import { API_URL } from '../../utils/constUtils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

class GetToken extends Component {
    static navigationOptions = {
        title: "Codigo de Verificação",
    }
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false, //Custom Alerts
            showProgressBar: false //Custom Progress Bar
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

    confirmVerificationCode = () => {
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
                    this.hideAlert();
                    Alert.alert("Código Inválido")
                } else {
                    this.hideAlert();
                    AsyncStorage.setItem('verificationToken', responseJson.reset_password_token);
                    this.props.navigation.navigate('ChangePwd')
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewTitle}>
                    <Text style={styles.commomTitle}>Foi enviado um codigo de verificação para o email incado.</Text>
                    <Text style={styles.commomTitle}>Caso não apareça na sua caixa de mensagem principal, verifique seu Spam.</Text>
                </View>
                <View style={styles.viewForm}>
                    <Text style={styles.commomText}>Insira o Código de Verificação</Text>
                    <TextInput
                        style={styles.formInput}
                        autoCapitalize='none'
                        autoCorrect={false}
                        multiline={false} maxLength={33}
                        onChangeText={async (text) => await this.setState({ verificationToken: text })}
                    />
                    <View style={styles.buttonView}>
                        <Button
                            title="Confirmar"
                            color="#348EAC"
                            onPress={() =>
                                this.confirmVerificationCode()
                            }
                        />
                    </View>
                </View>
                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={this.state.showProgressBar ? true : false}
                    title={this.state.showProgressBar ? "Carregando" : null}
                    closeOnTouchOutside={this.state.showProgressBar ? false : true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={this.state.showProgressBar ? false : true}
                    confirmButtonColor="#DD6B55"
                />
            </View>
        );
    }
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        flex: 1,
        height: 550,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titulo: {
        color: '#CD853F',
        justifyContent: 'center',
        margin: 10,
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center',
        marginRight: '40%',
    },
    viewImage: {
        flex: 2.5,
        width: scale(350),
        //height: '100%',
        alignItems: 'center',
    },
    viewForm: {
        flex: 4,
        marginTop: '5%',
        width: "100%",
        alignItems: 'center',
    },
    viewTitle: {
        marginLeft: "5%",
        width: "90%",
        alignItems: 'center',
    },
    formInput: {
        width: '30%',
        textAlign: 'center',
        height: 35,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#348EAC',
        paddingBottom: 0,
        paddingTop: 2,
    },
    commomText: {
        fontFamily: 'roboto',
        fontWeight: '400',
        fontSize: 20,
        color: '#465F6C',
        marginTop: '3%'
    },
    commomTitle: {
        fontFamily: 'roboto',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 20,
        color: '#465F6C',
        marginTop: '3%'
    },
    buttonView: {
        marginTop: 30,
        width: "60%",
    },
    imageLogo: {
        flex: 1,
        marginTop: 9,
        width: '80%',
        resizeMode: 'contain',
    }
});

//make this component available to the app
export default GetToken;
