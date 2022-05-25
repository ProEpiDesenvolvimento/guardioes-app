import React, { useEffect, useState } from 'react'
import { Alert, Modal } from 'react-native'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'
import { Avatar } from 'react-native-elements'

import ScreenLoader from '../../../components/ScreenLoader'
import {
    Container,
    ModalContainer,
    ModalBox,
    ModalTitle,
    ModalText,
    Button,
    ModalButton,
    ModalButtonText,
    ButtonClose,
    ModalClose,
    FormInline,
    DateSelector,
    FormInlineCheck,
    CheckBoxStyled,
    CheckLabel,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'
import {
    ScrollViewStyled,
    CardWrapper,
    CardTitle,
    CardWhite,
    CardNameWhite,
    CardDetailsWhite,
    AvatarWrapper,
    InfoContainer,
    InfoWrapper,
    ButtonsWrapper,
} from '../../../components/Cards'
import { VaccineScroll } from './styles'

import LoadingModal from '../../../components/Groups/LoadingModal'
import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import { getInitials } from '../../../utils/consts'
import { useUser } from '../../../hooks/user'
import { checkDose, validVaccination } from '../../../utils/formConsts'
import {
    getDoses,
    getVaccines,
    sendDose,
    updateDose,
    deleteDose,
} from '../../../api/vaccines'

const Vacinacao = () => {
    const { token, user } = useUser()

    const [isLoading, setIsLoading] = useState(true)

    const [vaccines, setVaccines] = useState([])
    const [vaccineInfo, setVaccineInfo] = useState({})
    const [vaccineSelected, setVaccineSelected] = useState({})

    const [doses, setDoses] = useState([])
    const [doseSelected, setDoseSelected] = useState({})
    const [newDoseDate, setNewDoseDate] = useState('')

    const [modalVaccine, setModalVaccine] = useState(false)
    const [modalDose, setModalDose] = useState(false)
    const [loadingAlert, setLoadingAlert] = useState(false)

    const getUserDoses = async () => {
        const response = await getDoses(token)

        if (response.status === 200) {
            const { doses } = response.data
            setDoses(doses)
        }
    }

    const getAppVaccines = async () => {
        const response = await getVaccines(token)

        if (response.status === 200) {
            const { vaccines } = response.data
            setVaccines(vaccines)
            setIsLoading(false)
        }
    }

    const fetchData = async () => {
        await getUserDoses()
        await getAppVaccines()
    }

    const vaccineSelector = () => {
        return (
            <FormInline>
                {vaccines.map((vaccine) => (
                    <FormInlineCheck key={vaccine.id}>
                        <CheckBoxStyled
                            title={vaccine.name}
                            checked={vaccine.id === vaccineSelected.id}
                            onPress={() => setVaccineSelected(vaccine)}
                        />
                        <CheckLabel
                            onPress={() => {
                                setVaccineInfo(vaccine)
                                setModalDose(false)
                                setModalVaccine(true)
                            }}
                        >
                            <Feather
                                name='help-circle'
                                size={scale(25)}
                                color='#348EAC'
                            />
                        </CheckLabel>
                    </FormInlineCheck>
                ))}
            </FormInline>
        )
    }

    const resetModalDose = () => {
        setModalDose(false)
        setDoseSelected({})
        setNewDoseDate('')
        setVaccineSelected({})
    }

    const editDose = async () => {
        const doseDate = moment(newDoseDate, 'DD-MM-YYYY').toISOString()

        const doseInfo = checkDose(vaccineSelected, doses, doseDate, doseSelected)
        const newDose = {
            id: doseSelected.id,
            date: doseDate,
            dose: doseInfo.position,
            user_id: user.id,
            vaccine_id: vaccineSelected.id,
        }

        if (!validVaccination(vaccineSelected, doseDate, doseInfo)) return
        setLoadingAlert(true)

        const response = await updateDose(newDose, token)

        if (response.status === 200) {
            const newDoses = doses.filter((d) => d.id !== doseSelected.id)
            newDoses.push(response.data.dose)
            setDoses(newDoses)

            resetModalDose()
            setLoadingAlert(false)
        } else {
            Alert.alert(translate('register.geralError'))
            setLoadingAlert(false)
        }
    }

    const createDose = async () => {
        const doseDate = moment(newDoseDate, 'DD-MM-YYYY').toISOString()

        const doseInfo = checkDose(vaccineSelected, doses, doseDate, {})
        const newDose = {
            date: doseDate,
            dose: doseInfo.position,
            user_id: user.id,
            vaccine_id: vaccineSelected.id,
        }

        if (!validVaccination(vaccineSelected, doseDate, doseInfo)) return
        setLoadingAlert(true)

        const response = await sendDose(newDose, token)

        if (response.status === 200) {
            const newDoses = [...doses, response.data.dose]
            setDoses(newDoses)

            resetModalDose()
            setLoadingAlert(false)
        } else {
            Alert.alert(translate('register.geralError'))
            setLoadingAlert(false)
        }
    }

    const removeDose = async () => {
        const dose = {
            id: doseSelected.id,
        }

        setLoadingAlert(true)

        const response = await deleteDose(dose, token)

        if (response.status === 204) {
            const newDoses = doses.filter((d) => d.id !== dose.id)
            setDoses(newDoses)

            resetModalDose()
            setLoadingAlert(false)
        } else {
            Alert.alert(translate('register.geralError'))
            setLoadingAlert(false)
        }
    }

    const handleSave = () => {
        if (doseSelected.id) {
            editDose()
        } else {
            createDose()
        }
    }

    const handleDelete = () => {
        Alert.alert(
            translate('vaccination.confirmDeleteDose'),
            translate('vaccination.confirmDeleteDose2'),
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => removeDose() },
            ],
            { cancelable: false }
        )
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <Container>
            <Modal // Vaccine
                animationType='fade'
                transparent
                visible={modalVaccine}
                onRequestClose={() => {
                    setModalVaccine(!modalVaccine)
                    setModalDose(true)
                }}
            >
                <ModalContainer>
                    <ModalBox>
                        <ModalTitle>
                            {translate('vaccination.titleModal')}
                        </ModalTitle>

                        <ModalText>
                            {translate('vaccination.nameVaccine')}
                            {vaccineInfo.name}
                            {'\n'}
                            {translate('vaccination.laboratoryVaccine')}
                            {vaccineInfo.laboratory}
                            {'\n'}
                            {translate('vaccination.countryVaccine')}
                            {vaccineInfo.country_origin}
                            {'\n'}
                            {translate('vaccination.dosesVaccine')}
                            {vaccineInfo.doses}
                            {'\n'}
                            {translate('vaccination.minIntervalVaccine')}
                            {vaccineInfo.min_dose_interval}
                            {translate('vaccination.intervalVaccinePeriod')}
                        </ModalText>

                        <ButtonClose
                            onPress={() => {
                                setModalVaccine(false)
                                setModalDose(true)
                            }}
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

            <ScrollViewStyled>
                <CardWrapper>
                    <CardTitle>
                        {doses.length > 0
                            ? translate('vaccination.doses')
                            : translate('vaccination.noDoses')}
                    </CardTitle>
                </CardWrapper>

                {doses.map((dose) => (
                    <CardWhite key={dose.id}>
                        <AvatarWrapper>
                            <Avatar
                                size={scale(58)}
                                source={null}
                                title={getInitials(`Dose ${dose.dose}`)}
                                rounded
                            />
                        </AvatarWrapper>
                        <InfoContainer>
                            <InfoWrapper>
                                <CardNameWhite>
                                    {dose.vaccine.name}
                                </CardNameWhite>
                                <CardDetailsWhite>
                                    {moment(new Date(dose.date)).format(
                                        'DD/MM/YYYY'
                                    )}
                                </CardDetailsWhite>
                            </InfoWrapper>
                            <ButtonsWrapper>
                                <Button
                                    onPress={() => {
                                        setDoseSelected(dose)
                                        setNewDoseDate(
                                            moment(new Date(dose.date)).format(
                                                'DD-MM-YYYY'
                                            )
                                        )
                                        setVaccineSelected(dose.vaccine)
                                        setModalDose(!modalDose)
                                    }}
                                >
                                    <Feather
                                        name='edit'
                                        size={scale(25)}
                                        color='#348EAC'
                                    />
                                </Button>
                            </ButtonsWrapper>
                        </InfoContainer>
                    </CardWhite>
                ))}

                <Modal // Dose
                    animationType='fade'
                    transparent
                    visible={modalDose}
                    onRequestClose={() => {
                        resetModalDose()
                    }}
                >
                    <ModalContainer>
                        <ModalBox>
                            <ModalTitle>
                                {doseSelected.id
                                    ? translate('vaccination.titleEditDose')
                                    : translate('vaccination.titleAddDose')}
                            </ModalTitle>

                            <VaccineScroll>
                                <FormInline>
                                    <DateSelector
                                        placeholder={translate(
                                            'vaccination.dateField'
                                        )}
                                        date={newDoseDate}
                                        format='DD-MM-YYYY'
                                        minDate='01-01-1918'
                                        maxDate={moment()
                                            .local()
                                            .format('DD-MM-YYYY')}
                                        locale='pt-BR'
                                        confirmBtnText={translate(
                                            'birthDetails.confirmButton'
                                        )}
                                        cancelBtnText={translate(
                                            'birthDetails.cancelButton'
                                        )}
                                        onDateChange={(date) =>
                                            setNewDoseDate(date)
                                        }
                                    />
                                </FormInline>

                                {vaccineSelector()}
                            </VaccineScroll>

                            {doseSelected.id ? (
                                <Button onPress={() => handleDelete()}>
                                    <ModalButton>
                                        <ModalButtonText>
                                            {translate('vaccination.delete')}
                                        </ModalButtonText>
                                    </ModalButton>
                                </Button>
                            ) : null}

                            <Button onPress={() => handleSave()}>
                                <ModalButton>
                                    <ModalButtonText>
                                        {translate('vaccination.save')}
                                    </ModalButtonText>
                                </ModalButton>
                            </Button>

                            <ButtonClose onPress={() => resetModalDose()}>
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

                <Button onPress={() => setModalDose(!modalDose)}>
                    <SendContainer>
                        <SendText>{translate('vaccination.add')}</SendText>
                    </SendContainer>
                </Button>
            </ScrollViewStyled>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default Vacinacao
