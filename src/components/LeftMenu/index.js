import React, { useState, useEffect } from 'react'
import { Linking, Platform, StyleSheet } from 'react-native'

import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Share from 'react-native-share'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Avatar } from 'react-native-elements'

import {
    ScrollViewStyled,
    Button,
    AvatarContainer,
    UserOptionGreen,
    UserOptionBlue,
    TextOption,
    Aplicativo,
    SocialContainer,
    RedeSocial,
} from './styles'

import translate from '../../../locales/i18n'
import { scale } from '../../utils/scalling'
import { getInitials, handleAvatar } from '../../utils/consts'
import { useUser } from '../../hooks/user'
import { getAppGroup } from '../../api/groups'

const LeftMenu = ({ navigation }) => {
    const {
        user,
        avatar,
        households,
        householdAvatars,
        signOut,
        setGroup,
    } = useUser()

    const [hasSurveillance, setHasSurveillance] = useState(false)
    let index = households.length

    const getActiveSurveillance = async () => {
        if (user.group_id) {
            const response = await getAppGroup(user.group_id)

            if (response.status === 200) {
                const { group } = response.data
                setGroup(group)

                if (group.group_manager.vigilance_email) {
                    setHasSurveillance(true)
                } else {
                    setHasSurveillance(false)
                }
            }
        } else {
            setHasSurveillance(false)
        }
    }

    useEffect(() => {
        getActiveSurveillance()
    }, [user.group_id])

    return (
        <ScrollViewStyled>
            <AvatarContainer>
                <Avatar
                    containerStyle={[styles.avatar, { zIndex: index-- }]}
                    size={scale(60)}
                    source={handleAvatar(avatar)}
                    title={getInitials(user.user_name)}
                    rounded
                />
                {households.map((household) => (
                    <Avatar
                        key={household.id}
                        containerStyle={[styles.avatars, { zIndex: index-- }]}
                        size={scale(60)}
                        source={handleAvatar(householdAvatars[household.id])}
                        title={getInitials(household.description)}
                        rounded
                    />
                ))}
            </AvatarContainer>

            {user.is_professional === true ? (
                <Button onPress={() => navigation.navigate('Rumor')}>
                    <UserOptionBlue>
                        <Feather
                            name='info'
                            size={scale(26)}
                            color='#ffffff'
                            style={styles.iconStyle}
                        />
                        <TextOption>
                            {translate('drawer.reportRumor')}
                        </TextOption>
                    </UserOptionBlue>
                </Button>
            ) : null}
            <Button onPress={() => navigation.navigate('Perfis')}>
                <UserOptionBlue>
                    <Feather
                        name='settings'
                        size={scale(26)}
                        color='#ffffff'
                        style={styles.iconStyle}
                    />
                    <TextOption>{translate('drawer.toEdit')}</TextOption>
                </UserOptionBlue>
            </Button>
            <Button onPress={() => signOut()}>
                <UserOptionBlue>
                    <Feather
                        name='log-out'
                        size={scale(26)}
                        color='#ffffff'
                        style={styles.iconStyle}
                    />
                    <TextOption>{translate('drawer.logOut')}</TextOption>
                </UserOptionBlue>
            </Button>

            <Aplicativo>{translate('drawer.app')}</Aplicativo>

            {hasSurveillance ? (
                <Button onPress={() => navigation.navigate('Vigilancia')}>
                    <UserOptionGreen>
                        <Feather
                            name='shield'
                            size={scale(26)}
                            color='#ffffff'
                            style={styles.iconStyle}
                        />
                        <TextOption>
                            {translate('drawer.toSurveillance')}
                        </TextOption>
                    </UserOptionGreen>
                </Button>
            ) : null}
            <Button onPress={() => navigation.navigate('Vacinacao')}>
                <UserOptionGreen>
                    <FontAwesome5
                        name='syringe'
                        size={scale(26)}
                        color='#ffffff'
                        style={styles.iconStyle}
                    />
                    <TextOption>{translate('drawer.toVaccination')}</TextOption>
                </UserOptionGreen>
            </Button>
            <Button onPress={() => navigation.navigate('Ajuda')}>
                <UserOptionGreen>
                    <Feather
                        name='help-circle'
                        size={scale(26)}
                        color='#ffffff'
                        style={styles.iconStyle}
                    />
                    <TextOption>{translate('drawer.toHelp')}</TextOption>
                </UserOptionGreen>
            </Button>
            <Button
                onPress={() => {
                    Share.open(shareOptions)
                        .then((res) => {
                            console.log(res)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }}
            >
                <UserOptionGreen>
                    <Feather
                        name='share-2'
                        size={scale(26)}
                        color='#ffffff'
                        style={styles.iconStyle}
                    />
                    <TextOption>{translate('drawer.share')}</TextOption>
                </UserOptionGreen>
            </Button>

            <SocialContainer>
                <Button
                    onPress={() =>
                        Linking.openURL('https://twitter.com/proepi_')
                    }
                >
                    <RedeSocial>
                        <SimpleLineIcons
                            name='social-twitter'
                            size={scale(28)}
                            color='#ffffff'
                            style={styles.iconRedeSocial}
                        />
                    </RedeSocial>
                </Button>
                <Button
                    onPress={() =>
                        Linking.openURL('https://www.instagram.com/redeproepi')
                    }
                >
                    <RedeSocial>
                        <SimpleLineIcons
                            name='social-instagram'
                            size={scale(28)}
                            color='#ffffff'
                            style={styles.iconRedeSocial}
                        />
                    </RedeSocial>
                </Button>
            </SocialContainer>
        </ScrollViewStyled>
    )
}

const shareOptions = {
    message: translate('drawer.shareLink'),
}

const styles = StyleSheet.create({
    avatar: {
        borderColor: '#ffffff',
        borderWidth: 3,
    },
    avatars: {
        marginLeft: scale(-20),
        borderColor: '#ffffff',
        borderWidth: 3,
    },
    iconStyle: {
        marginLeft: scale(5),
    },
    iconRedeSocial: {
        marginBottom: Platform.OS === 'ios' ? -3 : 0,
    },
})

export default LeftMenu
