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
import { getVaccines } from '../../../api/vaccines'
import { updateUser } from '../../../api/user'

Feather.loadFont()

const Vacinacao = ({ navigation }) => {
    const { token, user, storeUser } = useUser()

    const [isLoading, setIsLoading] = useState(true)

    const [vaccines, setVaccines] = useState([])
    const [vaccineSelected, setVaccineSelected] = useState({})
    const [hasDose1, setHasDose1] = useState(false)
    const [hasDose2, setHasDose2] = useState(false)
    const [dose1Date, setDose1Date] = useState('')
    const [dose2Date, setDose2Date] = useState('')
    const [dose1, setDose1] = useState({})
    const [dose2, setDose2] = useState({})

    const [modalVaccine, setModalVaccine] = useState(false)
    const [loadingAlert, setLoadingAlert] = useState(false)

    const getAppVaccines = async () => {
        const response = await getVaccines(token)

        if (response.status === 200) {
            const vaccines = response.body
            setVaccines(vaccines)
            setIsLoading(false)
        }
    }

    const handleVaccine = (vaccine, doseType) => {
        if (doseType === 'dose1') {
            setDose1(vaccine)
        } else if (doseType === 'dose2') {
            setDose2(vaccine)
        }

        if (vaccine.doses < 2) {
            setHasDose2(false)
            setDose2({})
        }
    }

    const sendVaccination = async () => {
        const dose1D = moment(dose1Date, 'DD-MM-YYYY').format('YYYY-MM-DD')
        const dose2D = moment(dose2Date, 'DD-MM-YYYY').format('YYYY-MM-DD')

        const vaccination = {
            dose1_date: dose1D,
            dose1_vaccine: dose1.name,
            dose2_date: dose2D,
            dose2_vaccine: dose2.name,
        }

        if (!validVaccination(vaccination)) return
        setLoadingAlert(true)

        const response = await updateUser(vaccination, user.id, token)

        if (response.status === 200) {
            storeUser({
                ...user,
                ...vaccination,
            })

            setLoadingAlert(false)
            navigation.goBack()
        } else {
            console.warn(response.status)
            setLoadingAlert(false)
            Alert.alert(translate('register.geralError'))
        }
    }

    useEffect(() => {
        getAppVaccines()
    }, [])

    if (isLoading) {
        return <ScreenLoader />
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
                <FormInline>
                    <FormLabel>
                        {translate('vaccination.question1Label')}
                    </FormLabel>
                    <CheckBoxStyled
                        title={translate('vaccination.yesField')}
                        checked={hasDose1}
                        onPress={() => setHasDose1(true)}
                        full
                    />
                    <CheckBoxStyled
                        title={translate('vaccination.noField')}
                        checked={!hasDose1}
                        onPress={() => {
                            setHasDose1(false)
                            setDose1Date('')
                            setDose1({})
                            setHasDose2(false)
                            setDose2Date('')
                            setDose2({})
                        }}
                        full
                    />
                </FormInline>

                {hasDose1 ? (
                    <>
                        <FormInline>
                            <FormLabel>
                                {translate('vaccination.vaccine1Label')}
                            </FormLabel>
                            <DateSelector
                                placeholder={translate('vaccination.dateField')}
                                date={dose1Date}
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
                                onDateChange={(date) => setDose1Date(date)}
                            />
                        </FormInline>

                        <FormInline>
                            {vaccines.map((vaccine) => (
                                <FormInlineCheck>
                                    <CheckBoxStyled
                                        title={vaccine.name}
                                        checked={vaccine.name === dose1.name}
                                        onPress={() =>
                                            handleVaccine(vaccine, 'dose1')
                                        }
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
                    </>
                ) : null}

                {hasDose1 && dose1.doses > 1 ? (
                    <FormInline>
                        <FormLabel>
                            {translate('vaccination.question2Label')}
                        </FormLabel>
                        <CheckBoxStyled
                            title={translate('vaccination.yesField')}
                            checked={hasDose2}
                            onPress={() => setHasDose2(true)}
                            full
                        />
                        <CheckBoxStyled
                            title={translate('vaccination.noField')}
                            checked={!hasDose2}
                            onPress={() => {
                                setHasDose2(false)
                                setDose2Date('')
                                setDose2({})
                            }}
                            full
                        />
                    </FormInline>
                ) : null}

                {hasDose1 && hasDose2 ? (
                    <>
                        <FormInline>
                            <FormLabel>
                                {translate('vaccination.vaccine2Label')}
                            </FormLabel>
                            <DateSelector
                                placeholder={translate('vaccination.dateField')}
                                date={dose2Date}
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
                                onDateChange={(date) => setDose2Date(date)}
                            />
                        </FormInline>

                        <FormInline>
                            {vaccines.map((vaccine) => (
                                <FormInlineCheck>
                                    <CheckBoxStyled
                                        title={vaccine.name}
                                        checked={vaccine.name === dose2.name}
                                        onPress={() =>
                                            handleVaccine(vaccine, 'dose2')
                                        }
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
                    </>
                ) : null}

                <Button onPress={() => sendVaccination()}>
                    <SendContainer>
                        <SendText>Enviar</SendText>
                    </SendContainer>
                </Button>
            </KeyboardScrollView>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default Vacinacao
