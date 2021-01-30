import React, { useState } from 'react'
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
    ReadOnlyInput,
    FormInlineCheck,
    CheckBoxStyled,
    CheckLabel,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'
import { Delete } from './styles'

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
import {
    handleAvatar,
    getInitials,
    validatePerson,
} from '../../../utils/constUtils'
import { stateOptions, getCity } from '../../../utils/brasil'
import { useUser } from '../../../hooks/user'
import { updateUser } from '../../../api/user'
import { updateHousehold } from '../../../api/households'

Feather.loadFont()

const EditarPerfil = ({ navigation, route }) => {
    const {
        token,
        data,
        storeUserData,
        updateUserAvatar,
        households,
        storeHouseholds,
        updateHouseholdAvatars,
    } = useUser()
    const { person } = route.params

    const isHousehold = person.is_household
    const id = person.id
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
    const [idCode, setIdCode] = useState(person.identification_code)
    const [groupId, setGroupId] = useState(person.group_id)
    const [riskGroup, setRiskGroup] = useState(person.risk_group)

    const [modalRiskGroup, setModalRiskGroup] = useState(false)
    const [institutionError, setInstituitionError] = useState(null)
    const [loadingAlert, setLoadingAlert] = useState(false)

    const editHousehold = async () => {
        const household = {
            id,
            description: name,
            birthdate: birth,
            country,
            gender,
            race,
            kinship,
            group_id: groupId,
            identification_code: idCode,
            risk_group: riskGroup,
        }

        if (!validatePerson(household, institutionError)) return
        setLoadingAlert(true)

        const response = await updateHousehold(household, data.id, token)

        if (response.status === 200) {
            const oldHousehold = households.filter((h) => h.id === id)[0]
            const newHouseholds = households.filter((h) => h.id !== id)

            newHouseholds.push({
                ...oldHousehold,
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
        const user = {
            user_name: name,
            birthdate: birth,
            gender,
            race,
            country,
            state,
            city,
            group_id: groupId,
            identification_code: idCode,
            risk_group: riskGroup,
        }

        if (!validatePerson(user, institutionError)) return
        setLoadingAlert(true)

        const response = await updateUser(user, data.id, token)

        if (response.status === 200) {
            storeUserData({
                ...data,
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
                Alert.alert('Foto de perfil removida.')
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
                Alert.alert('Foto de perfil atualizada.')
            }
        })
    }

    const handleEdit = () => {
        if (country !== 'Brazil') {
            setState(null)
            setCity(null)
        }

        if (isHousehold) {
            editHousehold()
        } else {
            editUser()
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
                        <Delete onPress={() => confirmDelete()}>
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
                        <FormLabel>{translate('register.birth')}</FormLabel>
                        <DateSelector
                            placeholder={translate('birthDetails.format')}
                            date={birth}
                            format='DD-MM-YYYY'
                            minDate='01-01-1918'
                            maxDate={moment().format('DD-MM-YYYY')}
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
                            data={countryChoices}
                            initValue={country}
                            cancelText={translate('selector.cancelButton')}
                            onChange={(option) => setCountry(option.key)}
                        />
                    </FormGroupChild>
                </FormGroup>

                {country === 'Brazil' && !isHousehold ? (
                    <FormGroup>
                        <FormGroupChild>
                            <FormLabel>Estado:</FormLabel>
                            <Selector
                                data={stateOptions}
                                initValue={state}
                                cancelText={translate('selector.cancelButton')}
                                onChange={(option) => setState(option.key)}
                            />
                        </FormGroupChild>

                        <FormGroupChild>
                            <FormLabel>Cidade:</FormLabel>
                            <Selector
                                data={getCity(state)}
                                initValue={city}
                                cancelText={translate('selector.cancelButton')}
                                onModalClose={(option) => setCity(option.key)}
                            />
                        </FormGroupChild>
                    </FormGroup>
                ) : null}

                {isHousehold ? (
                    <FormInline>
                        <FormLabel>Parentesco:</FormLabel>
                        <Selector
                            data={householdChoices}
                            initValue={kinship}
                            cancelText={translate('selector.cancelButton')}
                            onChange={(option) => setKinship(option.key)}
                        />
                    </FormInline>
                ) : null}

                <FormInlineCheck>
                    <CheckBoxStyled
                        title={translate('share.riskGroupLabel')}
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
                    userGroup={groupId}
                    userIdCode={idCode}
                    setErrorCallback={setInstituitionComponentError}
                />

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
    noData: true,
    quality: 0.5,
    storageOptions: {
        skipBackup: true,
        path: 'gds',
    },
}

export default EditarPerfil
