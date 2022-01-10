import React, { useEffect, useState } from 'react'
import { Alert, Modal } from 'react-native'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'

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
    FormLabel,
    DateSelector,
    FormInlineCheck,
    CheckBoxStyled,
    CheckLabel,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'

import LoadingModal from '../../../components/Groups/LoadingModal'
import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import { useUser } from '../../../hooks/user'
import { validVaccination } from '../../../utils/formConsts'
import { getVaccines, getDoses, sendDose } from '../../../api/vaccines'
import { updateUser } from '../../../api/user'

const Vacinacao = ({ navigation }) => {
    const { token, user, storeUser } = useUser()

    const [isLoading, setIsLoading] = useState(true)

    const [vaccines, setVaccines] = useState([])
    const [vaccineSelected, setVaccineSelected] = useState({})
    const [dose1Vaccine, setDose1Vaccine] = useState({})

    const [modalVaccine, setModalVaccine] = useState(false)
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [modalAddDose, setModalAddDose] = useState(false)
    const [numberDoses, setNumberDoses] = useState(0)
    const [newDoseDate, setNewDoseDate] = useState('')
    const [lastDoseDate, setLastDoseDate] = useState('')
    const [newDoseVaccine, setNewDoseVaccine] = useState({})
    const [doses, setDoses] = useState([])

    const initValues = async () => {
        const response = await getDoses(token)

        setDoses(response.body)

        if (!user.vaccine) setNumberDoses(1)
        else setNumberDoses(response.body.length + 1)

        if (response.body.length > 0) {
            setDose1Vaccine(response.body[0].vaccine_id)
            setLastDoseDate(response.body[response.body.length - 1].date)
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
            setModalAddDose(false)
            setLoadingAlert(false)
        } else {
            setModalAddDose(false)

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
                setModalAddDose(false)
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
            <Modal // Modal View for Vaccine Info
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
                    doses.map((item) => (
                        <>
                            <FormInline key={item.dose}>
                                <FormLabel>
                                    {`Vacina da ${item.dose}ª dose`}
                                </FormLabel>
                                <DateSelector
                                    placeholder={translate(
                                        'vaccination.dateField'
                                    )}
                                    date={moment
                                        .utc(new Date(item.date))
                                        .format('DD-MM-YYYY')}
                                    format='DD-MM-YYYY'
                                    minDate='01-01-1918'
                                    maxDate={moment.utc().format('DD-MM-YYYY')}
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
                                    disabled={true}
                                />
                            </FormInline>

                            {item.dose !== 2
                                ? VaccineSelector(item.vaccine_id)
                                : null}
                        </>
                    ))
                ) : (
                    <>
                        <FormInline>
                            <FormLabel>
                                Clique no botão para adicionar uma dose da
                                vacina.
                            </FormLabel>
                        </FormInline>
                    </>
                )}
                <Modal
                    animationType='fade'
                    transparent
                    visible={modalAddDose}
                    onRequestClose={() => {
                        setModalAddDose(!modalAddDose)
                    }}
                >
                    <ModalContainer>
                        <ModalBox>
                            <ModalTitle>{`Informações da ${numberDoses}ª dose`}</ModalTitle>

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
                                    <ModalButtonText>Salvar</ModalButtonText>
                                </ModalButton>
                            </Button>
                        </ModalBox>
                    </ModalContainer>
                </Modal>

                <Button onPress={() => setModalAddDose(true)}>
                    <SendContainer>
                        <SendText>Adicionar</SendText>
                    </SendContainer>
                </Button>
            </KeyboardScrollView>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default Vacinacao
