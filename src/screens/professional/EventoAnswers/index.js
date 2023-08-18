import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'
import { Avatar } from 'react-native-elements'

import ScreenLoader from '../../../components/ScreenLoader'
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
    Button,
} from '../../../components/Cards'

import translate from '../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import { getInitials } from '../../../utils/consts'
import { useUser } from '../../../hooks/user'
import { getFlexibleAnswers } from '../../../api/events'

const EventoAnswers = ({ navigation }) => {
    const { token, user } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [flexibleAnswers, setFlexibleAnswers] = useState([])

    const getEventLocation = (event) => {
        if (event.data) {
            const location = event.data.find(
                (question) => question.field === 'evento_local_ocorrencia'
            )
            if (location) {
                return location.value
            }
            return 'S/L'
        }
        return 'S/L'
    }

    const getAllFlexibleAnswers = async () => {
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

            setFlexibleAnswers(parsedAnswers)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getAllFlexibleAnswers()
    }, [])

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <ScrollViewStyled>
            {flexibleAnswers.length > 0 ? (
                <CardWrapper>
                    <CardTitle>Registros</CardTitle>
                </CardWrapper>
            ) : null}

            {flexibleAnswers.map((answer) => {
                return (
                    <CardWhite key={answer.id}>
                        <InfoContainer>
                            <InfoWrapper>
                                <CardNameWhite>
                                    {getEventLocation(answer)}
                                </CardNameWhite>
                                <CardDetailsWhite>
                                    {moment(answer.created_at).format(
                                        'DD/MM/YYYY'
                                    )}
                                </CardDetailsWhite>
                            </InfoWrapper>
                            <ButtonsWrapper>
                                <Button
                                    onPress={() => {
                                        navigation.navigate('EventoAnswer', {
                                            id: answer.id,
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

const styles = StyleSheet.create({
    Avatar: {
        borderColor: '#ffffff',
        borderWidth: 3,
    },
})

export default EventoAnswers
