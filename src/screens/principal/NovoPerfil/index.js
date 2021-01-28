import React, { useState } from 'react'
import { Alert, Modal } from 'react-native'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'

import { CoolAlert } from '../../../components/CoolAlert'
import {
    ModalContainer,
    ModalBox,
    ModalTitle,
    ModalText,
    ModalButton,
    ModalButtonText,
    Container,
    KeyboardScrollView,
    FormInline,
    FormLabel,
    NormalInput,
    FormGroup,
    FormGroupChild,
    Selector,
    DateSelector,
    FormInlineCheck,
    CheckBoxStyled,
    CheckLabel,
    Button,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'

import InstitutionSelector from '../../../components/userData/InstitutionSelector'
import LoadingModal from '../../../components/userData/LoadingModal'
import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scallingUtils'
import {
    genderChoices,
    countryChoices,
    raceChoices,
    householdChoices,
} from '../../../utils/selectorUtils'
import { validatePerson } from '../../../utils/constUtils'
import { useUser } from '../../../hooks/user'
import { createHousehold } from '../../../api/households'

Feather.loadFont()

const NovoPerfil = ({ navigation }) => {
    const { token, data } = useUser()

    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [country, setCountry] = useState('')
    const [race, setRace] = useState('')
    const [birth, setBirth] = useState('')
    const [kinship, setKinship] = useState('')
    const [idCode, setIdCode] = useState(null)
    const [groupId, setGroupId] = useState(null)
    const [riskGroup, setRiskGroup] = useState(false)

    const [showAlert, setShowAlert] = useState(false)
    const [showProgressBar, setShowProgressBar] = useState(false)
    const [modalRiskGroup, setModalRiskGroup] = useState(false)
    const [institutionError, setInstituitionError] = useState(null)
    const [loadingAlert, setLoadingAlert] = useState(false)

    const showLoadingAlert = () => {
        setShowAlert(true)
        setShowProgressBar(true)
    }

    const handleCreate = async () => {
        const household = {
            description: name,
            birthdate: birth,
            country,
            gender,
            race,
            kinship,
            identification_code: idCode,
            group_id: groupId,
            risk_group: riskGroup,
        }

        if (!validatePerson(household, institutionError)) return

        showLoadingAlert()

        const response = await createHousehold(household, data.id, token)

        if (response.status === 201) {
            console.warn(response.status)
            setShowAlert(false)
            navigation.navigate('Home')
        } else {
            console.warn(response)
            Alert.alert('Ocorreu um erro, tente novamente depois.')
            setShowAlert(false)
        }
    }

    const setUserInstitutionCallback = (idCode, groupId) => {
        setIdCode(idCode)
        setGroupId(groupId)
    }

    const setInstituitionComponentError = (error) => {
        setInstituitionError(error)
    }

    return (
        <Container>
            <Modal // Modal for Risk Group Message
                animationType='fade'
                transparent
                visible={modalRiskGroup}
                onRequestClose={() => {
                    setModalRiskGroup(!modalRiskGroup)
                }}
            >
                <ModalContainer>
                    <ModalBox>
                        <ModalTitle>
                            {translate('register.riskGroupTitle')}
                        </ModalTitle>

                        <ModalText>
                            {translate('register.riskGroupMessage')}
                        </ModalText>

                        <Button
                            onPress={() => {
                                setModalRiskGroup(false)
                            }}
                        >
                            <ModalButton>
                                <ModalButtonText>
                                    {translate('register.riskGroupButton')}
                                </ModalButtonText>
                            </ModalButton>
                        </Button>
                    </ModalBox>
                </ModalContainer>
            </Modal>

            <KeyboardScrollView keyboardShouldPersistTaps='always'>
                <FormInline>
                    <FormLabel>{translate('register.name')}</FormLabel>
                    <NormalInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </FormInline>

                <FormGroup>
                    <FormGroupChild>
                        <FormLabel>{translate('register.gender')}</FormLabel>
                        <Selector
                            initValue={translate('selector.label')}
                            cancelText={translate('selector.cancelButton')}
                            data={genderChoices}
                            onChange={(option) => setGender(option.key)}
                        />
                    </FormGroupChild>

                    <FormGroupChild>
                        <FormLabel>{translate('register.race')}</FormLabel>
                        <Selector
                            initValue={translate('selector.label')}
                            cancelText={translate('selector.cancelButton')}
                            data={raceChoices}
                            onChange={(option) => setRace(option.key)}
                        />
                    </FormGroupChild>
                </FormGroup>

                <FormGroup>
                    <FormGroupChild>
                        <FormLabel>{translate('register.birth')}</FormLabel>
                        <DateSelector
                            placeholder={translate('birthDetails.format')}
                            date={birth}
                            format='DD-MM-YYYY'
                            minDate='01-01-1918'
                            maxDate={moment().format('DD/MM/YY')}
                            locale='pt-BR'
                            confirmBtnText={translate(
                                'birthDetails.confirmButton'
                            )}
                            cancelBtnText={translate(
                                'birthDetails.cancelButton'
                            )}
                            onDateChange={(date) => setBirth(date)}
                        />
                    </FormGroupChild>

                    <FormGroupChild>
                        <FormLabel>{translate('register.country')}</FormLabel>
                        <Selector
                            initValue={translate('selector.label')}
                            cancelText={translate('selector.cancelButton')}
                            data={countryChoices}
                            onChange={(option) => setCountry(option.key)}
                        />
                    </FormGroupChild>
                </FormGroup>

                <FormInlineCheck>
                    <CheckBoxStyled
                        title={translate('share.riskGroupLabel')}
                        checked={riskGroup}
                        onPress={() => setRiskGroup(!riskGroup)}
                    />
                    <CheckLabel onPress={() => setModalRiskGroup(true)}>
                        <Feather
                            name='help-circle'
                            size={scale(25)}
                            color='#348EAC'
                        />
                    </CheckLabel>
                </FormInlineCheck>

                <InstitutionSelector
                    setUserInstitutionCallback={setUserInstitutionCallback}
                    setAlert={setLoadingAlert}
                    setErrorCallback={setInstituitionComponentError}
                />

                <FormInline>
                    <FormLabel>Parentesco:</FormLabel>
                    <Selector
                        initValue={translate('selector.label')}
                        cancelText={translate('selector.cancelButton')}
                        data={householdChoices}
                        onChange={(option) => setKinship(option.key)}
                    />
                </FormInline>

                <Button onPress={() => handleCreate()}>
                    <SendContainer>
                        <SendText>Criar</SendText>
                    </SendContainer>
                </Button>
            </KeyboardScrollView>

            <CoolAlert
                show={showAlert}
                showProgress={showProgressBar}
                title={
                    showProgressBar
                        ? translate('register.awesomeAlert.registeringMessage')
                        : null
                }
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showConfirmButton={!showProgressBar}
            />
            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default NovoPerfil
