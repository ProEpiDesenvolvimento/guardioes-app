import React, { useState, useEffect } from 'react'
import { Alert, Modal } from 'react-native'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'

import { CoolAlert } from '../../../components/CoolAlert'
import {
    ModalContainer,
    ModalBox,
    ModalTitle,
    ModalText,
    ButtonClose,
    ModalClose,
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

import InstitutionSelector from '../../../components/Groups/InstitutionSelector'
import LoadingModal from '../../../components/Groups/LoadingModal'
import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import {
    genderChoices,
    countryChoices,
    raceChoices,
    householdChoices,
} from '../../../utils/selector'
import { validPerson } from '../../../utils/consts'
import { useUser } from '../../../hooks/user'
import { createHousehold } from '../../../api/households'
import { getCategories } from '../../../api/categories'

const NovoPerfil = ({ navigation }) => {
    const { token, user } = useUser()

    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [country, setCountry] = useState('')
    const [race, setRace] = useState('')
    const [birth, setBirth] = useState('')
    const [kinship, setKinship] = useState('')
    const [groupId, setGroupId] = useState(null)
    const [idCode, setIdCode] = useState(null)
    const [riskGroup, setRiskGroup] = useState(false)

    const [showAlert, setShowAlert] = useState(false)
    const [showProgressBar, setShowProgressBar] = useState(false)
    const [modalRiskGroup, setModalRiskGroup] = useState(false)
    const [institutionError, setInstituitionError] = useState(null)
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [category, setCategory] = useState({})
    const [allCategories, setAllCategories] = useState(null)

    const getAppCategories = async () => {
        const response = await getCategories()

        if (response.status === 200) {
            const { categories } = response.data

            const auxCategories = categories.map(({ id, name }) => {
                return {
                    key: id,
                    label: name,
                }
            })
            setAllCategories(auxCategories)
        }
    }

    useEffect(() => {
        getAppCategories()
    }, [])

    const showLoadingAlert = () => {
        setShowAlert(true)
        setShowProgressBar(true)
    }

    const handleCreate = async () => {
        const birthDate = moment(birth, 'DD-MM-YYYY').toISOString()

        const household = {
            description: name,
            birthdate: birthDate,
            gender,
            race,
            kinship,
            country,
            group_id: groupId,
            identification_code: idCode,
            risk_group: riskGroup,
            category_id: category.key,
            category_required: !!allCategories,
        }

        if (!validPerson(household, institutionError)) return
        showLoadingAlert()

        const response = await createHousehold(household, user.id, token)

        if (response.status === 201) {
            console.warn(response.status)
            setShowAlert(false)
            navigation.navigate('Home')
        } else {
            Alert.alert(translate('register.geralError'))
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

                        <ButtonClose onPress={() => setModalRiskGroup(false)}>
                            <ModalClose>
                                <Feather
                                    name='x'
                                    size={scale(24)}
                                    color='#ffffff'
                                />
                            </ModalClose>
                        </ButtonClose>
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
                            maxDate={moment().local().format('DD-MM-YYYY')}
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

                <FormInline>
                    <FormLabel>Parentesco:</FormLabel>
                    <Selector
                        initValue={translate('selector.label')}
                        cancelText={translate('selector.cancelButton')}
                        data={householdChoices}
                        onChange={(option) => setKinship(option.key)}
                    />
                </FormInline>

                <FormInlineCheck>
                    <CheckBoxStyled
                        title={translate('register.riskGroupLabel')}
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

                {allCategories ? (
                    <FormInline>
                        <FormLabel>Categoria:</FormLabel>
                        <Selector
                            data={allCategories}
                            initValue={
                                category.key
                                    ? category.label
                                    : translate('selector.label')
                            }
                            cancelText={translate('selector.cancelButton')}
                            onChange={(option) => setCategory(option)}
                        />
                    </FormInline>
                ) : null}

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
                        ? translate('register.awesomeAlert.registering')
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
