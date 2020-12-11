import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

// import  from 'react-native-vector-icons/Feath size={scale(30)}';
import { scale } from '../../../utils/scallingUtils';

import { ScrollViewStyled, Subtitle, BodyText, ImageContainer, Image, Feath } from './styles';

import translate from '../../../../locales/i18n';

class Tutorial extends Component {
  static navigationOptions = {
    title: translate('tutorial.title'),
  };
  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollViewStyled>
        {/* Como Usar */}
        <BodyText>{translate("tutorial.howToUse")}</BodyText>

        <TouchableOpacity onPress={() => navigate('Home')}>
          <ImageContainer>
            <Feath size={scale(30)} name={'home'} />
            <Subtitle>
              {translate("tutorial.home")}
            </Subtitle>
          </ImageContainer>
        </TouchableOpacity>

        {/* Continuacao de como usar */}
        <BodyText>{translate("tutorial.homeCont")}</BodyText>

        {/* Diario */}
        <TouchableOpacity onPress={() => navigate('Diario')}>
          <ImageContainer>
            <Feath size={scale(30)} name={'clipboard'} />
            <Subtitle>
              {translate("tutorial.diary")}
            </Subtitle>
          </ImageContainer>
        </TouchableOpacity>

        <BodyText>
          {translate("tutorial.diaryCont")}
        </BodyText>

        {/* Mapa da Saude */}
        <TouchableOpacity onPress={() => navigate('Mapa')}>
          <ImageContainer >
            <Feath size={scale(30)} name={'map'} />
            <Subtitle>
              {translate("tutorial.healthMap")}
            </Subtitle>
          </ImageContainer>
        </TouchableOpacity>

        <BodyText>
          {translate("tutorial.healthMapCont")}
        </BodyText>

        <Image
          source={require('../../../../src/img/tutorial/image2.jpg')} />

        <BodyText>
          {translate("tutorial.healthMapCont2")}
        </BodyText>

        <Image
          source={require('../../../../src/img/tutorial/image1.jpg')} />

        <BodyText>
          {translate("tutorial.healthMapCont3")}
        </BodyText>

        {/* Dicas de Saude */}
        <TouchableOpacity onPress={() => navigate('Dicas')}>
          <ImageContainer>
            <Feath size={scale(30)} name={'heart'} />
            <Subtitle>
              {translate("tutorial.advices")}
            </Subtitle>
          </ImageContainer>
        </TouchableOpacity>
        <BodyText>
          {translate("tutorial.advicesCont")}
        </BodyText>

        {/* Mudando para Noticias, titulo */}
        <TouchableOpacity onPress={() => navigate('Noticias')}>
          <ImageContainer>
            <Feath size={scale(30)} name={'message-square'} />
            <Subtitle>
              {translate("tutorial.news")}
            </Subtitle>
          </ImageContainer>
        </TouchableOpacity>
        <BodyText>
          {translate("tutorial.newsCont")}
        </BodyText>

        <BodyText>
          {translate("tutorial.newsPs")}
        </BodyText>
      </ScrollViewStyled>
    );
  }
}

export default Tutorial;
