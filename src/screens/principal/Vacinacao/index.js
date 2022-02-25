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
    KeyboardScrollView,
    FormInline,
    DateSelector,
    FormInlineCheck,
    CheckBoxStyled,
    CheckLabel,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'
import { VaccineScroll } from './styles'
import {
    AvatarWrapper,
    InfoContainer,
    InfoWrapper,
    ButtonsWrapper,
    HouseholdWrapper,
    HouseholdTitle,
    Household,
    HouseholdName,
    HouseholdRelation,
} from '../Perfis/styles'

import LoadingModal from '../../../components/Groups/LoadingModal'
import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import { getInitials } from '../../../utils/consts'
import { useUser } from '../../../hooks/user'
import { validVaccination } from '../../../utils/formConsts'
import { getVaccines, getDoses, sendDose } from '../../../api/vaccines'
import { updateUser } from '../../../api/user'

const Vacinacao = () => {
    const { token, user, storeUser } = useUser()

    const [isLoading, setIsLoading] = useState(true)

    const [vaccines, setVaccines] = useState([])
    const [vaccineSelected, setVaccineSelected] = useState({})
    const [newVaccineSelected, setNewVaccineSelected] = useState({})

    const [doses, setDoses] = useState([])
    const [doseSelected, setDoseSelected] = useState({})
    const [newDoseDate, setNewDoseDate] = useState('')

    const [modalVaccine, setModalVaccine] = useState(false)
    const [modalDose, setModalDose] = useState(false)
    const [loadingAlert, setLoadingAlert] = useState(false)

    const getAppVaccines = async () => {
        const response = await getVaccines(token)

        if (response.status === 200) {
            const { vaccines } = response.data
            setVaccines(vaccines)
            setDoses(user.doses)
            setIsLoading(false)
        }
    }

    const VaccineSelector = () => {
        return (
            <FormInline>
                {vaccines.map((vaccine) => {
                    if (vaccine.id === newVaccineSelected.id) {
                        return (
                            <FormInlineCheck key={vaccine.id}>
                                <CheckBoxStyled
                                    title={vaccine.name}
                                    checked={vaccine.id === newVaccineSelected.id}
                                    onPress={() => setNewVaccineSelected(vaccine)}
                                />
                                <CheckLabel
                                    onPress={() => {
                                        setVaccineSelected(vaccine)
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
                        )
                    }
                    return (
                        <FormInlineCheck key={vaccine.id}>
                            <CheckBoxStyled
                                title={vaccine.name}
                                checked={vaccine.id === newVaccineSelected.id}
                                onPress={() => setNewVaccineSelected(vaccine)}
                            />
                            <CheckLabel
                                onPress={() => {
                                    setVaccineSelected(vaccine)
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
                    )
                })}
            </FormInline>
        )
    }

    const handleAddDose = () => {
        if (!newDoseDate || !newVaccineSelected.id) {
            Alert.alert(
                translate('vaccination.titleError'),
                translate('vaccination.messageError')
            )
            return
        }

        let numberDose = 1
        doses.forEach((dose) => {
            if (
                dose.vaccine.id === newVaccineSelected.id ||
                dose.vaccine.disease === newVaccineSelected.disease
            ) {
                numberDose += 1
            }
        })

        if (numberDose > newVaccineSelected.doses) {
            Alert.alert(
                translate('vaccination.titleError2'),
                translate('vaccination.messageError2')
            )
            return
        }

        const doseDate = moment(newDoseDate, 'DD-MM-YYYY').toISOString()
        const newDose = {
            id: new Date().getTime(),
            date: doseDate,
            dose: numberDose,
            user_id: user.id,
            vaccine_id: newVaccineSelected.id,
            vaccine: newVaccineSelected,
        }

        setDoses([...doses, newDose])
        setNewDoseDate('')
        setNewVaccineSelected({})
        setModalDose(false)
    }

    const sendVaccination = async () => {
        setLoadingAlert(false)

        /*
        const doseDate = moment
            .utc(newDoseDate, 'DD-MM-YYYY')
            .format('YYYY-MM-DD')

        if (!validVaccination(newDoseVaccine, numberDoses, doseDate)) {
            setModalDose(false)
            setLoadingAlert(false)
        } else {
            setModalDose(false)

            const newDose = {
                date: doseDate,
                dose: numberDoses,
                vaccine_id: vaccineSelected.id,
                user_id: user.id,
            }

            const vaccination = {
                vaccine_id: newDoseVaccine.id,
            }

            if (!user.vaccine) {
                const userUpdate = await updateUser(vaccination, user.id, token)

                if (userUpdate.status === 200) {
                    storeUser({
                        ...user,
                        ...userUpdate.body.user,
                    })
                }
            }

            const response = await sendDose(newDose, token)

            if (response.status === 200) {
                setLoadingAlert(false)
                setModalDose(false)
            } else {
                console.warn(response)
                setLoadingAlert(false)
                Alert.alert(translate('register.geralError'))
            }

            initValues()
        }
        */
    }

    useEffect(() => {
        getAppVaccines()
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
                }}
            >
                <ModalContainer>
                    <ModalBox>
                        <ModalTitle>
                            {translate('vaccination.titleModal')}
                        </ModalTitle>

                        <ModalText>
                            {translate('vaccination.nameVaccine')}
                            {vaccineSelected.name}
                            {'\n'}
                            {translate('vaccination.laboratoryVaccine')}
                            {vaccineSelected.laboratory}
                            {'\n'}
                            {translate('vaccination.countryVaccine')}
                            {vaccineSelected.country_origin}
                            {'\n'}
                            {translate('vaccination.dosesVaccine')}
                            {vaccineSelected.doses}
                            {'\n'}
                            {translate('vaccination.minIntervalVaccine')}
                            {vaccineSelected.min_dose_interval}
                            {translate('vaccination.intervalVaccinePeriod')}
                        </ModalText>

                        <Button onPress={() => setModalVaccine(false)}>
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
                {doses.length > 0 ? (
                    <HouseholdWrapper>
                        <HouseholdTitle>
                            {translate('vaccination.doses')}
                        </HouseholdTitle>
                    </HouseholdWrapper>
                ) : null}

                {doses.map((dose) => (
                    <Household key={dose.id}>
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
                                <HouseholdName>
                                    {dose.vaccine.name}
                                </HouseholdName>
                                <HouseholdRelation>
                                    {moment(new Date(dose.date)).format(
                                        'DD/MM/YYYY'
                                    )}
                                </HouseholdRelation>
                            </InfoWrapper>
                            <ButtonsWrapper>
                                <Button
                                    onPress={() => {
                                        setDoseSelected(dose)
                                        setModalDose(true)
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
                    </Household>
                ))}

                <Modal // Dose
                    animationType='fade'
                    transparent
                    visible={modalDose}
                    onRequestClose={() => {
                        setModalDose(!modalDose)
                        setDoseSelected({})
                        setNewDoseDate('')
                        setNewVaccineSelected({})
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
                                        date={
                                            doseSelected.id
                                                ? doseSelected.date
                                                : newDoseDate
                                        }
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
                                        onDateChange={(date) => {
                                            if (doseSelected.id) {
                                                setDoseSelected({
                                                    ...doseSelected,
                                                    date,
                                                })
                                            } else {
                                                setNewDoseDate(date)
                                            }
                                        }}
                                    />
                                </FormInline>

                                {VaccineSelector()}
                            </VaccineScroll>

                            <Button onPress={() => handleAddDose()}>
                                <ModalButton>
                                    <ModalButtonText>
                                        {translate('vaccination.save')}
                                    </ModalButtonText>
                                </ModalButton>
                            </Button>
                        </ModalBox>
                    </ModalContainer>
                </Modal>

                <Button onPress={() => setModalDose(!modalDose)}>
                    <SendContainer>
                        <SendText>{translate('vaccination.add')}</SendText>
                    </SendContainer>
                </Button>
            </KeyboardScrollView>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default Vacinacao
