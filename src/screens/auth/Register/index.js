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
    FormLabel,
    FormTip,
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
import { PageTitle } from './styles'

import InstitutionSelector from '../../../components/Groups/InstitutionSelector'
import FlexibleFormBuilder from '../../../components/FlexibleFormBuilder'
import LoadingModal from '../../../components/LoadingModal'
import translate from '../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import { UserIcon } from '../../../img/imageConst'
import { validPerson, terms } from '../../../utils/consts'
import {
    genderChoices,
    countryChoices,
    raceChoices,
    communityChoices,
} from '../../../utils/selector'
import { stateOptionsBR, getCityBR } from '../../../utils/brasil'
import { stateOptionsCV, getCityCV } from '../../../utils/caboverde'
import { useUser } from '../../../hooks/user'
import { createUser, authUser } from '../../../api/user'
import { getCategories } from '../../../api/categories'
import { getFlexibleForm, sendFlexibleAnswer } from '../../../api/events'

const Register = ({ navigation }) => {
    const { storeUser, setIsLoggedIn, setNeedSignIn } = useUser()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [genderOther, setGenderOther] = useState('')
    const [country, setCountry] = useState(null)
    const [residence, setResidence] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [race, setRace] = useState('')
    const [birth, setBirth] = useState('')
    const [groupId, setGroupId] = useState(null)
    const [idCode, setIdCode] = useState(null)
    const [riskGroup, setRiskGroup] = useState(false)
    const [isProfessional, setIsProfessional] = useState({})

    const [countryCheckbox, setCountryCheckbox] = useState(true)
    const [modalRiskGroup, setModalRiskGroup] = useState(false)
    const [key, setKey] = useState(0)
    const [institutionError, setInstituitionError] = useState(null)
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [category, setCategory] = useState({})
    const [allCategories, setAllCategories] = useState([])
    const [formVersion, setFormVersion] = useState({})
    const [fV2, setFV2] = useState({})

    const sendRegisterForm = async (user) => {
        const answers = []
        let error = false

        formVersion.data.questions.forEach((question) => {
            if (question.required && !question.value) {
                error = true
            }
            if (!error) {
                answers.push({
                    ...question,
                    options: undefined,
                    required: undefined,
                    text: undefined,
                    type: undefined,
                })
            }
        })

        if (error) {
            setLoadingAlert(false)
            Alert.alert(translate('register.fillRequired'))
            return
        }

        const flexibleAnswer = {
            flexible_form_version_id: formVersion.id,
            data: JSON.stringify({ answers }),
            user_id: user.id,
        }

        const response = await sendFlexibleAnswer(
            { flexible_answer: flexibleAnswer },
            ''
        )

        if (!response.status === 201) {
            setLoadingAlert(false)
            console.warn(response.status)
            Alert.alert(translate('register.geralError'))
        }
    }

    const getRegisterForm = async () => {
        const response = await getFlexibleForm(2, '')

        if (response.status === 200) {
            const { flexible_form } = response.data

            if (flexible_form.latest_version) {
                const parsedData = JSON.parse(flexible_form.latest_version.data)
                flexible_form.latest_version.data = parsedData

                setFormVersion(flexible_form.latest_version)
                setFV2(flexible_form.latest_version)
            }
        }
    }

    useEffect(() => {
        if (isProfessional.key) {
            getRegisterForm()
        }
    }, [isProfessional])

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

            if (isProfessional.key) {
                await sendRegisterForm(response.data.user)
            }

            setTimeout(() => {
                setNeedSignIn(false)
                setIsLoggedIn(true)
            }, 500)
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
            gender: gender === 'Outro' ? genderOther : gender,
            race,
            country,
            residence,
            state,
            city,
            group_id: groupId,
            identification_code: idCode,
            is_professional: !!isProfessional.key,
            risk_group: riskGroup,
            policy_version: terms.version,
            category_id: category.key,
            category_required: allCategories.length > 0,
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
                        <FormLabel light>
                            {translate('register.name')} *
                        </FormLabel>
                        <NormalInput
                            returnKeyType='next'
                            onChangeText={(text) => setName(text)}
                        />
                    </FormInline>

                    <FormGroup>
                        <FormGroupChild>
                            <FormLabel light>
                                {translate('register.gender')}
                            </FormLabel>
                            <FormInlineSelector>
                                <Selector
                                    data={genderChoices}
                                    initValue={translate('selector.label')}
                                    cancelText={translate('selector.cancelButton')}
                                    onChange={(option) => setGender(option.key)}
                                />
                            </FormInlineSelector>
                        </FormGroupChild>

                        <FormGroupChild>
                            <FormLabel light>
                                {translate('register.race')}
                            </FormLabel>
                            <Selector
                                data={raceChoices}
                                initValue={translate('selector.label')}
                                cancelText={translate('selector.cancelButton')}
                                onChange={(option) => setRace(option.key)}
                            />
                        </FormGroupChild>
                    </FormGroup>

                    {gender === 'Outro' ? (
                        <FormGroup>
                            <FormGroupChild>
                                <FormLabel>Especifique seu gênero:</FormLabel>
                                <NormalInput
                                    returnKeyType='next'
                                    onChangeText={(text) =>
                                        setGenderOther(text)
                                    }
                                />
                            </FormGroupChild>
                        </FormGroup>
                    ) : null}

                    <FormGroup>
                        <FormGroupChild>
                            <FormLabel light>
                                {translate('register.birth')} *
                            </FormLabel>
                            <DateSelector
                                placeholder={translate('dateSelector.format')}
                                date={birth}
                                format='DD-MM-YYYY'
                                minDate='01-01-1918'
                                maxDate={moment()
                                    .local()
                                    .subtract(12, 'years')
                                    .format('DD-MM-YYYY')}
                                locale='pt-BR'
                                confirmBtnText={translate(
                                    'dateSelector.confirmButton'
                                )}
                                cancelBtnText={translate(
                                    'dateSelector.cancelButton'
                                )}
                                onDateChange={(date) => setBirth(date)}
                            />
                        </FormGroupChild>

                        <FormGroupChild>
                            <FormLabel light>
                                {translate('register.residence')} *
                            </FormLabel>

                            <Selector
                                data={countryChoices}
                                initValue={translate('selector.label')}
                                cancelText={translate('selector.cancelButton')}
                                onChange={(option) => {
                                    setResidence(option.key)
                                    setCountry(option.key)
                                    setState('')
                                    setCity('')
                                }}
                            />
                        </FormGroupChild>
                    </FormGroup>

                    {residence === 'Brazil' || residence === 'Cabo Verde' ? (
                        <FormGroup>
                            <FormGroupChild>
                                <FormLabel light>Estado: *</FormLabel>
                                <Selector
                                    data={residence === 'Brazil' ? stateOptionsBR : stateOptionsCV}
                                    initValue={translate('selector.label')}
                                    cancelText={translate(
                                        'selector.cancelButton'
                                    )}
                                    onChange={(option) => setState(option.key)}
                                />
                            </FormGroupChild>

                            <FormGroupChild>
                                <FormLabel light>Município: *</FormLabel>
                                <Selector
                                    data={residence === 'Brazil' ? getCityBR(state) : getCityCV(state)}
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
                                    translate('register.originCountry') + ' *'
                                }
                                checked={countryCheckbox}
                                onPress={() => {
                                    if (!countryCheckbox) {
                                        setCountry(residence)
                                    }
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

                    <FormInline>
                        <FormLabel>
                            {translate('register.professionalLabel')}
                        </FormLabel>
                        <Selector
                            data={communityChoices}
                            initValue={
                                isProfessional.key !== undefined
                                    ? isProfessional.label
                                    : translate('selector.label')
                            }
                            cancelText={translate('selector.cancelButton')}
                            onChange={(option) => setIsProfessional(option)}
                        />
                    </FormInline>

                    {!isProfessional.key ? (
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
                    ) : null}

                    {!isProfessional.key ? (
                        <InstitutionSelector
                            key={key}
                            setUserInstitutionCallback={setUserInstitutionCallback}
                            setAlert={setLoadingAlert}
                            userGroup={groupId}
                            setErrorCallback={setInstituitionComponentError}
                            lightTheme
                        />
                    ) : null}

                    {!isProfessional.key && allCategories.length > 0 ? (
                        <FormInline>
                            <FormLabel light>
                                {translate('register.category')} *ð
                            </FormLabel>
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

                    {isProfessional.key ? (
                        <FlexibleFormBuilder
                            formVersion={formVersion}
                            fV2={fV2}
                            setFV2={setFV2}
                            light
                        />
                    ) : null}

                    <FormInline>
                        <FormLabel light>
                            {translate('register.email')} *
                        </FormLabel>
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
                        <FormLabel light>
                            {translate('register.password')} *
                        </FormLabel>
                        <NormalInput
                            autoCapitalize='none'
                            multiline={false}
                            maxLength={100}
                            secureTextEntry
                            ref={passwordInput}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <FormTip light>
                            {translate('register.passwordCondition')}
                        </FormTip>
                        <FormTip light>
                            {translate('register.fieldsRequired')}
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
