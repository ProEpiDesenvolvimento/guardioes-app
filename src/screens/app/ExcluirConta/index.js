import React, { useState } from 'react'
import { Alert } from 'react-native'

import {
    Container,
    Button,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'
import {
    ScrollViewStyled,
    Title,
    BodyText,
} from '../../../components/PageItems'

import LoadingModal from '../../../components/LoadingModal'
import translate from '../../../locales/i18n'
import { useUser } from '../../../hooks/user'
import { requestDeletionUser } from '../../../api/user'

const ExcluirConta = ({ navigation }) => {
    const { user, token, signOut } = useUser()

    const [loadingAlert, setLoadingAlert] = useState(false)

    const requestDeletion = async () => {
        setLoadingAlert(true)
        const response = await requestDeletionUser(user.id, token)

        if (response.status === 200) {
            setLoadingAlert(false)
            await signOut()
        } else {
            console.warn(response.status)
            Alert.alert(translate('register.geralError'))
            setLoadingAlert(false)
        }
    }

    const handleDeleteAccount = () => {
        Alert.alert(
            translate('deleteAccount.title'),
            translate('deleteAccount.alert'),
            [
                {
                    text: translate('deleteAccount.cancel'),
                    onPress: () => navigation.navigate('HomeDrawer'),
                    style: 'cancel',
                },
                {
                    text: translate('deleteAccount.confirm'),
                    onPress: () => requestDeletion(),
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <Container>
            <ScrollViewStyled>
                <Title>{translate('deleteAccount.confirmation')}</Title>

                <BodyText>
                    {translate('deleteAccount.message')}
                    {translate('deleteAccount.message2')}
                </BodyText>

                <Button onPress={() => handleDeleteAccount()}>
                    <SendContainer>
                        <SendText>{translate('deleteAccount.button')}</SendText>
                    </SendContainer>
                </Button>
            </ScrollViewStyled>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default ExcluirConta
