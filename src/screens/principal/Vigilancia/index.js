import React, { useState } from 'react'
import { Alert, Modal, ScrollView } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import {
    ModalContainer,
    ModalBox,
    ModalTitle,
    FormInlineCheck,
    CheckBoxStyled,
    ModalText,
    ModalButton,
    ModalButtonText,
    CheckLabel,
    Container,
    KeyboardScrollView,
    FormInline,
    FormLabel,
    NormalInput,
    SendContainer,
    SendText,
    Button,
} from '../../../components/NormalForms'
import { Title, BodyText } from './styles'

import LoadingModal from '../../../components/Groups/LoadingModal'
import translate from '../../../../locales/i18n'
import { useUser } from '../../../hooks/user'
import { scale } from '../../../utils/scalling'
import { validPerson } from '../../../utils/consts'
import { maskPhone } from '../../../utils/masks'
import { updateUser } from '../../../api/user'

const Vigilancia = ({ navigation }) => {
    const { token, user, storeUser } = useUser()

    const [showModalTerms, setShowModalTerms] = useState(false)
    const [acceptedTerms, setAcceptedTerms] = useState(!!user.is_vigilance)
    const [phone, setPhone] = useState(user.phone ? user.phone : '')

    const [loadingAlert, setLoadingAlert] = useState(false)

    const handleEdit = async () => {
        if (!acceptedTerms) {
            Alert.alert(
                translate('register.errorMessages.error'),
                translate('register.errorMessages.allFieldsAreFilled')
            )
            return
        }

        const vigilance = {
            birthdate: user.birthdate,
            is_vigilance: !user.is_vigilance,
            phone: !user.is_vigilance ? phone : null,
        }

        if (!validPerson(vigilance, null)) return
        setLoadingAlert(true)

        const response = await updateUser({ user: vigilance }, user.id, token)
        console.warn(response.status)

        if (response.status === 200) {
            storeUser(response.data.user)
            navigation.goBack()
        } else {
            Alert.alert(translate('register.geralError'))
        }
    }

    return (
        <Container>
            <Modal // Modal View for Terms
                animationType='fade'
                transparent
                visible={showModalTerms}
                onRequestClose={() => {
                    setShowModalTerms(!showModalTerms)
                }}
            >
                <ModalContainer>
                    <ModalBox>
                        <ModalTitle>
                            {translate('vigilanceTerms.title')}
                        </ModalTitle>

                        <ScrollView>
                            <ModalText>
                                {translate('vigilanceTerms.text')}
                            </ModalText>
                        </ScrollView>

                        <Button
                            onPress={() => setShowModalTerms(!showModalTerms)}
                        >
                            <ModalButton>
                                <ModalButtonText>
                                    {translate('register.riskGroupButton')}
                                </ModalButtonText>
                            </ModalButton>
                        </Button>
                    </ModalBox>
                </ModalContainer>
            </Modal>

            <KeyboardScrollView>
                <Title>{translate('surveillance.whatIs')}</Title>
                <BodyText>{translate('surveillance.textAbout')}</BodyText>
                <Title>
                    {user.is_vigilance
                        ? translate('surveillance.participateSuccess')
                        : translate('surveillance.participateQuestion')}
                </Title>
                {!user.is_vigilance ? (
                    <FormInline>
                        <FormLabel>{translate('surveillance.phone')}</FormLabel>
                        <NormalInput
                            placeholder='(61) 98888-8888'
                            maxLength={16}
                            returnKeyType='done'
                            keyboardType='number-pad'
                            value={phone}
                            onChangeText={(text) => setPhone(maskPhone(text))}
                        />
                    </FormInline>
                ) : null}

                {!user.is_vigilance ? (
                    <FormInlineCheck>
                        <CheckBoxStyled
                            title={translate('surveillance.confirmRead')}
                            checked={acceptedTerms}
                            onPress={() => setAcceptedTerms(!acceptedTerms)}
                        />
                        <CheckLabel onPress={() => setShowModalTerms(true)}>
                            <Feather
                                name='help-circle'
                                size={scale(25)}
                                color='#348EAC'
                            />
                        </CheckLabel>
                    </FormInlineCheck>
                ) : null}

                <FormInline />

                <Button onPress={() => handleEdit()}>
                    <SendContainer>
                        <SendText>
                            {user.is_vigilance
                                ? translate('surveillance.cancelParticipation')
                                : translate('surveillance.participate')}
                        </SendText>
                    </SendContainer>
                </Button>
            </KeyboardScrollView>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default Vigilancia
