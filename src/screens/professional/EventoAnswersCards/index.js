import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import Feather from 'react-native-vector-icons/Feather'

import ScreenLoader from '../../../components/ScreenLoader'
import {
    ScrollViewStyled,
    CardWrapper,
    CardTitle,
    CardWhite,
    CardNameWhite,
    CardDetailsWhite,
    InfoContainer,
    InfoWrapper,
    ButtonsWrapper,
    Button,
} from '../../../components/Cards'

import translate from '../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import { useUser } from '../../../hooks/user'
import { getFlexibleAnswers } from '../../../api/events'

const EventoAnswersCards = ({ navigation }) => {
    const { isOffline, token, storeCacheData, getCacheData } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [flexibleAnswers, setFlexibleAnswers] = useState([])
    const [groupedAnswers, setGroupedAnswers] = useState({})

    const getGroupedAnswers = (answers) => {
        const groupAnswers = answers.reduce((acc, answer) => {
            const status =
                answer.external_system_data?._embedded?.signals[0].dados
                    .signal_stage_state_id[1] || 'Sem status'
            if (!acc[status]) {
                acc[status] = []
            }
            acc[status].push(answer)
            return acc
        }, {})

        setGroupedAnswers(groupAnswers)
    }

    const getAllFlexibleAnswers = async () => {
        if (!isOffline) {
            const response = await getFlexibleAnswers(token)

            if (response.status === 200) {
                const appFlexibleAnswers = response.data.flexible_answers

                const parsedAnswers = appFlexibleAnswers.map((answer) => {
                    const parsedData = JSON.parse(answer.data)
                    return {
                        ...answer,
                        data: parsedData,
                    }
                })

                storeCacheData('flexibleAnswers', parsedAnswers)
                setFlexibleAnswers(parsedAnswers)
                getGroupedAnswers(parsedAnswers)
            }
            setIsLoading(false)
        } else {
            const parsedAnswers = await getCacheData('flexibleAnswers', false)

            if (parsedAnswers) {
                setFlexibleAnswers(parsedAnswers)
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        getAllFlexibleAnswers()
    }, [])

    useEffect(() => {
        if (isOffline) {
            Alert.alert(
                'Sem conexão com a Internet!',
                'Será mostrada a última lista armazenada no aplicativo.'
            )
        }
    }, [isOffline])

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <ScrollViewStyled>
            {flexibleAnswers.length > 0 ? (
                <CardWrapper>
                    <CardTitle>Registros por status</CardTitle>
                </CardWrapper>
            ) : null}

            {Object.keys(groupedAnswers).map((key) => {
                return (
                    <CardWhite key={key}>
                        <InfoContainer>
                            <InfoWrapper>
                                <CardNameWhite>{key}</CardNameWhite>
                                <CardDetailsWhite>
                                    {groupedAnswers[key].length} registros
                                </CardDetailsWhite>
                            </InfoWrapper>
                            <ButtonsWrapper>
                                <Button
                                    onPress={() => {
                                        navigation.navigate('EventoAnswers', {
                                            status: key,
                                            flexibleAnswers:
                                                groupedAnswers[key],
                                        })
                                    }}
                                >
                                    <Feather
                                        name='chevron-right'
                                        size={scale(25)}
                                        color='#348EAC'
                                    />
                                </Button>
                            </ButtonsWrapper>
                        </InfoContainer>
                    </CardWhite>
                )
            })}
        </ScrollViewStyled>
    )
}

export default EventoAnswersCards
