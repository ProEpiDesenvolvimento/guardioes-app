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
    const [newDoseVaccine, setNewDoseVaccine] = useState({})
    const [doses, setDoses] = useState([])

    const mockData = [
        // {
        //     id: 1,
        //     user_id: 1,
        //     dose: 1,
        //     vaccine_id: 1,
        //     date: '2021-08-12',
        // },
        // {
        //     id: 2,
        //     user_id: 2,
        //     dose: 1,
        //     vaccine_id: 2,
        //     date: '2021-09-13',
        // },
        // {
        //     id: 3,
        //     user_id: 1,
        //     dose: 2,
        //     vaccine_id: 1,
        //     date: '2021-10-23',
        // },
        // {
        //     id: 4,
        //     user_id: 1,
        //     dose: 3,
        //     vaccine_id: 1,
        //     date: '2021-11-03',
        // },
        // {
        //     id: 5,
        //     user_id: 1,
        //     dose: 4,
        //     vaccine_id: 2,
        //     date: '2021-12-03',
        // },
    ]

    const initValues = async () => {
        const response = await getDoses(token)
        //console.log(response)

        // function isUserId(value) {
        //     return value.user_id === user.id
        // }

        setDoses(response.body)

        setNumberDoses(response.body.length + 1)

        if (response.body.length > 0) {
            setDose1Vaccine(response.body[0].vaccine_id)
            // if (doses.find((first) => first.dose === 1)) {
            //     const firstDose = doses.find((first) => first.dose === 1)

            //     const firstDoseDate = moment(new Date(firstDose.date)).format(
            //         'DD-MM-YYYY'
            //     )
            //     setDose1Date(firstDoseDate)

            //     // if (user.second_dose_date) {
            //     //     setHasDose2(true)

            //     //     const secondDoseDate = moment(
            //     //         new Date(user.second_dose_date)
            //     //     ).format('DD-MM-YYYY')
            //     //     setDose2Date(secondDoseDate)
            //     // }

            //     setDose1(firstDose.vaccine_id)
            // }
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

        if (numberDoses > vaccineSelected.doses)
            Alert.alert(`Essa vacina não possui ${numberDoses}ª dose.`)

        setModalAddDose(false)
        const doseDate = moment(newDoseDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
        // const secondDoseDate = moment(dose2Date, 'DD-MM-YYYY').format(
        //     'YYYY-MM-DD'
        // )

        const newDose = {
            date: doseDate,
            dose: numberDoses,
            vaccine_id: numberDoses === 2 ? dose1Vaccine : newDoseVaccine.id,
            user_id: user.id,
        }

        console.log(newDose)

        // const vaccination = {
        //     has_dose1: hasDose1,
        //     first_dose_date: hasDose1 ? firstDoseDate : null,
        //     has_dose2: hasDose2,
        //     second_dose_date: hasDose2 ? secondDoseDate : null,
        //     vaccine_id: hasDose1 ? dose1.id : null,
        // }

        // if (!validVaccination(vaccination)) return
        // setLoadingAlert(true)

        const response = await sendDose(newDose, token)

        if (response.status === 200) {
            setLoadingAlert(false)
            navigation.goBack()
        } else {
            console.warn(response)
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
                {/* <FormInline>
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
                        }}
                        full
                    />
                </FormInline> */}
                {/* {hasDose1 ? (
                    <>
                        <FormInline>
                            <FormLabel>
                                {translate('vaccination.vaccine1Label')}
                            </FormLabel>
                            <DateSelector
                                placeholder={translate('vaccination.dateField')}
                                date={moment(new Date(doses[0].date)).format(
                                    'DD-MM-YYYY'
                                )}
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
                                <FormInlineCheck key={vaccine.id}>
                                    <CheckBoxStyled
                                        title={vaccine.name}
                                        checked={
                                            vaccine.id === doses[0].vaccine_id
                                        }
                                        //onPress={() => handleVaccine(vaccine)}
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
                ) : null} */}
                {doses.length > 0 ? (
                    doses.map((item) => (
                        <>
                            <FormInline>
                                <FormLabel>
                                    {`Vacina da ${item.dose}ª dose`}
                                </FormLabel>
                                <DateSelector
                                    placeholder={translate(
                                        'vaccination.dateField'
                                    )}
                                    date={moment(new Date(item.date)).format(
                                        'DD-MM-YYYY'
                                    )}
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
                                    onDateChange={(date) =>
                                        setNewDoseDate(date)
                                    }
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
                <Modal // Modal View for Vaccine Info
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
                                        maxDate={moment().format('DD-MM-YYYY')}
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
