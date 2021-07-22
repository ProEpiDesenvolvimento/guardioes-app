import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'

import ScreenLoader from '../../../components/ScreenLoader'
import {
    Container,
    KeyboardScrollView,
    FormInline,
    FormLabel,
    DateSelector,
    FormInlineCheck,
    CheckBoxStyled,
    CheckLabel,
    Button,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'

import LoadingModal from '../../../components/Groups/LoadingModal'
import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import { useUser } from '../../../hooks/user'

Feather.loadFont()

const Vacinacao = ({ navigation }) => {
    const { token, user } = useUser()

    const [isLoading, setIsLoading] = useState(true)

    const [vaccines, setVaccines] = useState([])
    const [hasDose1, setHasDose1] = useState(false)
    const [hasDose2, setHasDose2] = useState(false)
    const [dose1Date, setDose1Date] = useState('')
    const [dose2Date, setDose2Date] = useState('')
    const [dose1, setDose1] = useState({})
    const [dose2, setDose2] = useState({})

    const [loadingAlert, setLoadingAlert] = useState(false)

    const getVaccines = async () => {
        const response = [
            {
                name: 'Astrazeneca',
                doses: 2,
            },
            {
                name: 'Janssen',
                doses: 1,
            },
        ]

        // const response = await getForm(group.form_id, token)

        // if (response.status === 200) {
        // const { form } = response.body
        setVaccines(response)
        setIsLoading(false)
        // }
    }

    const handleVaccine = (vaccine, doseType) => {
        if (doseType === 'dose1') {
            setDose1(vaccine)
        } else if (doseType === 'dose2') {
            setDose2(vaccine)
        }
    }

    const sendVaccinationForm = async () => {
        const lastFormDate = new Date()
        lastFormDate.setHours(0, 0, 0, 0)
    }

    useEffect(() => {
        getVaccines()
    }, [])

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <Container>
            <KeyboardScrollView keyboardShouldPersistTaps='always'>
                <FormInline>
                    <FormLabel>
                        Você já recebeu a 1ª dose da vacina contra a COVID-19?
                    </FormLabel>
                    <CheckBoxStyled
                        title='Sim'
                        checked={hasDose1}
                        onPress={() => setHasDose1(true)}
                        full
                    />
                    <CheckBoxStyled
                        title='Não'
                        checked={!hasDose1}
                        onPress={() => setHasDose1(false)}
                        full
                    />
                </FormInline>

                {hasDose1 ? (
                    <>
                        <FormInline>
                            <FormLabel>Vacina da 1º dose (ou única):</FormLabel>
                            <DateSelector
                                placeholder='Data'
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
                                        onPress={() => console.log('Foi')}
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
                            Você já recebeu a 2ª dose da vacina contra a COVID-19?
                        </FormLabel>
                        <CheckBoxStyled
                            title='Sim'
                            checked={hasDose2}
                            onPress={() => setHasDose2(true)}
                            full
                        />
                        <CheckBoxStyled
                            title='Não'
                            checked={!hasDose2}
                            onPress={() => setHasDose2(false)}
                            full
                        />
                    </FormInline>
                ) : null}

                {hasDose1 && hasDose2 ? (
                    <>
                        <FormInline>
                            <FormLabel>Vacina da 2º dose:</FormLabel>
                            <DateSelector
                                placeholder='Data'
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
                                        onPress={() => console.log('Foi')}
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

                <Button onPress={() => sendVaccinationForm()}>
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
