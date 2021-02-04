import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'
import { Avatar } from 'react-native-elements'

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
import { scale } from '../../../utils/scalling'
import { handleAvatar, getInitials } from '../../../utils/consts'
import { useUser } from '../../../hooks/user'
import { getUser } from '../../../api/user'

Feather.loadFont()

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

    const [isLoaded, setIsLoaded] = useState(true)

    useEffect(() => {
        getFullUser()
    }, [])

    const getFullUser = async () => {
        const response = await getUser(user.id, token)

        if (response.status === 200) {
            storeHouseholds(response.body.user.households)
            storeUser(response.body.user)

            setIsLoaded(true)
        }
    }

    const getUserInfo = () => {
        const bornDate = new Date()
        let birthDate = ''

        if (!user.birthdate) {
            bornDate.setFullYear(bornDate.getFullYear() - 13)
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
        }
    }

    const getHouseholdInfo = (household) => {
        const bornDate = new Date()
        let birthDate = ''

        if (!household.birthdate) {
            bornDate.setFullYear(bornDate.getFullYear() - 13)
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
                        title={getInitials(user.user_name)}
                        rounded
                    />
                </AvatarWrapper>
                <InfoContainer>
                    <InfoWrapper>
                        <Name>{user.user_name}</Name>
                        <Relation>{translate('profiles.owner')}</Relation>
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
