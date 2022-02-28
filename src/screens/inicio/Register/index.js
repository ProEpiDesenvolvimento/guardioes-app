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
    Selector,
    DateSelector,
    FormInlineCheck,
    CheckBoxStyled,
    Button,
    CheckLabel,
    ModalContainer,
    ModalBox,
    ModalTitle,
    ModalText,
    ModalButton,
    ModalButtonText,
} from '../../../components/NormalForms'
import { PageTitle, FormLabel, FormTip } from './styles'

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
    const { storeUser, setIsLoggedIn, setNeedSignIn } = useUser()

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
    const [riskGroup, setRiskGroup] = useState(false)
    const [isProfessional, setIsProfessional] = useState(false)

    const [countryCheckbox, setCountryCheckbox] = useState(true)
    const [modalRiskGroup, setModalRiskGroup] = useState(false)
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [categoryId, setCategoryId] = useState(null)
    const [allCategories, setAllCategories] = useState(null)

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
            is_professional: isProfessional,
            risk_group: riskGroup,
            policy_version: terms.version,
            category_id: categoryId,
        }

        if (!validPerson(user, null)) return
        setLoadingAlert(true)

        const response = await createUser({ user })

        if (response.status === 200) {
            loginAfterCreate()
        } else {
            setLoadingAlert(false)
            Alert.alert(`O email ${response.data.errors[0].detail.email}`)
        }
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

                            <Button onPress={() => setModalRiskGroup(false)}>
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
                            <Selector
                                data={genderChoices}
                                initValue={translate('selector.label')}
                                cancelText={translate('selector.cancelButton')}
                                onChange={(option) => setGender(option.key)}
                            />
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
                                    .subtract(13, 'years')
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

                    <FormInlineCheck space>
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

                    {allCategories ? (
                        <FormInline>
                            <FormLabel>Categoria:</FormLabel>
                            <Selector
                                data={allCategories}
                                selectedKey={categoryId}
                                initValue={translate('selector.label')}
                                cancelText={translate('selector.cancelButton')}
                                onChange={(option) => setCategoryId(option.key)}
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
