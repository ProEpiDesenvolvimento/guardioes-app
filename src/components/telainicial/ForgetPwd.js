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

class ForgetPwd extends Component {
    static navigationOptions = {
        title: "Esqueci Minha Senha",
    }
    constructor(props) {
        super(props);
        this.state = {
            userEmail: null,
        }
    }

SendToken() {
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
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
        })
}

    render() {
        return (
            <View style={styles.container}>
                    <View style={styles.viewForm}>
                        <Text style={styles.commomText}>Email:</Text>
                        <TextInput
                            style={styles.formInput}
                            autoCapitalize='none'
                            returnKeyType='next'
                            keyboardType='email-address'
                            multiline={false} maxLength={33}
                            onChangeText={(text) => this.setState({ userEmail: text })}
                        />
                        <View style={styles.buttonView}>
                            <Button
                                title="Enviar"
                                color="#348EAC"
                                onPress={() =>
                                    //console.warn(this.state.userEmail)
                                    this.SendToken()
                                }
                            />
                        </View>
                    </View>
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
export default ForgetPwd;
