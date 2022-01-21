import React, { useCallback, useRef, useState } from 'react'
import { Alert, BackHandler, SafeAreaView } from 'react-native'

import Feather from 'react-native-vector-icons/Feather'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { useFocusEffect } from '@react-navigation/native'

import {
    GradientBackground,
    KeyboardScrollView,
    ButtonBack,
    SnowInput,
    Touch,
    SnowButton,
    Label,
} from '../../../components/SnowForms'
import { ScreenView, PageTitle, LabelWrapper, TextLabel } from './styles'

import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import { CoolAlert } from '../../../components/CoolAlert'
import { PasswordIcon } from '../../../img/imageConst'
import { sendCode, confirmCode, resetPassword } from '../../../api/user'

const ForgetPwd = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [slideIndex, setSlideIndex] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const [showProgressBar, setShowProgressBar] = useState(false)

    const passwordInput = useRef()
    const swiper = useRef()

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener(
                'hardwareBackPress',
                goToPreviousScreen
            )

            return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    goToPreviousScreen
                )
        }, [slideIndex])
    )

    const showLoadingAlert = () => {
        setShowAlert(true)
        setShowProgressBar(true)
    }

    const goToPreviousScreen = () => {
        if (slideIndex === 0) {
            navigation.goBack()
            return true
        }
        const newSlideIndex = slideIndex - 1

        swiper.current.scrollToIndex({ index: newSlideIndex })
        setSlideIndex(newSlideIndex)

        return true
    }

    const goToNextScreen = () => {
        const newSlideIndex = slideIndex + 1

        swiper.current.scrollToIndex({ index: newSlideIndex })
        setSlideIndex(newSlideIndex)
    }

    const sendUserToken = async () => {
        showLoadingAlert()

        const response = await sendCode({ email })

        if (response.status === 200) {
            console.warn(response)
            goToNextScreen()
            setShowAlert(false)
        } else {
            console.warn(response)
            Alert.alert(
                translate('forgetPwd.invalidEmail'),
                translate('forgetPwd.tryAgain')
            )
            setShowAlert(false)
        }
    }

    const confirmUserToken = async () => {
        if (code === '') {
            Alert.alert(
                translate('getToken.errorMessages.verificationCodeBlank')
            )
            return
        }

        showLoadingAlert()

        const response = await confirmCode({ code })

        if (response.status === 200) {
            setToken(response.data.reset_password_token)
            goToNextScreen()
            setShowAlert(false)
        } else {
            Alert.alert(translate('getToken.invalidCode'))
            setShowAlert(false)
        }
    }

    const handleResetPassword = async () => {
        if (password.length < 8 || confirmPassword.length < 8) {
            Alert.alert(translate('changePwd.errorMessages.shortPwd'))
            return
        }

        showLoadingAlert()

        const reset = {
            reset_password_token: token,
            password,
            password_confirmation: confirmPassword,
        }

        const response = await resetPassword(reset)

        if (response.status === 200) {
            Alert.alert(translate('forgetPwd.passwordChanged'))
            setShowAlert(false)
            navigation.navigate('Login')
        } else {
            Alert.alert(
                translate('forgetPwd.differentsPass'),
                translate('forgetPwd.tryAgain')
            )
            setShowAlert(false)
        }
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#5DD39E' }} />
            <GradientBackground>
                <KeyboardScrollView>
                    <SwiperFlatList
                        showPagination={false}
                        disableGesture
                        ref={swiper}
                    >
                        <ScreenView>
                            <PasswordIcon
                                height={scale(68)}
                                width={scale(68)}
                                fill='#ffffff'
                            />

                            <PageTitle>
                                {translate('forgetPwd.title')}
                            </PageTitle>

                            <LabelWrapper>
                                <TextLabel>
                                    {translate('forgetPwd.informEmail')}
                                </TextLabel>
                            </LabelWrapper>

                            <SnowInput
                                placeholder={translate('login.email')}
                                returnKeyType='next'
                                keyboardType='email-address'
                                maxLength={100}
                                onChangeText={(text) => setEmail(text)}
                                onSubmitEditing={() => sendUserToken()}
                            />

                            <Touch
                                onPress={() =>
                                    // console.warn(email)
                                    // goToNextScreen()
                                    sendUserToken()
                                }
                            >
                                <SnowButton>
                                    <Label>
                                        {translate('forgetPwd.sendButton')}
                                    </Label>
                                </SnowButton>
                            </Touch>
                        </ScreenView>

                        <ScreenView>
                            <PageTitle>{translate('getToken.title')}</PageTitle>

                            <LabelWrapper>
                                <TextLabel>
                                    {translate('getToken.verificationCodeSent')}
                                </TextLabel>
                            </LabelWrapper>

                            <LabelWrapper>
                                <TextLabel>
                                    {translate('getToken.spamCheckWarning')}
                                </TextLabel>
                            </LabelWrapper>

                            <SnowInput
                                placeholder={translate(
                                    'getToken.inputVerificationCode'
                                )}
                                autoCorrect={false}
                                maxLength={10}
                                onChangeText={(text) => setCode(text)}
                                onSubmitEditing={() => confirmUserToken()}
                            />

                            <Touch
                                onPress={() =>
                                    // goToNextScreen()
                                    confirmUserToken()
                                }
                            >
                                <SnowButton>
                                    <Label>
                                        {translate('getToken.confirm')}
                                    </Label>
                                </SnowButton>
                            </Touch>
                        </ScreenView>

                        <ScreenView>
                            <PageTitle>
                                {translate('changePwd.title')}
                            </PageTitle>

                            <SnowInput
                                placeholder={translate('changePwd.newPwd')}
                                autoCorrect={false}
                                secureTextEntry
                                returnKeyType='next'
                                maxLength={100}
                                onChangeText={(text) => setPassword(text)}
                                onSubmitEditing={() =>
                                    passwordInput.current.focus()
                                }
                            />

                            <SnowInput
                                placeholder={translate('changePwd.confirmPwd')}
                                autoCorrect={false}
                                secureTextEntry
                                returnKeyType='next'
                                maxLength={100}
                                ref={passwordInput}
                                onChangeText={(text) =>
                                    setConfirmPassword(text)
                                }
                                onSubmitEditing={() => handleResetPassword()}
                            />

                            <Touch
                                onPress={() =>
                                    // console.log(token)
                                    handleResetPassword()
                                }
                            >
                                <SnowButton>
                                    <Label>
                                        {translate('changePwd.changeButton')}
                                    </Label>
                                </SnowButton>
                            </Touch>
                        </ScreenView>
                    </SwiperFlatList>

                    <ButtonBack onPress={() => goToPreviousScreen()}>
                        <Feather
                            name='chevron-left'
                            size={scale(40)}
                            color='#ffffff'
                        />
                    </ButtonBack>
                </KeyboardScrollView>

                <CoolAlert
                    show={showAlert}
                    showProgress={showProgressBar}
                    title={
                        showProgressBar ? translate('getToken.loading') : null
                    }
                    closeOnTouchOutside={!showProgressBar}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={!showProgressBar}
                />
            </GradientBackground>
        </>
    )
}

export default ForgetPwd
