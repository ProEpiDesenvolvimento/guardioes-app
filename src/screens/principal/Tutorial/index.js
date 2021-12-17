import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {ScrollViewStyled, Title, Subtitle, BodyText, ImageContainer, Feath, Image} from './styles';
import { scale } from '../../../utils/scalling';

import translate from '../../../../locales/i18n';

class Tutorial extends Component {
  static navigationOptions = {
    title: translate('tutorial.title'),
  };
  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollViewStyled>
        <Title>{translate('tutorial.tutorial')}</Title>

        {/* Como Usar */}
        <BodyText>{translate('tutorial.howToUse')}</BodyText>
        <TouchableOpacity onPress={() => navigate('Home')}>
          <ImageContainer>
            <Feath name={'home'} size={scale(30)}/>
            <Subtitle>
              {translate("tutorial.home")}
            </Subtitle>
          </ImageContainer>
        </TouchableOpacity>
        {/* Continuacao de como usar */}
        <BodyText>{translate('tutorial.homeCont')}</BodyText>

        {/* Diario */}
        <TouchableOpacity onPress={() => navigate('Diario')}>
          <ImageContainer>
            <Feath name={'clipboard'} size={scale(30)}/>
            <Subtitle>{translate('tutorial.diary')}</Subtitle>
          </ImageContainer>
        </TouchableOpacity>
        <BodyText>{translate('tutorial.diaryCont')}</BodyText>

        {/* Mapa da Saude */}
        <TouchableOpacity onPress={() => navigate('Mapa')}>
          <ImageContainer>
              <Feath name={'map'} size={scale(30)}/>
              <Subtitle>{translate('tutorial.healthMap')}</Subtitle>
          </ImageContainer>
        </TouchableOpacity>

        <BodyText>{translate('tutorial.healthMapCont')}</BodyText>
        <Image source={require('../../../../src/img/tutorial/image1.jpeg')}/>
        <BodyText>{translate("tutorial.healthMapCont2")}</BodyText>
        <Image source={require('../../../../src/img/tutorial/image2.jpeg')}/>
        <BodyText>{translate("tutorial.healthMapCont3")}</BodyText>

        {/* Dicas de Saude */}
        <TouchableOpacity onPress={() => navigate('Dicas')}>
        <ImageContainer>
            <Feath name={'heart'} size={scale(30)}/>
            <Subtitle>{translate('tutorial.advices')}</Subtitle>
          </ImageContainer>
        </TouchableOpacity>
        <BodyText>{translate('tutorial.advicesCont')}</BodyText>

        {/* Mudando para Noticias, titulo */}
        <TouchableOpacity onPress={() => navigate('Noticias')}>
        <ImageContainer>
            <Feath name={'message-square'} size={scale(30)}/>
            <Subtitle>{translate('tutorial.news')}</Subtitle>
          </ImageContainer>
        </TouchableOpacity>
        <BodyText>{translate('tutorial.newsCont')}</BodyText>

        <BodyText>{translate('tutorial.newsPs')}</BodyText>
      </ScrollViewStyled>
    );
  }
}

export default Tutorial;
