import React, { Component } from 'react'
import { SafeAreaView, Keyboard, Alert, Modal } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import { GradientBackground, ButtonBack, FormSeparator, Touch, SnowButton, Label } from '../../styled/SnowForms'
import { KeyboardScrollView, FormInline, NormalInput, FormGroup, FormGroupChild } from '../../styled/NormalForms'
import { Selector, DateSelector, FormInlineCheck, CheckBoxStyled, Button, CheckLabel } from '../../styled/NormalForms'
import { ModalContainer, ModalBox, ModalTitle, ModalText, ModalButton, ModalButtonText } from '../../styled/NormalForms'
import { PageTitle, FormLabel, FormTip } from './styles'

import AsyncStorage from '@react-native-community/async-storage'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { UserIcon } from '../../../imgs/imageConst';
import { scale } from '../../../utils/scallingUtils'
import translate from '../../../../locales/i18n'
import { API_URL } from 'react-native-dotenv'
import { gender, country, race } from '../../../utils/selectorUtils'
import { state, getCity } from '../../../utils/brasil'
import InstitutionSelector from '../../userData/InstitutionSelector'
import LoadingModal from '../../modals/LoadingModal'

Feather.loadFont();

let data = new Date()
let d = data.getDate()
let m = data.getMonth() + 1
let y = data.getFullYear()

// let today = y + "-" + m + "-" + d
let minDate = d + "-" + m + "-" + (y - 13)
// let tomorrow = y + "-" + m + "-" + (d + 1)

class Registrar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isProfessional: false,
            residence: null,
            residenceCountryCheckbox: true,
            userName: null,
            userEmail: null,
            userPwd: null,
            userGender: null,
            userCountry: null,
            userState: null,
            userCity: null,
            userRace: null,
            userBirth: null,
            userGroup: null,
            userIdCode: null,
            userPicture: 'default',
            riskGroup: null,
            showAlert: false, //Custom Alerts
            showProgressBar: false, //Custom Progress Bar
            modalVisibleRiskGroup: false,
        }
    }

    setRiskGroupModalVisible(visible) {
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

    setAlert = (alert) => {
        this.setState({
            showAlert: alert
        })
    }

    setUserInstitutionCallback = (userIdCode, userGroup) => {
        this.setState({
            userIdCode: userIdCode,
            userGroup: userGroup,
        })
    }

    setInstituitionComponentError = (error) => {
        this.state.instituitionComponentError = error
    }

    render() {
        const { showAlert } = this.state

        return (
            <>
            <SafeAreaView style={{flex: 0, backgroundColor: '#5DD39E'}} />
            <GradientBackground>
                <Modal //Modal View for Risk Group Message
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisibleRiskGroup}
                    onRequestClose={() => {
                        this.setRiskGroupModalVisible(!this.state.modalVisibleRiskGroup)
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
                                this.setRiskGroupModalVisible(!this.state.modalVisibleRiskGroup)
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

                <KeyboardScrollView keyboardShouldPersistTaps="always">
                    <UserIcon height={scale(68)} width={scale(68)} fill="#ffffff" />
                    <PageTitle>{translate("register.title")}</PageTitle>

                    <FormInline>
                        <FormLabel>{translate("register.name")}</FormLabel>
                        <NormalInput
                            returnKeyType='next'
                            onChangeText={text => this.setState({ userName: text })}
                        />
                    </FormInline>

                    <FormGroup>
                        <FormGroupChild>
                            <FormLabel>{translate("register.gender")}</FormLabel>
                            <Selector
                                data={gender}
                                initValue={translate("selector.label")}
                                cancelText={translate("selector.cancelButton")}
                                onChange={(option) => this.setState({ userGender: option.key })}
                            />
                        </FormGroupChild>

                        <FormGroupChild>
                            <FormLabel>{translate("register.race")}</FormLabel>
                            <Selector
                                data={race}
                                initValue={translate("selector.label")}
                                cancelText={translate("selector.cancelButton")}
                                onChange={(option) => this.setState({ userRace: option.key })}
                            />
                        </FormGroupChild>
                    </FormGroup>

                    <FormGroup>
                        <FormGroupChild>
                            <FormLabel>{translate("register.birth")}</FormLabel>
                            <DateSelector
                                placeholder={translate("birthDetails.format")}
                                date={this.state.userBirth}
                                format="DD-MM-YYYY"
                                minDate="01-01-1918"
                                maxDate={minDate}
                                locale={'pt-BR'}
                                confirmBtnText={translate("birthDetails.confirmButton")}
                                cancelBtnText={translate("birthDetails.cancelButton")}
                                onDateChange={date => this.setState({ userBirth: date })}
                            />
                        </FormGroupChild>

                        <FormGroupChild>
                            <FormLabel>{translate("register.country")}</FormLabel>

                            <Selector
                                data={country}
                                initValue={translate("selector.label")}
                                cancelText={translate("selector.cancelButton")}
                                onChange={(option) => this.setState({ userCountry: option.key })}
                            />
                        </FormGroupChild>
                    </FormGroup>

                    {this.state.userCountry == "Brazil" ?
                        <FormGroup>
                            <FormGroupChild>
                                <FormLabel>Estado:</FormLabel>
                                <Selector
                                    data={state}
                                    initValue={translate("selector.label")}
                                    cancelText={translate("selector.cancelButton")}
                                    onChange={(option) => this.setState({ userState: option.key })}
                                />
                            </FormGroupChild>

                            <FormGroupChild>
                                <FormLabel>Município:</FormLabel>
                                <Selector
                                    data={getCity(this.state.userState)}
                                    initValue={this.state.userCity ? this.state.userCity : translate("selector.label")}
                                    cancelText={translate("selector.cancelButton")}
                                    onChange={(option) => this.setState({ userCity: option.key })}
                                />
                            </FormGroupChild>
                        </FormGroup>
                    : null}

                    {this.state.userCountry != null ?
                        <FormInlineCheck>
                            <CheckBoxStyled
                                title={this.state.userCountry + translate("register.originCountry")}
                                checked={this.state.residenceCountryCheckbox}
                                onPress={() => {
                                    this.setState({ residence: '' })
                                    this.setState({ residenceCountryCheckbox: !this.state.residenceCountryCheckbox })
                                }}
                            />
                        </FormInlineCheck>
                    : null}

                    {!this.state.residenceCountryCheckbox ?
                        <FormInline>
                            <Selector
                                data={country}
                                initValue={translate("selector.label")}
                                cancelText={translate("selector.cancelButton")}
                                onChange={(option) => this.setState({ residence: option.key })}
                            />
                        </FormInline>
                    : null}

                    <FormInlineCheck>
                        <CheckBoxStyled
                            title={"Voce é um profissional da Saude"}
                            checked={this.state.isProfessional}
                            onPress={() => {
                                this.setState({ isProfessional: !this.state.isProfessional })
                            }}
                        />
                    </FormInlineCheck>

                    <FormInlineCheck>
                        <CheckBoxStyled
                            title={"Faz parte do Grupo de Risco?"}
                            checked={this.state.riskGroup}
                            onPress={() => {
                                this.setState({ riskGroup: !this.state.riskGroup })
                            }}
                        />
                        <CheckLabel onPress={() => { this.setRiskGroupModalVisible(true) }}>
                            <Feather name="help-circle" size={scale(25)} color="#ffffff" />
                        </CheckLabel>
                    </FormInlineCheck>

                    <InstitutionSelector
                        setUserInstitutionCallback={this.setUserInstitutionCallback}
                        setAlert={this.setAlert}
                        setErrorCallback={this.setInstituitionComponentError}
                        lightTheme={true}
                    />

                    <FormInline>
                        <FormLabel>{translate("register.email")}</FormLabel>
                        <NormalInput
                            autoCapitalize='none'
                            keyboardType='email-address'
                            multiline={false}
                            maxLength={100}
                            returnKeyType='next'
                            onChangeText={email => this.setState({ userEmail: email })}
                            onSubmitEditing={() => this.passwordInput.focus()}
                        />
                    </FormInline>

                    <FormInline>
                        <FormLabel>{translate("register.password")}</FormLabel>
                        <NormalInput
                            autoCapitalize='none'
                            multiline={false}
                            maxLength={100}
                            secureTextEntry={true}
                            ref={(input) => this.passwordInput = input}
                            onChangeText={text => this.setState({ userPwd: text })}
                        />
                        <FormTip>{translate("register.passwordCondition")}</FormTip>
                    </FormInline>

                    <FormSeparator>
                        <Touch onPress={() => this.create()}>
                            <SnowButton>
                                <Label>{translate("register.signupButton")}</Label>
                            </SnowButton>
                        </Touch>
                    </FormSeparator>

                    <ButtonBack onPress={() => this.props.navigation.goBack()}>
                        <Feather name="chevron-left" size={scale(40)} color="#ffffff" />
                    </ButtonBack>
                </KeyboardScrollView>
                <LoadingModal show={showAlert} />
            </GradientBackground>
            </>
        )

    }

    isUserDataValid = () => {
        let error = false
        if (this.state.userName == null || this.state.userName == '' || this.state.userEmail == null || this.state.userPwd == null) {
            Alert.alert("Campos não podem ficar em branco", "Nome\nEmail\nSenha\n\nPrecisamos dessas informações para completar seu cadastro")
            error = true
        } else if (this.state.userBirth == null) {
            Alert.alert("A data de nascimento deve estar preenchida")
            error = true
        } else if (this.state.userCountry == "Brazil" && (this.state.userState == null || this.state.userCity == null)) {
            Alert.alert("Estado e Cidade devem estar preenchidos")
            error = true
        } else if (this.state.userPwd.length < 8) {
            Alert.alert("A senha precisa ter no mínimo 8 caracteres")
            error = true
        } else if (this.state.instituitionComponentError != null &&
            this.state.instituitionComponentError != undefined &&
            this.state.instituitionComponentError.length > 0) {
            Alert.alert(this.state.instituitionComponentError)
            error = true
        } else if (this.state.userCountry == null) {
            Alert.alert("Nacionalidade não pode ficar em Branco", "Precisamos da sua Nacionalidade para lhe mostrar as informações referentes ao seu país")
            error = true
        }
        return !error
    }

    create = () => {
        if (!this.isUserDataValid()) {
            return
        }
        Keyboard.dismiss()
        this.showAlert()
        fetch(API_URL + '/user/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user":
                {
                    residence: this.state.residence,
                    user_name: this.state.userName,
                    email: this.state.userEmail,
                    password: this.state.userPwd,
                    gender: this.state.userGender,
                    country: this.state.userCountry,
                    state: this.state.userState,
                    city: this.state.userCity,
                    race: this.state.userRace,
                    birthdate: this.state.userBirth,
                    picture: this.state.userPicture,
                    identification_code: this.state.userIdCode,
                    group_id: this.state.userGroup,
                    is_professional: this.state.isProfessional,
                    risk_group: this.state.riskGroup
                }
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    this.loginAfterCreate()
                } else {
                    this.hideAlert()
                    return response.json()
                }
            }).then((responseJson) => {
                Alert.alert("O email " + responseJson.errors[0].detail.email)
            })
    }

    //Login Function 
    loginAfterCreate = () => {
        return fetch(API_URL + '/user/login', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user:
                {
                    email: this.state.userEmail,
                    password: this.state.userPwd
                }
            })
        })
            .then((response) => {
                if (response.status == 200) {
                    this.setState({ userToken: response.headers.map.authorization })
                    this.hideAlert()
                    return response.json()
                } else {
                    alert("Algo deu errado")
                    this.hideAlert()
                }
            })
            .then((responseJson) => {
                AsyncStorage.setItem('userID', responseJson.user.id.toString())
                AsyncStorage.setItem('userName', responseJson.user.user_name)
                AsyncStorage.setItem('userBirth', responseJson.user.birthdate)
                AsyncStorage.setItem('isProfessional', responseJson.user.is_professional.toString())

                RNSecureStorage.set('userToken', this.state.userToken, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
                RNSecureStorage.set('userEmail', this.state.userEmail, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
                RNSecureStorage.set('userPwd', this.state.userPwd, { accessible: ACCESSIBLE.WHEN_UNLOCKED })

                this.props.navigation.navigate('Home')
            })
    }
}

//make this component available to the app
export default Registrar
