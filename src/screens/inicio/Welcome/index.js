import React from 'react'
import { Alert } from 'react-native'

import StatusBarGDS from '../../../components/StatusBarGDS'
import {
    GradientBackground,
    Touch,
    SnowButton,
    Label,
} from '../../../components/SnowForms'
import { Container, Logo, WelcomeText } from './styles'

import translate from '../../../../locales/i18n'
import { GDSLogoES, GDSLogoBR } from '../../../img/imageConst'
import { terms } from '../../../utils/consts'

const Welcome = ({ navigation }) => {
    const showTerms = () => {
        Alert.alert(
            terms.title,
            terms.text,
            [
                {
                    text: terms.disagree,
                    onPress: () => navigation.navigate('Welcome'),
                    style: 'cancel',
                },
                {
                    text: terms.agree,
                    onPress: () => navigation.navigate('Register'),
                },
            ],
            { cancelable: false }
        )
    }

    let LogoType = GDSLogoBR

    if (translate('lang.code') === 'es') {
        LogoType = GDSLogoES
    }

    return (
        <>
            <StatusBarGDS light translucent />
            <GradientBackground>
                <Container>
                    <Logo source={LogoType} />
                    <WelcomeText>
                        {translate('initialscreen.welcome')}
                    </WelcomeText>

                    <Touch onPress={() => navigation.navigate('Login')}>
                        <SnowButton>
                            <Label>{translate('initialscreen.login')}</Label>
                        </SnowButton>
                    </Touch>

                    <Touch onPress={() => showTerms()}>
                        <SnowButton>
                            <Label>{translate('initialscreen.signup')}</Label>
                        </SnowButton>
                    </Touch>
                </Container>
            </GradientBackground>
        </>
    )
}

export default Welcome
