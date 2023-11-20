import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import moment from 'moment'

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
import { getFlexibleAnswers } from '../../../api/flexibleForms'

const SignalAnswersFiltered = ({ navigation, route }) => {
    const { status, flexibleAnswers } = route.params

    const getEventLocation = (event) => {
        if (event.data) {
            const location = event.data.answers?.find(
                (question) => question.field === 'evento_local_ocorrencia'
            )
            if (location) {
                return location.value
            }
            return 'S/L'
        }
        return 'S/L'
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
                                <CardDetailsWhite>
                                    Status:{' '}
                                    {answer.external_system_data?._embedded
                                        ?.signals[0].dados
                                        .signal_stage_state_id[1] ||
                                        'Sem status'}
                                </CardDetailsWhite>
                            </InfoWrapper>
                            {!answer.is_offline ? (
                                <ButtonsWrapper>
                                    <Button
                                        onPress={() => {
                                            console.log(answer.id)
                                            navigation.navigate(
                                                'SignalAnswer',
                                                {
                                                    answer,
                                                }
                                            )
                                        }}
                                    >
                                        <Feather
                                            name='chevron-right'
                                            size={scale(25)}
                                            color='#348EAC'
                                        />
                                    </Button>
                                </ButtonsWrapper>
                            ) : null}
                        </InfoContainer>
                    </CardWhite>
                )
            })}
        </ScrollViewStyled>
    )
}

export default SignalAnswersFiltered
