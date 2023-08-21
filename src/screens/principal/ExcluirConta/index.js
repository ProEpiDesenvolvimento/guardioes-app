import React from 'react'
import { Alert } from 'react-native'

import {
    Button,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'
import { ScrollViewStyled, Title, BodyText } from '../Sobre/styles'

import translate from '../../../../locales/i18n'
import { useUser } from '../../../hooks/user'
import { requestDeletionUser } from '../../../api/user'

const ExcluirConta = ({ navigation }) => {
    const { user, token } = useUser()

    const requestDeletion = async () => {
        console.log('remover conta')

        const response = await requestDeletionUser(user.id, token)

        if (response.status === 200) {
            console.log('mandou')
        } else {
            console.warn(response.status)
            Alert.alert(translate('register.geralError'))
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
    )
}

export default ExcluirConta
