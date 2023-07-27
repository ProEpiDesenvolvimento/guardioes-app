import React from 'react'
import { TouchableOpacity } from 'react-native'

import {
    ScrollViewStyled,
    Title,
    Subtitle,
    BodyText,
    ImageContainer,
    Feath,
    Image,
} from './styles'

import translate from '../../../../locales/i18n'

const Tutorial = ({ navigation }) => {
    const { navigate } = navigation

    return (
        <ScrollViewStyled>
            <Title>{translate('tutorial.tutorial')}</Title>
            <BodyText>{translate('tutorial.howToUse')}</BodyText>
            <TouchableOpacity onPress={() => navigate('Home')}>
                <ImageContainer>
                    <Feath name='home' />
                    <Subtitle>{translate('tutorial.home')}</Subtitle>
                </ImageContainer>
            </TouchableOpacity>
            <BodyText>{translate('tutorial.homeCont')}</BodyText>

            <TouchableOpacity onPress={() => navigate('Diario')}>
                <ImageContainer>
                    <Feath name='clipboard' />
                    <Subtitle>{translate('tutorial.diary')}</Subtitle>
                </ImageContainer>
            </TouchableOpacity>
            <BodyText>{translate('tutorial.diaryCont')}</BodyText>

            <TouchableOpacity onPress={() => navigate('Mapa')}>
                <ImageContainer>
                    <Feath name='map' />
                    <Subtitle>{translate('tutorial.healthMap')}</Subtitle>
                </ImageContainer>
            </TouchableOpacity>

            <BodyText>{translate('tutorial.healthMapCont')}</BodyText>
            <Image source={require('../../../img/tutorial/image1.jpeg')} />
            <BodyText>{translate('tutorial.healthMapCont2')}</BodyText>
            <Image source={require('../../../img/tutorial/image2.jpeg')} />
            <BodyText>{translate('tutorial.healthMapCont3')}</BodyText>

            <TouchableOpacity onPress={() => navigate('Dicas')}>
                <ImageContainer>
                    <Feath name='heart' />
                    <Subtitle>{translate('tutorial.advices')}</Subtitle>
                </ImageContainer>
            </TouchableOpacity>
            <BodyText>{translate('tutorial.advicesCont')}</BodyText>

            <TouchableOpacity onPress={() => navigate('Noticias')}>
                <ImageContainer>
                    <Feath name='message-square' />
                    <Subtitle>{translate('tutorial.news')}</Subtitle>
                </ImageContainer>
            </TouchableOpacity>
            <BodyText>{translate('tutorial.newsCont')}</BodyText>

            <BodyText>{translate('tutorial.newsPs')}</BodyText>
        </ScrollViewStyled>
    )
}

export default Tutorial
