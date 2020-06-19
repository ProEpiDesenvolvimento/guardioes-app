import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, Alert, Keyboard, NetInfo } from 'react-native';
import RNSecureStorage from 'rn-secure-storage';
import * as Imagem from '../../imgs/imageConst'
import AwesomeAlert from 'react-native-awesome-alerts';
import Emoji from 'react-native-emoji';
import { scale } from '../../utils/scallingUtils';
import translate from '../../../locales/i18n';
import { API_URL } from '../../utils/constUtils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

class ChangePwd extends Component {
    static navigationOptions = {
        title: "Redefinir senha",
    }
    constructor(props) {
        super(props);
        this.props.navigation.addListener('didFocus', payload => {
            this.getInfo();
        });
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

    getInfo = async () => { //Get user info
        const verificationToken = await RNSecureStorage.get('verificationToken');
        this.setState({ verificationToken });
    }

    resetPassword() {
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
                    this.hideAlert();
                    Alert.alert("Senha Redefinida")
                    RNSecureStorage.remove('verificationToken');
                    this.props.navigation.navigate('Login')
                    return response.json()
                } else {
                    this.hideAlert();
                    Alert.alert("Senhas não conferem!", "Tente Novamente");
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewForm}>
                    <Text style={styles.commomText}>Nova Senha</Text>
                    <TextInput
                        style={styles.formInput}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        returnKeyType='next'
                        multiline={false}
                        maxLength={100}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={async (text) => await this.setState({ userPwd: text })}
                    />
                    <Text style={styles.commomText}>Repita a senha</Text>
                    <TextInput
                        style={styles.formInput}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        multiline={false}
                        maxLength={100}
                        ref={(input) => this.passwordInput = input}
                        onChangeText={async (text) => await this.setState({ userPwdConfirm: text })}
                        onSubmitEditing={() => this.resetPassword()}
                    />
                    <View style={styles.buttonView}>
                        <Button
                            title="Redefinir Senha"
                            color="#348EAC"
                            onPress={() => {
                                if (this.state.userPwd.length < 8 || this.state.userPwdConfirm.length < 8) {
                                    Alert.alert("A senha precisa ter no mínimo 8 caracteres")
                                } else {
                                    this.resetPassword()
                                }
                            }
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
        width: "100%",
        alignItems: 'center',
    },
    formInput: {
        width: '90%',
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
export default ChangePwd;
