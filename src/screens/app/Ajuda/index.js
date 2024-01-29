import React from 'react'
import { Linking } from 'react-native'

import { Container } from '../../../components/NormalForms'
import {
    ScrollViewStyled,
    CardWhite,
    CardNameWhite,
    AvatarWrapper,
    InfoContainer,
    InfoWrapper,
    Button,
} from '../../../components/Cards'

import translate from '../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import {
    FAQIcon,
    TermsIcon,
    TutorialIcon,
    InfoIcon,
    AccountIcon,
} from '../../../img/imageConst'

const Ajuda = ({ navigation }) => {
    return (
        <Container>
            <ScrollViewStyled>
                <Button onPress={() => navigation.navigate('Tutorial')}>
                    <CardWhite>
                        <AvatarWrapper>
                            <TutorialIcon
                                height={scale(45)}
                                width={scale(45)}
                            />
                        </AvatarWrapper>
                        <InfoContainer>
                            <InfoWrapper>
                                <CardNameWhite>
                                    {translate('ajuda.tutorialBtn')}
                                </CardNameWhite>
                            </InfoWrapper>
                        </InfoContainer>
                    </CardWhite>
                </Button>

                <Button
                    onPress={() =>
                        Linking.openURL(
                            'https://proepi.org.br/guardioes-da-saude'
                        )
                    }
                >
                    <CardWhite>
                        <AvatarWrapper>
                            <FAQIcon height={scale(45)} width={scale(45)} />
                        </AvatarWrapper>
                        <InfoContainer>
                            <InfoWrapper>
                                <CardNameWhite>
                                    {translate('ajuda.faqBtn')}
                                </CardNameWhite>
                            </InfoWrapper>
                        </InfoContainer>
                    </CardWhite>
                </Button>

                <Button onPress={() => navigation.navigate('TermosPoliticas')}>
                    <CardWhite>
                        <AvatarWrapper>
                            <TermsIcon height={scale(45)} width={scale(45)} />
                        </AvatarWrapper>
                        <InfoContainer>
                            <InfoWrapper>
                                <CardNameWhite>
                                    {translate('ajuda.useTermsBtn')}
                                </CardNameWhite>
                            </InfoWrapper>
                        </InfoContainer>
                    </CardWhite>
                </Button>

                <Button onPress={() => navigation.navigate('Sobre')}>
                    <CardWhite>
                        <AvatarWrapper>
                            <InfoIcon height={scale(45)} width={scale(45)} />
                        </AvatarWrapper>
                        <InfoContainer>
                            <InfoWrapper>
                                <CardNameWhite>
                                    {translate('ajuda.aboutBtn')}
                                </CardNameWhite>
                            </InfoWrapper>
                        </InfoContainer>
                    </CardWhite>
                </Button>

                <Button onPress={() => navigation.navigate('ExcluirConta')}>
                    <CardWhite>
                        <AvatarWrapper>
                            <AccountIcon height={scale(45)} width={scale(45)} />
                        </AvatarWrapper>
                        <InfoContainer>
                            <InfoWrapper>
                                <CardNameWhite>
                                    {translate('deleteAccount.title')}
                                </CardNameWhite>
                            </InfoWrapper>
                        </InfoContainer>
                    </CardWhite>
                </Button>
            </ScrollViewStyled>
        </Container>
    )
}

export default Ajuda
