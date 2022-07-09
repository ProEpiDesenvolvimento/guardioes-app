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
    CardBlue,
    CardWhite,
    CardNameBlue,
    CardNameWhite,
    CardDetailsBlue,
    CardDetailsWhite,
    AvatarWrapper,
    InfoContainer,
    InfoWrapper,
    ButtonsWrapper,
    Button,
} from '../../../components/Cards'

import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import { handleAvatar, getInitials } from '../../../utils/consts'
import { useUser } from '../../../hooks/user'
import { getUser } from '../../../api/user'

const Perfis = ({ navigation }) => {
    const {
        token,
        user,
        storeUser,
        avatar,
        households,
        storeHouseholds,
        householdAvatars,
    } = useUser()

    const [isLoading, setIsLoading] = useState(true)

    const getFullUser = async () => {
        const response = await getUser(user.id, token)

        if (response.status === 200) {
            storeHouseholds(response.data.user.households)
            storeUser(response.data.user)

            setIsLoading(false)
        }
    }

    const getUserInfo = () => {
        const bornDate = new Date()
        let birthDate = ''

        if (!user.birthdate) {
            bornDate.setFullYear(bornDate.getFullYear() - 12)
            birthDate = moment(new Date(bornDate)).format('DD-MM-YYYY')
        } else {
            birthDate = moment(new Date(user.birthdate)).format('DD-MM-YYYY')
        }

        return {
            ...user,
            is_household: false,
            name: user.user_name ? user.user_name : '',
            avatar,
            birthdate: birthDate,
            category: {
                key: user.category ? user.category.id : null,
                label: user.category ? user.category.name : null,
            },
        }
    }

    const getHouseholdInfo = (household) => {
        const bornDate = new Date()
        let birthDate = ''

        if (!household.birthdate) {
            bornDate.setFullYear(bornDate.getFullYear() - 12)
            birthDate = moment(new Date(bornDate)).format('DD-MM-YYYY')
        } else {
            birthDate = moment(new Date(household.birthdate)).format(
                'DD-MM-YYYY'
            )
        }

        return {
            ...household,
            is_household: true,
            name: household.description ? household.description : '',
            avatar: householdAvatars[household.id],
            birthdate: birthDate,
            category: {
                key: household.category ? household.category.id : null,
                label: household.category ? household.category.name : null,
            },
        }
    }

    useEffect(() => {
        getFullUser()
    }, [])

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <ScrollViewStyled>
            <CardBlue>
                <AvatarWrapper>
                    <Avatar
                        containerStyle={styles.Avatar}
                        size={scale(58)}
                        source={handleAvatar(avatar)}
                        title={getInitials(user.user_name)}
                        rounded
                    />
                </AvatarWrapper>
                <InfoContainer>
                    <InfoWrapper>
                        <CardNameBlue>{user.user_name}</CardNameBlue>
                        <CardDetailsBlue>
                            {translate('profiles.owner')}
                        </CardDetailsBlue>
                    </InfoWrapper>
                    <ButtonsWrapper>
                        <Button
                            onPress={() => {
                                navigation.navigate('EditarPerfil', {
                                    person: getUserInfo(),
                                })
                            }}
                        >
                            <Feather
                                name='edit'
                                size={scale(25)}
                                color='#ffffff'
                            />
                        </Button>
                    </ButtonsWrapper>
                </InfoContainer>
            </CardBlue>

            {households.length > 0 ? (
                <CardWrapper>
                    <CardTitle>{translate('profiles.households')}</CardTitle>
                </CardWrapper>
            ) : null}

            {households.map((household) => {
                return (
                    <CardWhite key={household.id}>
                        <AvatarWrapper>
                            <Avatar
                                size={scale(58)}
                                source={handleAvatar(
                                    householdAvatars[household.id]
                                )}
                                title={getInitials(household.description)}
                                rounded
                            />
                        </AvatarWrapper>
                        <InfoContainer>
                            <InfoWrapper>
                                <CardNameWhite>
                                    {household.description}
                                </CardNameWhite>
                                <CardDetailsWhite>
                                    {household.kinship}
                                </CardDetailsWhite>
                            </InfoWrapper>
                            <ButtonsWrapper>
                                <Button
                                    onPress={() => {
                                        navigation.navigate('EditarPerfil', {
                                            person: getHouseholdInfo(household),
                                        })
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

export default Perfis
