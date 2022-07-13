import React, { useRef, useState, useEffect } from 'react'
import { Keyboard, Alert, Modal, SafeAreaView } from 'react-native'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'
import {
    GradientBackground,
    ButtonBack,
    FormSeparator,
    Touch,
    SnowButton,
    Label,
} from '../../../components/SnowForms'
import {
    KeyboardScrollView,
    FormInline,
    NormalInput,
    FormGroup,
    FormGroupChild,
    FormInlineSelector,
    Selector,
    DateSelector,
    FormInlineCheck,
    CheckBoxStyled,
    CheckLabel,
    ModalContainer,
    ModalBox,
    ModalTitle,
    ModalText,
    ButtonClose,
    ModalClose,
} from '../../../components/NormalForms'
import { PageTitle, FormLabel, FormTip } from './styles'

import InstitutionSelector from '../../../components/Groups/InstitutionSelector'
import LoadingModal from '../../../components/Groups/LoadingModal'
import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import { UserIcon } from '../../../img/imageConst'
import { validPerson, terms } from '../../../utils/consts'
import {
    genderChoices,
    countryChoices,
    raceChoices,
} from '../../../utils/selector'
import { stateOptions, getCity } from '../../../utils/brasil'
import { useUser } from '../../../hooks/user'
import { createUser, authUser } from '../../../api/user'
import { getCategories } from '../../../api/categories'

const Register = ({ navigation }) => {
    const {
        getCurrentLocation, // remove on next release
        storeUser,
        setIsLoggedIn,
        setNeedSignIn,
    } = useUser()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [country, setCountry] = useState(null)
    const [residence, setResidence] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [race, setRace] = useState('')
    const [birth, setBirth] = useState('')
    const [groupId, setGroupId] = useState(null)
    const [idCode, setIdCode] = useState(null)
    const [riskGroup, setRiskGroup] = useState(false)
    const [isProfessional, setIsProfessional] = useState(false)

    const [countryCheckbox, setCountryCheckbox] = useState(true)
    const [modalGender, setModalGender] = useState(false)
    const [modalRiskGroup, setModalRiskGroup] = useState(false)
    const [key, setKey] = useState(0)
    const [institutionError, setInstituitionError] = useState(null)
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [category, setCategory] = useState({})
    const [allCategories, setAllCategories] = useState(null)

    // remove on next release
    const verifyExpocrato = async () => {
        const location = await getCurrentLocation()

        if (location.latitude > -7.279839 && location.latitude < -7.208763) {
            if (
                location.longitude > -39.452225 &&
                location.longitude < -39.357848
            ) {
                Alert.alert(
                    'Festival Expocrato',
                    'Você está no município de Crato, deseja fazer parte do evento Expocrato?',
                    [
                        {
                            text: 'Não',
                            onPress: () => console.log('Not Expocrato'),
                            style: 'cancel',
                        },
                        {
                            text: 'Sim',
                            onPress: () => {
                                setGroupId(7631)
                                setKey(key + 1)
                            },
                        },
                    ],
                    { cancelable: false }
                )
            }
        }
    }

    const getAppCategories = async () => {
        const response = await getCategories()

        if (response.status === 200) {
            const { categories } = response.data

            // Convertendo o json recebido para um aceito pelo Selector
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
        verifyExpocrato()
    }, [])

    const passwordInput = useRef()

    const loginAfterCreate = async () => {
        const response = await authUser({ user: { email, password } })

        if (response.status === 200) {
            setLoadingAlert(false)

            await storeUser(
                response.data.user,
                response.headers.authorization,
                {
                    email,
                    password,
                }
            )

            setTimeout(() => {
                setNeedSignIn(false)
                setIsLoggedIn(true)
            }, 1000)
        } else {
            setLoadingAlert(false)
            Alert.alert(translate('register.geralError'))
        }
    }

    const handleCreate = async () => {
        const birthDate = moment(birth, 'DD-MM-YYYY').toISOString()
        Keyboard.dismiss()

        const user = {
            email,
            password,
            user_name: name,
            birthdate: birthDate,
            gender,
            race,
            country,
            residence,
            state,
            city,
            group_id: groupId,
            identification_code: idCode,
            is_professional: isProfessional,
            risk_group: riskGroup,
            policy_version: terms.version,
            category_id: category.key,
            category_required: !!allCategories,
        }

        if (!validPerson(user, institutionError)) return
        setLoadingAlert(true)

        const response = await createUser({ user })

        if (response.status === 200) {
            loginAfterCreate()
        } else {
            setLoadingAlert(false)
            Alert.alert(`O email ${response.data.errors[0].detail.email}`)
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
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#5DD39E' }} />
            <GradientBackground>
                <Modal // Modal View for Gender Message
                    animationType='fade'
                    transparent
                    visible={modalGender}
                    onRequestClose={() => setModalGender(!modalGender)}
                >
                    <ModalContainer>
                        <ModalBox>
                            <ModalTitle>
                                {translate('register.genderTitle')}
                            </ModalTitle>

                            <ModalText>
                                {translate('register.genderMessage')}
                            </ModalText>

                            <ButtonClose onPress={() => setModalGender(false)}>
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

                <Modal // Modal View for Risk Group Message
                    animationType='fade'
                    transparent
                    visible={modalRiskGroup}
                    onRequestClose={() => setModalRiskGroup(!modalRiskGroup)}
                >
                    <ModalContainer>
                        <ModalBox>
                            <ModalTitle>
                                {translate('register.riskGroupTitle')}
                            </ModalTitle>

                            <ModalText>
                                {translate('register.riskGroupMessage')}
                            </ModalText>

                            <ButtonClose
                                onPress={() => setModalRiskGroup(false)}
                            >
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
                    <UserIcon
                        height={scale(68)}
                        width={scale(68)}
                        fill='#ffffff'
                    />
                    <PageTitle>{translate('register.title')}</PageTitle>

                    <FormInline>
                        <FormLabel>{translate('register.name')}</FormLabel>
                        <NormalInput
                            returnKeyType='next'
                            onChangeText={(text) => setName(text)}
                        />
                    </FormInline>

                    <FormGroup>
                        <FormGroupChild>
                            <FormLabel>
                                {translate('register.gender')}
                            </FormLabel>
                            <FormInlineSelector>
                                <Selector
                                    data={genderChoices}
                                    initValue={translate('selector.label')}
                                    cancelText={translate('selector.cancelButton')}
                                    onChange={(option) => setGender(option.key)}
                                />
                                <CheckLabel onPress={() => setModalGender(true)}>
                                    <Feather
                                        name='help-circle'
                                        size={scale(25)}
                                        color='#ffffff'
                                    />
                                </CheckLabel>
                            </FormInlineSelector>
                        </FormGroupChild>

                        <FormGroupChild>
                            <FormLabel>{translate('register.race')}</FormLabel>
                            <Selector
                                data={raceChoices}
                                initValue={translate('selector.label')}
                                cancelText={translate('selector.cancelButton')}
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
                                maxDate={moment()
                                    .local()
                                    .subtract(12, 'years')
                                    .format('DD-MM-YYYY')}
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
                            <FormLabel>
                                {translate('register.residence')}
                            </FormLabel>

                            <Selector
                                data={countryChoices}
                                initValue={translate('selector.label')}
                                cancelText={translate('selector.cancelButton')}
                                onChange={(option) => {
                                    setResidence(option.key)
                                    setCountry(option.key)
                                }}
                            />
                        </FormGroupChild>
                    </FormGroup>

                    {residence === 'Brazil' ? (
                        <FormGroup>
                            <FormGroupChild>
                                <FormLabel>Estado:</FormLabel>
                                <Selector
                                    data={stateOptions}
                                    initValue={translate('selector.label')}
                                    cancelText={translate(
                                        'selector.cancelButton'
                                    )}
                                    onChange={(option) => setState(option.key)}
                                />
                            </FormGroupChild>

                            <FormGroupChild>
                                <FormLabel>Município:</FormLabel>
                                <Selector
                                    data={getCity(state)}
                                    initValue={
                                        city || translate('selector.label')
                                    }
                                    cancelText={translate(
                                        'selector.cancelButton'
                                    )}
                                    onChange={(option) => setCity(option.key)}
                                />
                            </FormGroupChild>
                        </FormGroup>
                    ) : null}

                    {residence !== '' ? (
                        <FormInlineCheck>
                            <CheckBoxStyled
                                title={
                                    residence +
                                    translate('register.originCountry')
                                }
                                checked={countryCheckbox}
                                onPress={() => {
                                    !countryCheckbox
                                        ? setCountry(residence)
                                        : null
                                    setCountryCheckbox(!countryCheckbox)
                                }}
                            />
                        </FormInlineCheck>
                    ) : null}

                    {!countryCheckbox ? (
                        <FormInline>
                            <Selector
                                data={countryChoices}
                                initValue={translate('selector.label')}
                                cancelText={translate('selector.cancelButton')}
                                onChange={(option) => setCountry(option.key)}
                            />
                        </FormInline>
                    ) : null}

                    <FormInlineCheck>
                        <CheckBoxStyled
                            title={translate('register.healthProfessional')}
                            checked={isProfessional}
                            onPress={() => setIsProfessional(!isProfessional)}
                        />
                    </FormInlineCheck>

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
                                color='#ffffff'
                            />
                        </CheckLabel>
                    </FormInlineCheck>

                    <InstitutionSelector
                        key={key}
                        setUserInstitutionCallback={setUserInstitutionCallback}
                        setAlert={setLoadingAlert}
                        userGroup={groupId}
                        setErrorCallback={setInstituitionComponentError}
                        lightTheme
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

                    <FormInline>
                        <FormLabel>{translate('register.email')}</FormLabel>
                        <NormalInput
                            autoCapitalize='none'
                            keyboardType='email-address'
                            multiline={false}
                            maxLength={100}
                            returnKeyType='next'
                            onChangeText={(text) => setEmail(text)}
                            onSubmitEditing={() =>
                                passwordInput.current.focus()
                            }
                        />
                    </FormInline>

                    <FormInline>
                        <FormLabel>{translate('register.password')}</FormLabel>
                        <NormalInput
                            autoCapitalize='none'
                            multiline={false}
                            maxLength={100}
                            secureTextEntry
                            ref={passwordInput}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <FormTip>
                            {translate('register.passwordCondition')}
                        </FormTip>
                    </FormInline>

                    <FormSeparator>
                        <Touch onPress={() => handleCreate()}>
                            <SnowButton>
                                <Label>
                                    {translate('register.signupButton')}
                                </Label>
                            </SnowButton>
                        </Touch>
                    </FormSeparator>

                    <ButtonBack onPress={() => navigation.goBack()}>
                        <Feather
                            name='chevron-left'
                            size={scale(40)}
                            color='#ffffff'
                        />
                    </ButtonBack>
                </KeyboardScrollView>
                <LoadingModal show={loadingAlert} />
            </GradientBackground>
        </>
    )
}

export default Register
