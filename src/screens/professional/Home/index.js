/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, Text, StyleSheet, Alert } from 'react-native'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Avatar } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'

import ScreenLoader from '../../../components/ScreenLoader'
import UserTip from '../../../components/UserTip'
import { CoolAlert } from '../../../components/CoolAlert'
import {
    Container,
    ScrollViewStyled,
    Background,
    MenuBars,
    UserView,
    NamesContainer,
    TextName,
    AppName,
    StatusContainer,
    TextStyle,
    StatusBemMal,
    StatusText,
    Report,
    Tips,
    TipButton,
} from './styles'

import translate from '../../../locales/i18n'
import {
    terms,
    getNameParts,
    handleAvatar,
    getInitials,
} from '../../../utils/consts'
import { Emojis } from '../../../img/imageConst'
import { scale } from '../../../utils/scalling'
import { useUser } from '../../../hooks/user'
import { updateUser } from '../../../api/user'

const Home = ({ navigation }) => {
    const {
        isLoading,
        isOffline,
        signOut,
        token,
        user,
        storeUser,
        getCurrentLocation,
        group,
        getAppTip,
        hideAppTip,
        loadSecondaryData,
        getCurrentUserInfo,
    } = useUser()

    const [showTermsConsent, setShowTermsConsent] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showProgressBar, setShowProgressBar] = useState(false)
    const [alertTitle, setAlertTitle] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)

    const person = getCurrentUserInfo()

    useEffect(() => {
        if (!isLoading) {
            fetchData()
        }
    }, [isLoading])

    useEffect(() => {
        showOfflineAlert(isOffline)
    }, [isOffline])

    const fetchData = async () => {
        await loadSecondaryData()

        verifyUserTermsConsent()
        getCurrentLocation()
    }

    const verifyUserTermsConsent = () => {
        const currentPolicyTerms = terms.version
        const userPolicyTerms = user.policy_version

        if (userPolicyTerms < currentPolicyTerms) {
            setShowTermsConsent(true)
        }
    }

    const updateUserTermsConsent = async () => {
        setShowTermsConsent(false)

        const policy = {
            policy_version: terms.version,
        }

        const response = await updateUser({ user: policy }, user.id, token)

        if (response.status === 200) {
            console.warn(response.status)
            storeUser(response.data.user)
        }
    }

    const showTermsPolicy = () => {
        Alert.alert(
            terms.title,
            terms.text,
            [
                {
                    text: terms.disagree,
                    onPress: () => signOut(),
                    style: 'cancel',
                },
                {
                    text: terms.agree,
                    onPress: () => updateUserTermsConsent(),
                },
            ],
            { cancelable: false }
        )
    }

    const showOfflineAlert = (show) => {
        if (show) {
            setAlertTitle(
                <Text>
                    {translate('home.offlineTitle')} {Emojis.cloud}
                </Text>
            )
            setAlertMessage(
                `${translate('home.offlineMessage')}\n${translate(
                    'home.offlineMessage2'
                )}`
            )
            setShowAlert(true)
        } else {
            setShowAlert(false)
        }
    }

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#348EAC' }} />
            <StatusBar backgroundColor='#348EAC' barStyle='light-content' />
            <Container>
                <ScrollViewStyled>
                    <Background>
                        <UserView>
                            <MenuBars onPress={() => navigation.openDrawer()}>
                                <SimpleLineIcons
                                    name='menu'
                                    size={26}
                                    color='#ffffff'
                                />
                            </MenuBars>

                            <NamesContainer>
                                <TextName>
                                    {translate('home.hello') +
                                        getNameParts(person.name)}
                                </TextName>
                                <AppName>Líder Comunitário</AppName>
                            </NamesContainer>
                            <Avatar
                                containerStyle={styles.avatar}
                                size={scale(58)}
                                source={handleAvatar(person.avatar)}
                                title={getInitials(person.name)}
                                activeOpacity={0.5}
                                rounded
                            />
                        </UserView>
                    </Background>

                    <StatusContainer>
                        <TextStyle>Deseja reportar um sinal hoje?</TextStyle>
                        <StatusBemMal>
                            <Report
                                disabled={isOffline}
                                onPress={() =>
                                    navigation.navigate('EventoForm')
                                }
                            >
                                <StatusText>Reportar</StatusText>
                            </Report>
                        </StatusBemMal>
                    </StatusContainer>

                    <Tips>{translate('home.alerts')}</Tips>

                    <TipButton
                        onPress={() => navigation.navigate('EventoAnswers')}
                    >
                        <UserTip
                            icon={
                                <Feather
                                    name='alert-circle'
                                    size={scale(46)}
                                    color='#ffffff'
                                />
                            }
                            title='Sinais:'
                            message='Veja os Sinais de Alerta já reportados'
                        />
                    </TipButton>
                </ScrollViewStyled>

                <CoolAlert
                    show={showTermsConsent}
                    title={translate('useTerms.consentTitle')}
                    message={translate('useTerms.consentMessage')}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton
                    confirmText={translate('useTerms.seeTerms')}
                    onConfirmPressed={() => showTermsPolicy()}
                />
                <CoolAlert
                    show={showAlert}
                    showProgress={showProgressBar}
                    title={
                        showProgressBar
                            ? translate('badReport.messages.sending')
                            : alertTitle
                    }
                    message={alertMessage}
                    closeOnTouchOutside={!showProgressBar}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={!showProgressBar}
                    confirmText={translate('badReport.messages.confirmText')}
                    onConfirmPressed={() => setShowAlert(false)}
                    onDismiss={() => setShowAlert(false)}
                />
            </Container>
        </>
    )
}

const styles = StyleSheet.create({
    avatar: {
        marginRight: `${scale(8)}%`,
        borderColor: '#ffffff',
        borderWidth: 3,
    },
    avatarDot: {
        height: scale(14),
        width: scale(14),
        backgroundColor: '#ffffff',
        left: 0,
        shadowOpacity: 0,
    },
})

export default Home
