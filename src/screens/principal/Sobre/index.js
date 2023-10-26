import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

import { Container } from '../../../components/NormalForms'
import {
    ScrollViewStyled,
    Title,
    ImageContainer,
    BodyText,
} from '../../../components/PageItems'

import translate from '../../../../locales/i18n'
import { UnBLogo, ProEpiLogo } from '../../../img/imageConst'
import { redirectAlert } from '../../../utils/consts'
import { scale } from '../../../utils/scalling'

const Sobre = () => {
    return (
        <Container>
            <ScrollViewStyled>
                <Title>{translate('about.textoSobreTitulo')}</Title>

                <ImageContainer>
                    <TouchableOpacity
                        onPress={() =>
                            redirectAlert(
                                translate('about.tituloBtnProEpi'),
                                translate('about.mensagemBtnProEpi'),
                                translate('about.linkBtnProEPi')
                            )
                        }
                    >
                        <Image
                            source={ProEpiLogo}
                            style={{ height: scale(70), width: scale(70) }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            redirectAlert(
                                translate('about.tituloBtnUnb'),
                                translate('about.mensagemBtnUnb'),
                                translate('about.linkBtnUnb')
                            )
                        }
                    >
                        <Image
                            source={UnBLogo}
                            style={{ height: scale(60), width: scale(60) }}
                        />
                    </TouchableOpacity>
                </ImageContainer>

                <BodyText>{translate('about.textoSobre')}</BodyText>
            </ScrollViewStyled>
        </Container>
    )
}

export default Sobre
