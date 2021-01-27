import React, { useCallback, useState } from 'react'
import { StyleSheet } from 'react-native'

import Feather from 'react-native-vector-icons/Feather'
import { Avatar } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'

import ScreenLoader from '../../../components/ScreenLoader'
import {
    ScrollViewStyled,
    User,
    AvatarWrapper,
    InfoContainer,
    InfoWrapper,
    Name,
    Relation,
    ButtonsWrapper,
    Button,
    HouseholdWrapper,
    HouseholdTitle,
    Household,
    HouseholdName,
    HouseholdRelation,
} from './styles'

import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scallingUtils'
import { handleAvatar, getInitials } from '../../../utils/constUtils'
import { useUser } from '../../../hooks/user'
import { getUser } from '../../../api/user'

Feather.loadFont()

const Perfis = ({ navigation }) => {
    const {
        token,
        data,
        storeUserData,
        avatar,
        households,
        storeHouseholds,
        householdAvatars,
    } = useUser()

    const [isLoaded, setIsLoaded] = useState(false)

    useFocusEffect(
        useCallback(() => {
            getFullUser()
        }, [])
    )

    const getFullUser = async () => {
        const response = await getUser(data.id, token)

        if (response.status === 200) {
            storeHouseholds(response.body.user.households)
            storeUserData(response.body.user)

            setIsLoaded(true)
        }
    }

    const getUserInfo = () => {
        const bornDate = new Date()
        let birthDate = data.birthdate

        if (!data.birthdate) {
            bornDate.setFullYear(bornDate.getFullYear() - 13)
            birthDate = bornDate.toISOString()
        }

        return {
            ...data,
            is_household: false,
            name: data.user_name ? data.user_name : '',
            avatar,
            birthdate: birthDate,
        }
    }

    const getHouseholdInfo = (household) => {
        const bornDate = new Date()
        let birthDate = household.birthdate

        if (!household.birthdate) {
            bornDate.setFullYear(bornDate.getFullYear() - 13)
            birthDate = bornDate.toISOString()
        }

        return {
            ...household,
            is_household: true,
            name: household.description ? household.description : '',
            avatar: householdAvatars[household.id],
            birthdate: birthDate,
        }
    }

    if (!isLoaded) {
        return <ScreenLoader />
    }

    return (
        <ScrollViewStyled>
            <User>
                <AvatarWrapper>
                    <Avatar
                        containerStyle={styles.Avatar}
                        size={scale(58)}
                        source={handleAvatar(avatar)}
                        title={getInitials(data.user_name)}
                        rounded
                    />
                </AvatarWrapper>
                <InfoContainer>
                    <InfoWrapper>
                        <Name>{data.user_name}</Name>
                        <Relation>{translate('profiles.owner')}</Relation>
                    </InfoWrapper>
                    <ButtonsWrapper>
                        <Button
                            onPress={() => {
                                navigation.navigate('EditarPerfil', {
                                    is_user: true,
                                    data: getUserInfo(),
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
            </User>

            {households.length > 0 ? (
                <HouseholdWrapper>
                    <HouseholdTitle>
                        {translate('profiles.households')}
                    </HouseholdTitle>
                </HouseholdWrapper>
            ) : null}

            {households.map((household) => {
                return (
                    <Household key={household.id}>
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
                                <HouseholdName>
                                    {household.description}
                                </HouseholdName>
                                <HouseholdRelation>
                                    {household.kinship}
                                </HouseholdRelation>
                            </InfoWrapper>
                            <ButtonsWrapper>
                                <Button
                                    onPress={() => {
                                        navigation.navigate('EditarPerfil', {
                                            is_user: false,
                                            data: getHouseholdInfo(household),
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
                    </Household>
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
