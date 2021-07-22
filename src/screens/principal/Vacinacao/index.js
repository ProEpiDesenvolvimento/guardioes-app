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

    const [vaccinated, setIsVaccinated] = useState(false)
    const [vaccines, setVaccines] = useState([])
    const [shot1, setShot1] = useState({})
    const [shot2, setShot2] = useState({})

    const [loadingAlert, setLoadingAlert] = useState(false)

    const getVaccines = async () => {
        const response = [
            {
                name: 'Astrazeneca',
                doses: 2,
            },
            {
                name: 'Pfizer',
                doses: 2,
            },
        ]

        // const response = await getForm(group.form_id, token)

        // if (response.status === 200) {
        // const { form } = response.body
        setVaccines(response)
        setIsLoading(false)
        // }
    }

    const handleVaccine = (vaccine, shotType) => {
        if (shotType === 'shot1') {
            setShot1(vaccine)
        } else if (shotType === 'shot2') {
            setShot2(vaccine)
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
                    <FormLabel>Você foi vacinado contra a COVID-19?</FormLabel>
                    <CheckBoxStyled
                        title='Sim'
                        checked={vaccinated}
                        onPress={() => setIsVaccinated(true)}
                        full
                    />
                    <CheckBoxStyled
                        title='Não'
                        checked={!vaccinated}
                        onPress={() => setIsVaccinated(false)}
                        full
                    />
                </FormInline>

                {vaccinated ? (
                    <>
                        <FormInline>
                            <FormLabel>Vacina da 1º dose:</FormLabel>

                            <DateSelector
                                placeholder='Data'
                                // date={birth}
                                format='DD-MM-YYYY'
                                minDate='01-01-1918'
                                maxDate={moment()
                                    .subtract(13, 'years')
                                    .format('DD-MM-YYYY')}
                                locale='pt-BR'
                                confirmBtnText={translate(
                                    'birthDetails.confirmButton'
                                )}
                                cancelBtnText={translate(
                                    'birthDetails.cancelButton'
                                )}
                                onDateChange={(date) => console.log(date)}
                            />
                        </FormInline>

                        <FormInline>
                            {vaccines.map((vaccine) => (
                                <FormInlineCheck>
                                    <CheckBoxStyled
                                        title={vaccine.name}
                                        checked={vaccine.name === shot1.name}
                                        onPress={() =>
                                            handleVaccine(vaccine, 'shot1')
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
