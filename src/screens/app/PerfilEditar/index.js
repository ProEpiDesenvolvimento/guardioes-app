import React, { useState, useEffect } from 'react'
import { Alert, Modal, Platform } from 'react-native'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-picker'
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
} from '../../../utils/selector'
import { handleAvatar, getInitials, validPerson } from '../../../utils/consts'
import { stateOptionsBR, getCityBR } from '../../../utils/brasil'
import { stateOptionsCV, getCityCV } from '../../../utils/caboverde'
import { useUser } from '../../../hooks/user'
import { updateUser } from '../../../api/user'
import {
    getFlexibleAnswers,
    editFlexibleAnswer,
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
    const [race, setRace] = useState(person.race)
    const [birth, setBirth] = useState(person.birthdate)
    const [kinship, setKinship] = useState(person.kinship)
    const [groupId, setGroupId] = useState(person.group_id)
    const [idCode, setIdCode] = useState(person.identification_code)
    const [riskGroup, setRiskGroup] = useState(person.risk_group)
    const [isVigilance, setIsVigilance] = useState(person.is_vigilance)
    const [category, setCategory] = useState(person.category)
    const [allCategories, setAllCategories] = useState([])

    const [modalRiskGroup, setModalRiskGroup] = useState(false)
    const [institutionError, setInstituitionError] = useState(null)
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [formVersion, setFormVersion] = useState({})
    const [fV2, setFV2] = useState({})

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
            Alert.alert(translate('register.fillRequired'))
            return
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
        }
    }

    const buildRegisterAnswer = (formAnswer) => {
        const newData = []

        formAnswer.flexible_form_version.data.questions.forEach((q) => {
            formAnswer.data.answers.forEach((a) => {
                if (q.field === a.field) {
                    newData.push({
                        ...q,
                        value: a.value,
                    })
                }
            })
        })

        const newFormVersion = { ...formAnswer.flexible_form_version }
        newFormVersion.flexible_answer_id = formAnswer.id
        newFormVersion.data.questions = newData

        setFV2(newFormVersion)
        setFormVersion(newFormVersion)
    }

    const getRegisterAnswer = async () => {
        const response = await getFlexibleAnswers(token)

        if (response.status === 200) {
            const { flexible_answers } = response.data

            const [fa] = flexible_answers.filter(
                (answer) => answer.flexible_form.id === 2
                // Hardcoded flexible form id
            )

            if (fa.data) {
                fa.data = JSON.parse(fa.data)
                fa.flexible_form_version.data = JSON.parse(
                    fa.flexible_form_version.data
                )

                buildRegisterAnswer(fa)
            }
        }
    }

    useEffect(() => {
        if (person.is_professional) {
            getRegisterAnswer()
        }
    }, [person.is_professional])

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

    const editUser = async () => {
        const birthDate = moment(birth, 'DD-MM-YYYY').toISOString()
        const isBrazil = country === 'Brazil'

        const newUser = {
            user_name: name,
            birthdate: birthDate,
            gender,
            race,
            country,
            state: isBrazil ? state : null,
            city: isBrazil ? city : null,
            group_id: groupId,
            identification_code: idCode,
            risk_group: riskGroup,
            is_vigilance: isVigilance,
            category_id: category.key,
            category_required: allCategories.length > 0,
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

    const changeAvatar = () => {
        ImagePicker.showImagePicker(imageOptions, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton === 'remove') {
                if (isHousehold) {
                    updateHouseholdAvatars(id, undefined)
                } else {
                    updateUserAvatar(undefined)
                }

                setAvatar(null)
                Alert.alert(translate('register.removedPhoto'))
            } else {
                let source = response.uri
                if (Platform.OS === 'android') {
                    source = `content://com.guardioesapp.provider/root${response.path}`
                }

                if (isHousehold) {
                    updateHouseholdAvatars(id, source)
                } else {
                    updateUserAvatar(source)
                }

                setAvatar(source)
                Alert.alert(translate('register.updatedPhoto'))
            }
        })
    }

    const handleEdit = () => {
        if (isHousehold) {
            editHousehold()
        } else {
            editUser()
            editRegisterForm()
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
                        source={handleAvatar(avatar)}
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
                        onEditPress={() => changeAvatar()}
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
                                onChange={(option) => setState(option.key)}
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

                {person.is_professional ? (
                    <FlexibleFormBuilder
                        formVersion={formVersion}
                        fV2={fV2}
                        setFV2={setFV2}
                    />
                ) : null}

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

                <InstitutionSelector
                    setUserInstitutionCallback={setUserInstitutionCallback}
                    setAlert={setLoadingAlert}
                    userGroupId={groupId}
                    userIdCode={idCode}
                    setErrorCallback={setInstituitionComponentError}
                />

                {allCategories.length > 0 ? (
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
    title: translate('register.selectImage'),
    takePhotoButtonTitle: translate('register.pickPhoto'),
    chooseFromLibraryButtonTitle: translate('register.library'),
    customButtons: [
        { name: 'remove', title: translate('register.removePhoto') },
    ],
    cancelButtonTitle: translate('selector.cancelButton'),
    noData: true,
    quality: 0.5,
    storageOptions: {
        skipBackup: true,
        path: 'gds',
    },
}

export default PerfilEditar
