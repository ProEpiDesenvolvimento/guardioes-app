import React, { useState, useEffect } from 'react'
import { Alert, Modal } from 'react-native'
import { PROFESSIONAL_FORM_ID } from 'react-native-dotenv'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Avatar } from 'react-native-elements'

import {
    ModalContainer,
    ModalBox,
    ModalTitle,
    ModalText,
    Button,
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
    ReadOnlyInput,
    FormInlineCheck,
    CheckBoxStyled,
    CheckLabel,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'
import { Delete } from './styles'

import InstitutionSelector from '../../../components/Groups/InstitutionSelector'
import FlexibleFormBuilder from '../../../components/FlexibleFormBuilder'
import LoadingModal from '../../../components/LoadingModal'
import translate from '../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import {
    genderChoices,
    countryChoices,
    raceChoices,
    householdChoices,
    communityChoices,
} from '../../../utils/selector'
import { maskPhone } from '../../../utils/masks'
import { getAvatar, getInitials, validPerson } from '../../../utils/consts'
import { stateOptionsBR, getCityBR } from '../../../utils/brasil'
import { stateOptionsCV, getCityCV } from '../../../utils/caboverde'
import { useUser } from '../../../hooks/user'
import { updateUser } from '../../../api/user'
import {
    getFlexibleRegistration,
    getFlexibleAnswers,
    sendFlexibleAnswer,
    editFlexibleAnswer,
    deleteFlexibleAnswer,
} from '../../../api/flexibleForms'
import { updateHousehold, deleteHousehold } from '../../../api/households'
import Autocomplete from '../../../components/Autocomplete'
import { getAppGroup } from '../../../api/groups'
import { getCategories } from '../../../api/categories'

const PerfilEditar = ({ navigation, route }) => {
    const {
        token,
        user,
        storeUser,
        updateUserAvatar,
        households,
        storeHouseholds,
        updateHouseholdAvatars,
    } = useUser()
    const { person } = route.params

    const isHousehold = person.is_household
    const { id } = person
    const [avatar, setAvatar] = useState(person.avatar)
    const [name, setName] = useState(person.name)
    const [email, setEmail] = useState(person.email)
    const [gender, setGender] = useState(person.gender)
    const [country, setCountry] = useState(person.country)
    const [state, setState] = useState(person.state)
    const [city, setCity] = useState(person.city)
    const [phone, setPhone] = useState(person.phone)
    const [race, setRace] = useState(person.race)
    const [birth, setBirth] = useState(person.birthdate)
    const [kinship, setKinship] = useState(person.kinship)
    const [groupId, setGroupId] = useState(person.group_id)
    const [idCode, setIdCode] = useState(person.identification_code)
    const [riskGroup, setRiskGroup] = useState(person.risk_group)
    const [isProfessional, setIsProfessional] = useState(person.is_professional)
    const [isVigilance, setIsVigilance] = useState(person.is_vigilance)
    const [category, setCategory] = useState(person.category)
    const [allCategories, setAllCategories] = useState([])

    const [modalRiskGroup, setModalRiskGroup] = useState(false)
    const [institutionError, setInstituitionError] = useState(null)
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [formVersion, setFormVersion] = useState({})
    const [fV2, setFV2] = useState({})

    const removeRegisterForm = async () => {
        setLoadingAlert(true)

        const response = await deleteFlexibleAnswer(
            fV2.flexible_answer_id,
            token
        )

        if (response.status !== 204) {
            console.warn(response.status)
            setLoadingAlert(false)
            Alert.alert(translate('register.geralError'))
            return response.status
        }
    }

    const editRegisterForm = async () => {
        const answers = []
        let error = false

        fV2.data.questions.forEach((question) => {
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
            Alert.alert(translate('register.errorMessages.fieldsMustFilled'))
            return error
        }

        const flexibleAnswer = {
            flexible_form_version_id: fV2.id,
            data: JSON.stringify({ answers }),
            user_id: user.id,
        }

        const response = await editFlexibleAnswer(
            fV2.flexible_answer_id,
            { flexible_answer: flexibleAnswer },
            token
        )

        if (!response.status === 200) {
            setLoadingAlert(false)
            console.warn(response.status)
            Alert.alert(translate('register.geralError'))
            return response.status
        }
    }

    const getRegisterAnswer = async (registerFormVersion) => {
        const response = await getFlexibleAnswers(token)

        if (response.status === 200) {
            const { flexible_answers } = response.data

            const [fa] = flexible_answers.filter(
                (answer) =>
                    answer.flexible_form.id ===
                    parseInt(PROFESSIONAL_FORM_ID, 10)
            )

            if (fa.data) {
                fa.data = JSON.parse(fa.data)
                const newData = []

                registerFormVersion.data.questions.forEach((q) => {
                    fa.data.answers.forEach((a) => {
                        if (q.field === a.field) {
                            newData.push({
                                ...q,
                                value: a.value,
                            })
                        }
                    })
                })
                const newFormVersion = { ...registerFormVersion }
                newFormVersion.flexible_answer_id = fa.id
                newFormVersion.data.questions = newData

                setFV2(newFormVersion)
                setFormVersion(newFormVersion)
            }
        }
    }

    const sendRegisterForm = async () => {
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
            Alert.alert(translate('register.errorMessages.fieldsMustFilled'))
            return error
        }

        const flexibleAnswer = {
            flexible_form_version_id: fV2.id,
            data: JSON.stringify({ answers }),
            user_id: user.id,
        }

        const response = await sendFlexibleAnswer(
            { flexible_answer: flexibleAnswer },
            token
        )

        if (!response.status === 200) {
            setLoadingAlert(false)
            console.warn(response.status)
            Alert.alert(translate('register.geralError'))
            return response.status
        }
    }

    const getRegisterForm = async () => {
        const response = await getFlexibleRegistration(1, '')

        if (response.status === 200) {
            const { flexible_form } = response.data

            if (flexible_form.flexible_form_version) {
                const parsedData = JSON.parse(
                    flexible_form.flexible_form_version.data
                )
                flexible_form.flexible_form_version.data = parsedData

                setFormVersion(flexible_form.flexible_form_version)
                setFV2(flexible_form.flexible_form_version)

                return flexible_form.flexible_form_version
            }
            return null
        }
        return null
    }

    useEffect(async () => {
        if (isProfessional) {
            if (person.is_professional) {
                const registerFormVersion = await getRegisterForm()
                await getRegisterAnswer(registerFormVersion)
            } else {
                const registerFormVersion = getRegisterForm()
            }
        }
    }, [isProfessional])

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

    const checkIfIsVigilance = async (groupId) => {
        if (groupId) {
            const response = await getAppGroup(groupId)
            if (response.status === 200) {
                const { group } = response.data

                if (
                    group.group_manager &&
                    !group.group_manager.vigilance_email
                ) {
                    setIsVigilance(false)
                }
            }
        } else {
            setIsVigilance(false)
        }
    }

    useEffect(() => {
        checkIfIsVigilance(groupId)
    }, [groupId])

    const removeHousehold = async () => {
        const household = {
            id,
        }

        setLoadingAlert(true)

        const response = await deleteHousehold(household, user.id, token)

        if (response.status === 204) {
            const newHouseholds = households.filter((h) => h.id !== id)
            storeHouseholds(newHouseholds)

            setLoadingAlert(false)
            navigation.goBack()
        } else {
            console.warn(response.status)
            setLoadingAlert(false)
            Alert.alert(translate('register.geralError'))
        }
    }

    const editHousehold = async () => {
        const birthDate = moment(birth, 'DD-MM-YYYY').toISOString()

        const newHousehold = {
            id,
            description: name,
            birthdate: birthDate,
            country,
            gender,
            race,
            kinship,
            group_id: groupId,
            identification_code: idCode,
            risk_group: riskGroup,
            category_id: category.key,
            category_required: allCategories.length > 0,
        }

        if (!validPerson(newHousehold, institutionError)) return
        setLoadingAlert(true)

        const response = await updateHousehold(newHousehold, user.id, token)

        if (response.status === 200) {
            const { household } = response.data
            const newHouseholds = households.filter((h) => h.id !== id)

            newHouseholds.push({
                ...newHousehold,
                ...household,
            })
            storeHouseholds(newHouseholds)

            setLoadingAlert(false)
            navigation.goBack()
        } else {
            console.warn(response.status)
            setLoadingAlert(false)
            Alert.alert(translate('register.geralError'))
        }
    }

    const editUser = async () => {
        const birthDate = moment(birth, 'DD-MM-YYYY').toISOString()
        const hasStateOrCity = country === 'Brazil' || country === 'Cabo Verde'

        const newUser = {
            user_name: name,
            birthdate: birthDate,
            gender,
            race,
            country,
            state: hasStateOrCity ? state : null,
            city: hasStateOrCity ? city : null,
            phone: isProfessional || isVigilance ? phone : null,
            phone_required: isProfessional || isVigilance,
            group_id: isProfessional ? null : groupId,
            identification_code: isProfessional ? null : idCode,
            is_professional: isProfessional,
            risk_group: riskGroup,
            is_vigilance: isProfessional ? false : isVigilance,
            category_id: category.key,
            category_required: !isProfessional && allCategories.length > 0,
        }

        if (!validPerson(newUser, institutionError)) return
        setLoadingAlert(true)

        const response = await updateUser({ user: newUser }, user.id, token)

        if (response.status === 200) {
            const { user } = response.data

            storeUser({
                ...newUser,
                ...user,
            })

            setLoadingAlert(false)
            navigation.goBack()
        } else {
            console.warn(response.status)
            setLoadingAlert(false)
            Alert.alert(translate('register.geralError'))
        }
    }

    const handleEdit = async () => {
        if (isHousehold) {
            await editHousehold()
        } else {
            let error = false

            if (isProfessional) {
                if (person.is_professional) {
                    error = await editRegisterForm()
                } else {
                    error = await sendRegisterForm()
                }
            } else if (fV2.flexible_answer_id) {
                error = await removeRegisterForm()
            }

            if (!error) {
                await editUser()
            }
        }
    }

    const handleDelete = () => {
        Alert.alert(
            translate('register.confirmDeleteUser'),
            translate('register.confirmDeleteUser2'),
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => removeHousehold() },
            ],
            { cancelable: false }
        )
    }

    const changeAvatar = (response) => {
        if (response) {
            if (!response.didCancel && !response.errorCode) {
                const [image] = response.assets
                const {uri} = image

                if (isHousehold) {
                    updateHouseholdAvatars(id, uri)
                } else {
                    updateUserAvatar(uri)
                }
                setAvatar(uri)
                Alert.alert(translate('register.updatedPhoto'))
            }
        } else {
            if (isHousehold) {
                updateHouseholdAvatars(id, undefined)
            } else {
                updateUserAvatar(undefined)
            }
            setAvatar(null)
            Alert.alert(translate('register.removedPhoto'))
        }
    }

    const handleAvatar = () => {
        Alert.alert(
            translate('register.selectImage'),
            '',
            [
                {
                    text: translate('register.pickPhoto'),
                    onPress: () =>
                        launchCamera(imageOptions, (response) => {
                            changeAvatar(response)
                        }),
                },
                {
                    text: translate('register.library'),
                    onPress: () =>
                        launchImageLibrary(imageOptions, (response) => {
                            changeAvatar(response)
                        }),
                },
                {
                    text: translate('register.removePhoto'),
                    onPress: () => changeAvatar(null),
                },
                {
                    text: translate('selector.cancelButton'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        )
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
            <Modal // Modal View for Risk Group Message
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
            <KeyboardScrollView>
                <FormInline>
                    <Avatar
                        size={scale(110)}
                        source={getAvatar(avatar)}
                        title={getInitials(name)}
                        activeOpacity={0.5}
                        showEditButton
                        rounded
                        editButton={{
                            name: 'camera',
                            type: 'feather',
                            color: '#ffffff',
                            underlayColor: '#000000',
                        }}
                        onEditPress={() => handleAvatar()}
                    />
                    {isHousehold && (
                        <Delete onPress={() => handleDelete()}>
                            <Feather
                                name='trash-2'
                                size={scale(25)}
                                color='#ffffff'
                            />
                        </Delete>
                    )}
                </FormInline>

                {!isHousehold ? (
                    <FormInline>
                        <FormLabel>{translate('register.email')}</FormLabel>
                        <ReadOnlyInput>{email}</ReadOnlyInput>
                    </FormInline>
                ) : null}

                <FormInline>
                    <FormLabel>{translate('register.name')} *</FormLabel>
                    <NormalInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </FormInline>

                <FormGroup>
                    <FormGroupChild>
                        <FormLabel>{translate('register.gender')}</FormLabel>
                        <Selector
                            data={genderChoices}
                            initValue={gender}
                            cancelText={translate('selector.cancelButton')}
                            onChange={(option) => setGender(option.key)}
                        />
                    </FormGroupChild>

                    <FormGroupChild>
                        <FormLabel>{translate('register.race')}</FormLabel>
                        <Selector
                            data={raceChoices}
                            initValue={race}
                            cancelText={translate('selector.cancelButton')}
                            onChange={(option) => setRace(option.key)}
                        />
                    </FormGroupChild>
                </FormGroup>

                <FormGroup>
                    <FormGroupChild>
                        <FormLabel>{translate('register.birth')} *</FormLabel>
                        <DateSelector
                            placeholder={translate('dateSelector.format')}
                            date={birth}
                            format='DD-MM-YYYY'
                            minDate='01-01-1918'
                            maxDate={moment().local().format('DD-MM-YYYY')}
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
                        <FormLabel>{translate('register.country')} *</FormLabel>
                        <Autocomplete
                            data={countryChoices}
                            value={country}
                            onChange={(option) => {
                                setCountry(option.key)
                                setState('')
                                setCity('')
                            }}
                        />
                    </FormGroupChild>
                </FormGroup>

                {(country === 'Brazil' || country === 'Cabo Verde') &&
                !isHousehold ? (
                    <FormGroup>
                        <FormGroupChild>
                            <FormLabel>Estado: *</FormLabel>
                            <Autocomplete
                                data={
                                    country === 'Brazil'
                                        ? stateOptionsBR
                                        : stateOptionsCV
                                }
                                value={state}
                                onChange={(option) => {
                                    setState(option.key)
                                    setCity('')
                                }}
                            />
                        </FormGroupChild>

                        <FormGroupChild>
                            <FormLabel>Município: *</FormLabel>
                            <Autocomplete
                                data={
                                    country === 'Brazil'
                                        ? getCityBR(state)
                                        : getCityCV(state)
                                }
                                value={city}
                                onChange={(option) => setCity(option.key)}
                            />
                        </FormGroupChild>
                    </FormGroup>
                ) : null}

                {isHousehold ? (
                    <FormInline>
                        <FormLabel>Parentesco: *</FormLabel>
                        <Selector
                            data={householdChoices}
                            initValue={kinship}
                            cancelText={translate('selector.cancelButton')}
                            onChange={(option) => setKinship(option.key)}
                        />
                    </FormInline>
                ) : null}

                {!isHousehold ? (
                    <FormInline>
                        <FormLabel>
                            {translate('register.professionalLabel')}
                        </FormLabel>
                        <Selector
                            data={communityChoices}
                            initValue={isProfessional ? 'Sim' : 'Não'}
                            cancelText={translate('selector.cancelButton')}
                            onChange={(option) => setIsProfessional(option.key)}
                        />
                    </FormInline>
                ) : null}

                {isProfessional ? (
                    <FlexibleFormBuilder
                        formVersion={formVersion}
                        fV2={fV2}
                        setFV2={setFV2}
                    />
                ) : null}

                {isProfessional ? (
                    <FormInline>
                        <FormLabel>Telefone: *</FormLabel>
                        <NormalInput
                            maxLength={16}
                            returnKeyType='done'
                            keyboardType='number-pad'
                            value={phone}
                            onChangeText={(text) =>
                                setPhone(maskPhone(country, text))
                            }
                        />
                    </FormInline>
                ) : null}

                {!isProfessional ? (
                    <FormInlineCheck>
                        <CheckBoxStyled
                            title={translate('register.riskGroupLabel')}
                            checked={riskGroup}
                            onPress={() => setRiskGroup(!riskGroup)}
                        />
                        <CheckLabel
                            onPress={() => {
                                setModalRiskGroup(true)
                            }}
                        >
                            <Feather
                                name='help-circle'
                                size={scale(25)}
                                color='#348EAC'
                            />
                        </CheckLabel>
                    </FormInlineCheck>
                ) : null}

                {!isProfessional ? (
                    <InstitutionSelector
                        setUserInstitutionCallback={setUserInstitutionCallback}
                        setAlert={setLoadingAlert}
                        userGroupId={groupId}
                        userIdCode={idCode}
                        setErrorCallback={setInstituitionComponentError}
                    />
                ) : null}

                {!isProfessional && allCategories.length > 0 ? (
                    <FormInline>
                        <FormLabel>
                            {translate('register.category')} *
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

                <Button onPress={() => handleEdit()}>
                    <SendContainer>
                        <SendText>Salvar</SendText>
                    </SendContainer>
                </Button>
            </KeyboardScrollView>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

const imageOptions = {
    mediaType: 'photo',
    quality: 0.7,
    includeBase64: false,
    saveToPhotos: true,
}

export default PerfilEditar
