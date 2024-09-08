import React, { useRef, useState } from 'react'
import { Alert } from 'react-native'

import {
    Container,
    KeyboardScrollView,
    FormInline,
    FormLabel,
    NormalInput,
    SendContainer,
    SendText,
    Button,
} from '../../../components/NormalForms'

import LoadingModal from '../../../components/LoadingModal'
import translate from '../../../locales/i18n'
import { useUser } from '../../../hooks/user'
import { changePassword } from '../../../api/user'

const ContaSenha = ({ navigation }) => {
    const { token } = useUser()

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [loadingAlert, setLoadingAlert] = useState(false)

    const passwordInput = useRef()
    const confirmPasswordInput = useRef()

    const handleEdit = async () => {
        if (!oldPassword || !password || !confirmPassword) {
            Alert.alert(translate('register.errorMessages.fieldsMustFilled'))
            return
        }
        if (password.length < 8 || confirmPassword.length < 8) {
            Alert.alert(translate('changePwd.errorMessages.shortPwd'))
            return
        }

        const newUser = {
            old_password: oldPassword,
            password,
            password_confirmation: confirmPassword,
        }

        setLoadingAlert(true)

        const response = await changePassword(newUser, token)

        if (response.status === 200) {
            setLoadingAlert(false)
            Alert.alert(translate('forgetPwd.passwordChanged'))
            navigation.goBack()
        } else {
            console.warn(response.status)
            setLoadingAlert(false)
            Alert.alert(
                translate('forgetPwd.differentsPass'),
                translate('forgetPwd.tryAgain')
            )
        }
    }

    return (
        <Container>
            <KeyboardScrollView>
                <FormInline>
                    <FormLabel>Senha atual</FormLabel>
                    <NormalInput
                        autoCorrect={false}
                        secureTextEntry
                        returnKeyType='next'
                        maxLength={100}
                        onChangeText={(text) => setOldPassword(text)}
                        onSubmitEditing={() => passwordInput.current.focus()}
                    />
                </FormInline>

                <FormInline>
                    <FormLabel>Nova senha</FormLabel>
                    <NormalInput
                        ref={passwordInput}
                        autoCorrect={false}
                        secureTextEntry
                        returnKeyType='next'
                        maxLength={100}
                        onChangeText={(text) => setPassword(text)}
                        onSubmitEditing={() =>
                            confirmPasswordInput.current.focus()
                        }
                    />
                </FormInline>

                <FormInline>
                    <FormLabel>Confirmar nova senha</FormLabel>
                    <NormalInput
                        ref={confirmPasswordInput}
                        autoCorrect={false}
                        secureTextEntry
                        returnKeyType='done'
                        maxLength={100}
                        onChangeText={(text) => setConfirmPassword(text)}
                        onSubmitEditing={() => handleEdit()}
                    />
                </FormInline>

                <Button onPress={() => handleEdit()}>
                    <SendContainer>
                        <SendText>Salvar</SendText>
                    </SendContainer>
                </Button>
            </KeyboardScrollView>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default ContaSenha
