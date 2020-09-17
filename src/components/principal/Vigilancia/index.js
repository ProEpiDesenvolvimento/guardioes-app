import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { API_URL } from 'react-native-dotenv'
import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';

import { ScrollViewStyled, Title, BodyText } from './styles';
import {
    FormGroup,
    FormGroupChild,
    FormLabel,
    Selector,
    NormalInput,
    SendContainer,
    SendText,
    Button
} from '../../styled/NormalForms'
import translate from "../../../../locales/i18n";

class Vigilancia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vigilance: false,
            phone: null,
            userID: null,
            userToken: null,
            loading: true
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        const id = await AsyncStorage.getItem('userID')
        const userToken = await RNSecureStorage.get('userToken');
        this.setState({
            userID: id,
            userToken: userToken
        })
        let response = await fetch(`${API_URL}/users/${this.state.userID}`, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.userToken}`
            }
        })
        response = response.status == 200 ? await response.json() : response
        this.setState({
            vigilance: response.user.is_vigilance,
            phone: response.user.phone,
            loading: false,
            userSchoolUnit: response.user.school_unit_id
        })
    }

    handleEdit = () => {
        return fetch(`${API_URL}/users/${this.state.userID}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.userToken}`
            },
            body: JSON.stringify(
                {
                    is_vigilance: !this.state.vigilance,
                    phone: !this.state.vigilance ? this.state.phone : null
                }
            )
        })
            .then((response) => {
                console.warn(response.status)
                if (response.status == 200) {
                    this.props.navigation.goBack()
                } else {
                    Alert.alert("Ocorreu um erro, tente novamente depois.")
                }
            })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 0, backgroundColor: '#F8F8F8' }}>
                <ScrollViewStyled>
                    <Title>
                        O que é?
                        </Title>
                    <BodyText>
                        {translate("about.textoVigilancia")}
                    </BodyText>
                    {!this.state.loading && this.state.userSchoolUnit !== null ?
                        <>
                            {/* {console.warn(this.state.userSchoolUnit)} */}
                            <Title>
                                {this.state.vigilance ? "Você já está participando!" : "Deseja participar?"}
                            </Title>
                            {!this.state.vigilance ? (
                                <FormGroup>
                                    <FormGroupChild style={{ width: 100 + '%' }}>
                                        <FormLabel>Qual seu telefone?</FormLabel>
                                        <FormLabel>País+DDD+Numero (5561988888888)</FormLabel>
                                        <NormalInput
                                            maxLength={13}
                                            returnKeyType='done'
                                            keyboardType='number-pad'
                                            value={this.state.phone}
                                            onChangeText={(text) => {
                                                this.setState({ phone: text })
                                            }}
                                        />
                                    </FormGroupChild>
                                </FormGroup>
                            ) : null}

                            <Button onPress={this.handleEdit}>
                                <SendContainer>
                                    <SendText>{this.state.vigilance ? "Cancelar Participação" : "Participar"}</SendText>
                                </SendContainer>
                            </Button>
                        </> : null}
                </ScrollViewStyled>
            </SafeAreaView >
        )
    }

}

Vigilancia.navigationOptions = {
    title: "Vigilância Ativa"
}

export default Vigilancia;
