import React from 'react'

import { Help, Box, Button, IconWrapper, InfoWrapper, Title } from './styles'

import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import {
    FAQIcon,
    TermsIcon,
    TutorialIcon,
    InfoIcon,
} from '../../../img/imageConst'

const Ajuda = ({ navigation }) => {
    return (
        <Help>
            <Box>
                <Button onPress={() => navigation.navigate('Tutorial')}>
                    <IconWrapper>
                        <TutorialIcon height={scale(45)} width={scale(45)} />
                    </IconWrapper>
                    <InfoWrapper>
                        <Title>{translate('ajuda.tutorialBtn')}</Title>
                    </InfoWrapper>
                </Button>
            </Box>

            <Box>
                <Button onPress={() => navigation.navigate('FAQ')}>
                    <IconWrapper>
                        <FAQIcon height={scale(45)} width={scale(45)} />
                    </IconWrapper>
                    <InfoWrapper>
                        <Title>{translate('ajuda.faqBtn')}</Title>
                    </InfoWrapper>
                </Button>
            </Box>

            <Box>
                <Button onPress={() => navigation.navigate('TermosPoliticas')}>
                    <IconWrapper>
                        <TermsIcon height={scale(45)} width={scale(45)} />
                    </IconWrapper>
                    <InfoWrapper>
                        <Title>{translate('ajuda.useTermsBtn')}</Title>
                    </InfoWrapper>
                </Button>
            </Box>

            <Box>
                <Button onPress={() => navigation.navigate('Sobre')}>
                    <IconWrapper>
                        <InfoIcon height={scale(45)} width={scale(45)} />
                    </IconWrapper>
                    <InfoWrapper>
                        <Title>{translate('ajuda.aboutBtn')}</Title>
                    </InfoWrapper>
                </Button>
            </Box>
        </Help>
    )
}

export default Ajuda
