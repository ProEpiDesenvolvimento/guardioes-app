import React, { useEffect, useState } from 'react'

import { Avatar } from 'react-native-elements'

import ScreenLoader from '../../../components/ScreenLoader'
import { FormInline } from '../../../components/NormalForms'
import {
    ScrollViewStyled,
    CardWhite,
    CardNameWhite,
    CardDetailsWhite,
    AvatarWrapper,
    NumWrapper,
    NumText,
    InfoContainer,
    InfoWrapper,
} from '../../../components/Cards'

import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import { getNameParts, handleAvatar, getInitials } from '../../../utils/consts'
import { useUser } from '../../../hooks/user'
import { getUsersRanking } from '../../../api/user'

const Ranking = ({ navigation }) => {
    const { token, user, avatar } = useUser()

    const [ranking, setRanking] = useState([])
    const [userPosition, setUserPosition] = useState(0)

    const [isLoading, setIsLoading] = useState(true)

    const getRanking = async () => {
        const response = await getUsersRanking(token)

        if (response.status === 200) {
            setRanking(response.data.users)

            setIsLoading(false)
        }
    }

    const getUserColor = (position) => {
        switch (position) {
            case 1:
                return '#5dd39e'
            case 2:
                return '#348eac'
            case 3:
                return '#F18F01'
            default:
                return '#aaa'
        }
    }

    const getUserPosition = () => {
        const position = ranking.findIndex((item) => item.id === user.id)

        if (position !== -1) {
            setUserPosition(position + 1)
        } else {
            setUserPosition(0)
        }
    }

    useEffect(() => {
        getUserPosition()
    }, [ranking])

    useEffect(() => {
        getRanking()
    }, [])

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <ScrollViewStyled>
            <FormInline>
                <Avatar
                    size={scale(110)}
                    source={handleAvatar(avatar)}
                    title={getInitials(user.user_name)}
                    activeOpacity={0.5}
                    showEditButton
                    rounded
                    editButton={{
                        name: 'award',
                        type: 'feather',
                        color: '#ffffff',
                        underlayColor: getUserColor(userPosition),
                    }}
                />
            </FormInline>

            {ranking.map((person, index) => {
                return (
                    <CardWhite key={person.id}>
                        <AvatarWrapper>
                            <NumWrapper>
                                <NumText>{index + 1}.</NumText>
                            </NumWrapper>

                            <Avatar
                                size={scale(58)}
                                source={handleAvatar(null)}
                                title={getInitials(person.user_name)}
                                activeOpacity={0.5}
                                showEditButton
                                rounded
                                editButton={{
                                    name: 'award',
                                    type: 'feather',
                                    color: '#ffffff',
                                    style: {
                                        backgroundColor: getUserColor(
                                            index + 1
                                        ),
                                    },
                                }}
                            />
                        </AvatarWrapper>

                        <InfoContainer>
                            <InfoWrapper>
                                <CardNameWhite>
                                    {getNameParts(person.user_name, true)}
                                </CardNameWhite>
                                <CardDetailsWhite>
                                    {person.streak === 1
                                        ? person.streak +
                                          translate('diary.day') +
                                          translate('diary.consecutive')
                                        : person.streak +
                                          translate('diary.days') +
                                          translate('diary.consecutive')}
                                </CardDetailsWhite>
                            </InfoWrapper>
                        </InfoContainer>
                    </CardWhite>
                )
            })}
        </ScrollViewStyled>
    )
}

export default Ranking
