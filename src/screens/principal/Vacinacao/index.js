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
    const [dose1Vaccine, setDose1Vaccine] = useState({})

    const [modalVaccine, setModalVaccine] = useState(false)
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [modalDose, setModalDose] = useState(false)
    const [numberDoses, setNumberDoses] = useState(0)
    const [newDoseDate, setNewDoseDate] = useState('')
    const [lastDoseDate, setLastDoseDate] = useState('')
    const [newDoseVaccine, setNewDoseVaccine] = useState({})
    const [doses, setDoses] = useState([])
    const [doseSelected, setDoseSelected] = useState({})

    const initValues = async () => {
        const response = await getDoses(token)

        setDoses(response.body.doses)

        if (!user.vaccine) setNumberDoses(1)
        else setNumberDoses(response.body.doses.length + 1)

        if (response.body.doses.length > 0) {
            setDose1Vaccine(response.body.doses[0].vaccine_id)
            setLastDoseDate(
                response.body.doses[response.body.doses.length - 1].date
            )
        }
    }

    const getAppVaccines = async () => {
        const response = await getVaccines(token)

        if (response.status === 200) {
            const { vaccines } = response.body
            setVaccines(vaccines)
            initValues()
            setIsLoading(false)
        }
    }

    const handleVaccine = (vaccine) => {
        setNewDoseVaccine(vaccine)
    }

    const sendVaccination = async () => {
        setLoadingAlert(false)

        const doseDate = moment
            .utc(newDoseDate, 'DD-MM-YYYY')
            .format('YYYY-MM-DD')

        if (
            !validVaccination(
                newDoseVaccine,
                numberDoses,
                doseDate,
                lastDoseDate
            )
        ) {
            setModalDose(false)
            setLoadingAlert(false)
        } else {
            setModalDose(false)

            const newDose = {
                date: doseDate,
                dose: numberDoses,
                vaccine_id:
                    numberDoses === 2 ? dose1Vaccine : newDoseVaccine.id,
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
    }

    useEffect(() => {
        getAppVaccines()
    }, [numberDoses])

    if (isLoading) {
        return <ScreenLoader />
    }

    const VaccineSelector = (id) => {
        return (
            <FormInline>
                {vaccines.map((vaccine) => (
                    <FormInlineCheck key={vaccine.id}>
                        <CheckBoxStyled
                            title={vaccine.name}
                            checked={vaccine.id === id}
                            onPress={() => handleVaccine(vaccine)}
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
                ))}
            </FormInline>
        )
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
                    }}
                >
                    <ModalContainer>
                        <ModalBox>
                            <ModalTitle>
                                {`${translate('vaccination.titleAddDose')}`}
                            </ModalTitle>

                            <>
                                <FormInline>
                                    <DateSelector
                                        placeholder={translate(
                                            'vaccination.dateField'
                                        )}
                                        date={newDoseDate}
                                        format='DD-MM-YYYY'
                                        minDate='01-01-1918'
                                        maxDate={moment
                                            .utc()
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

                                {numberDoses !== 2
                                    ? VaccineSelector(newDoseVaccine.id)
                                    : null}
                            </>

                            <Button onPress={() => sendVaccination()}>
                                <ModalButton>
                                    <ModalButtonText>
                                        {translate('vaccination.save')}
                                    </ModalButtonText>
                                </ModalButton>
                            </Button>
                        </ModalBox>
                    </ModalContainer>
                </Modal>

                <Button onPress={() => setModalDose(true)}>
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
