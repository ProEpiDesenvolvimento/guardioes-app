import React, { Component } from 'react';
import { SafeAreaView, Modal } from 'react-native';
import { API_URL } from 'react-native-dotenv'
import { ModalContainer, ModalBox, ModalTitle, FormInlineCheck, CheckBoxStyled, ModalText, ModalButton, ModalButtonText, CheckLabel } from '../../styled/NormalForms'
import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import Feather from 'react-native-vector-icons/Feather';
import { scale } from '../../../utils/scallingUtils';

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
import { ScrollView } from 'react-native-gesture-handler';

class Vigilancia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vigilance: false,
            phone: null,
            userID: null,
            userToken: null,
            loading: true,
            modalTerms: false
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
            acceptTerms: response.user.is_vigilance ? true : false
        })
    }

    handleEdit = () => {
        if (!this.state.acceptTerms)
            return false
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
            <>
                <Modal //Modal View for Terms
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalTerms}
                    onRequestClose={() => {
                        this.setState({ modalTerms: !this.state.modalTerms })
                    }}
                    style={{ padding: 10 + 'px' }}
                >
                    <ModalContainer>
                        <ModalBox style={{ maxHeight: 90 + '%' }}>
                            <ModalTitle>
                                {translate("vigilanceTerms.title")}
                            </ModalTitle>

                            <ScrollView>
                                <ModalText>
                                    {translate("vigilanceTerms.text")}
                                </ModalText>
                            </ScrollView>

                            <Button onPress={() => {
                                this.setState({ modalTerms: !this.state.modalTerms })
                            }}>
                                <ModalButton>
                                    <ModalButtonText>
                                        {translate("register.riskGroupButton")}
                                    </ModalButtonText>
                                </ModalButton>
                            </Button>
                        </ModalBox>
                    </ModalContainer>
                </Modal>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#F8F8F8' }}>
                    <ScrollViewStyled>
                        <Title>
                            O que é?
                        </Title>
                        <BodyText>
                            {translate("about.textoVigilancia")}
                        </BodyText>
                        {!this.state.loading ?
                            <>
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

                                {!this.state.vigilance ?

                                    <FormInlineCheck>
                                        <CheckBoxStyled
                                            title={"Confirmo que li as informações e estou ciente das alterações que serão realizadas após a confirmação"}
                                            checked={this.state.acceptTerms}
                                            onPress={() => {
                                                this.setState({ acceptTerms: !this.state.acceptTerms })
                                            }}
                                        />
                                        <CheckLabel onPress={() => { this.setState({ modalTerms: true }) }}>
                                            <Feather name="help-circle" size={scale(25)} color="#348EAC" />
                                        </CheckLabel>
                                    </FormInlineCheck>
                                    : null}

                                <Button onPress={this.handleEdit}>
                                    <SendContainer>
                                        <SendText>{this.state.vigilance ? "Cancelar Participação" : "Participar"}</SendText>
                                    </SendContainer>
                                </Button>
                            </> : null}
                    </ScrollViewStyled>
                </SafeAreaView >
            </>
        )
    }

}

Vigilancia.navigationOptions = {
    title: "Vigilância Ativa"
}

export default Vigilancia;
