import React, { Component } from 'react'
import { View, NetInfo, Alert, Modal } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';

import { ModalContainer, ModalBox, ModalTitle, ModalText, ModalButton, ModalButtonText } from './styles';
import { Container, KeyboardScrollView, FormInline, FormLabel, NormalInput, FormGroup, FormGroupChild, Selector, DateSelector } from './styles';
import { FormInlineCheck, CheckBoxStyled, Button, CreateContainer, CreateText } from './styles';

import AsyncStorage from '@react-native-community/async-storage'
import RNSecureStorage from 'rn-secure-storage'
import AwesomeAlert from 'react-native-awesome-alerts'
import { scale } from '../../../utils/scallingUtils'
import translate from '../../../../locales/i18n'
import { API_URL } from 'react-native-dotenv'
import { gender, country, race, household } from '../../../utils/selectorUtils'
import InstitutionSelector from '../../userData/InstitutionSelector'
import LoadingModal from '../../modals/LoadingModal'

let data = new Date()
let d = data.getDate()
let m = data.getMonth() + 1
let y = data.getFullYear()

let today = d + "-" + m + "-" + y

Feather.loadFont();

class Registrar extends Component {
    static navigationOptions = {
        title: translate("home.addProfile")
    }
    constructor(props) {
        super(props)
        this.getInfo()
        this.state = {
            statusCode: null,
            kinship: 'Pai',
            householdName: null,
            householdGender: 'Masculino',
            householdCountry: 'Brazil',
            householdRace: 'Blanco',
            householdDob: null,
            userID: null,
            cca2: 'BR',
            showAlert: false, //Custom Alerts
            showProgressBar: false, //Custom Progress Bar
            groupCheckbox: false,
            userIdCode: null,
            userGroup: null,
            loadingAlert: false,
            riskGroup: false,
            modalVisibleRiskGroup: false,
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisibleRiskGroup: visible })
    }

    showAlert = () => {
        this.setState({
            showAlert: true,
            showProgressBar: true
        })
    }

    hideAlert = () => {
        this.setState({
            showAlert: false
        })
    }

    setLoadingAlert = (alert) => {
        this.setState({
            loadingAlert: alert
        })
    }

    _isconnected = () => {
        let validation = false
        this.state.householdName && this.state.householdDob ? validation = true : validation = false
        NetInfo.isConnected.fetch().then(isConnected => {
            isConnected ? validation ? this.avatarSelector() : Alert.alert(translate("register.errorMessages.error"), translate("register.errorMessages.allFieldsAreFilled")) : Alert.alert(
                translate("register.noInternet.noInternet"),
                translate("register.noInternet.ohNo"),
                [
                    { text: translate("register.alertAllRightMessage"), onPress: () => null }
                ]
            )
        })
    }

    getInfo = async () => {
        const userID = await AsyncStorage.getItem('userID')
        const userToken = await RNSecureStorage.get('userToken')
        this.setState({ userID, userToken })
    }

    setUserInstitutionCallback = (userIdCode, userGroup) => {
        this.setState({
            userIdCode: userIdCode,
            userGroup: userGroup,
        })
    }

    render() {
        const { showAlert } = this.state

        return (
            <Container>
                <Modal //Modal View for Risk Group Message
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisibleRiskGroup}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisibleRiskGroup)
                    }
                }>
                    <ModalContainer>
                        <ModalBox>
                            <ModalTitle>
                                {translate("register.riskGroupTitle")}
                            </ModalTitle>

                            <ModalText>
                                {translate("register.riskGroupMessage")}
                            </ModalText>

                            <Button onPress={() => {
                                    this.setModalVisible(!this.state.modalVisibleRiskGroup)
                                }
                            }>
                                <ModalButton>
                                    <ModalButtonText>
                                        {translate("register.riskGroupButton")}
                                    </ModalButtonText>
                                </ModalButton>
                            </Button>
                        </ModalBox>
                    </ModalContainer>
                </Modal>
                <KeyboardScrollView keyboardShouldPersistTaps={"always"}>
                    <FormInline>
                        <FormLabel>
                            {translate("register.name")}
                        </FormLabel>
                        <NormalInput
                            onChangeText={text => this.setState({ householdName: text })}
                        />
                    </FormInline>

                    <FormGroup>
                        <FormGroupChild>
                            <FormLabel>
                                {translate("register.gender")}
                            </FormLabel>
                            <Selector
                                initValue={translate("selector.label")}
                                cancelText={translate("selector.cancelButton")}
                                data={gender}
                                onChange={(option) => this.setState({ householdGender: option.key })}
                            />
                        </FormGroupChild>

                        <FormGroupChild>
                            <FormLabel>
                                {translate("register.race")}
                            </FormLabel>
                            <Selector
                                initValue={translate("selector.label")}
                                cancelText={translate("selector.cancelButton")}
                                data={race}
                                onChange={(option) => this.setState({ householdRace: option.key })}
                            />
                        </FormGroupChild>
                    </FormGroup>

                    <FormGroup>
                        <FormGroupChild>
                            <FormLabel>
                                {translate("register.birth")}
                            </FormLabel>
                            <DateSelector
                                placeholder={translate("birthDetails.format")}
                                date={this.state.householdDob}
                                format="DD-MM-YYYY"
                                minDate="01-01-1918"
                                maxDate={today}
                                locale={'pt-BR'}
                                confirmBtnText={translate("birthDetails.confirmButton")}
                                cancelBtnText={translate("birthDetails.cancelButton")}
                                onDateChange={date => this.setState({ householdDob: date })}
                            />
                        </FormGroupChild>

                        <FormGroupChild>
                            <FormLabel>
                                {translate("register.country")}
                            </FormLabel>
                            <Selector
                                initValue={translate("selector.label")}
                                cancelText={translate("selector.cancelButton")}
                                data={country}
                                onChange={(option) => this.setState({ householdCountry: option.key })}
                            />
                        </FormGroupChild>
                    </FormGroup>

                    <FormInlineCheck>
                        <CheckBoxStyled
                            title={"Faz parte do Grupo de Risco?"}
                            checked={this.state.riskGroup}
                            onPress={() => {
                                this.setState({ riskGroup: !this.state.riskGroup })
                            }}
                        />
                        <Button onPress={() => { this.setModalVisible(true) }}>
                            <Feather name="help-circle" size={scale(25)} color="#348EAC" />
                        </Button>
                    </FormInlineCheck>

                    <InstitutionSelector
                        setUserInstitutionCallback={this.setUserInstitutionCallback}
                        setAlert={this.setLoadingAlert}
                    />

                    <FormInline>
                        <FormLabel>
                            Parentesco:
                        </FormLabel>
                        <Selector
                            initValue={translate("selector.label")}
                            cancelText={translate("selector.cancelButton")}
                            data={household}
                            onChange={(option) => this.setState({ kinship: option.key })}
                        />
                    </FormInline>

                    <Button onPress={() => this.avatarSelector()}>
                        <CreateContainer>
                            <CreateText>Criar</CreateText>
                        </CreateContainer>
                    </Button>
                </KeyboardScrollView>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={this.state.showProgressBar ? true : false}
                    title={this.state.showProgressBar ? translate("register.awesomeAlert.registeringMessage") : null}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={this.state.showProgressBar ? false : true}
                />
                <LoadingModal show={this.state.loadingAlert} />
            </Container>
        )
    }

    avatarSelector = async () => {
        if (this.state.householdGender == "Masculino") {
            switch (this.state.kinship) {
                case "Pai":
                    await this.setState({ picture: "Father" })
                    break
                case "Mãe":
                    await this.setState({ picture: "Mother" })
                    break
                case "conjuge":
                    await this.setState({ picture: "Father" })
                    break
                case "Avós":
                    await this.setState({ picture: "Grandfather" })
                    break
                case "Filhos":
                    await this.setState({ picture: "Son" })
                    break
                case "Irmãos":
                    await this.setState({ picture: "Brother" })
                    break
            }
        } else {
            switch (this.state.kinship) {
                case "Mãe":
                    await this.setState({ picture: "Mother" })
                    break
                case "Pai":
                    await this.setState({ picture: "Father" })
                    break
                case "conjuge":
                    await this.setState({ picture: "Mother" })
                    break
                case "Avós":
                    await this.setState({ picture: "Grandmother" })
                    break
                case "Filhos":
                    await this.setState({ picture: "Daughter" })
                    break
                case "Irmãos":
                    await this.setState({ picture: "Sister" })
                    break
            }
        }
        this.create()
    }

    create = () => {
        this.showAlert()
        fetch(`${API_URL}/users/${this.state.userID}/households`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.userToken}`
            },
            body: JSON.stringify(
                {
                    description: this.state.householdName,
                    birthdate: this.state.householdDob,
                    country: this.state.householdCountry,
                    gender: this.state.householdGender,
                    race: this.state.householdRace,
                    risk_group: this.state.riskGroup,
                    kinship: this.state.kinship,
                    picture: this.state.picture,
                    identification_code: this.state.userIdCode,
                    school_unit_id: this.state.userGroup
                }
            )
        })
            .then((response) => {
                this.setState({ statusCode: response.status })
                if (this.state.statusCode == 201) {
                    console.warn("Criado")
                    this.hideAlert()
                    this.props.navigation.navigate('Home')
                } else {
                    console.warn("Algo deu errado, response:", response)
                    this.hideAlert()
                }
            })
    }
}

export default Registrar
