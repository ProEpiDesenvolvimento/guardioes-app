import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import { scale } from '../../../utils/scallingUtils';

import { ScrollViewStyled, Title, Subtitle, BodyText, ImageContainer } from './styles';

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
            <Feather name={'home'} size={scale(30)} style={{ alignSelf: 'center', marginRight: 10 }} color={'#348EAC'} />
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
            <Feather name={'clipboard'} size={scale(30)} color={'#348EAC'} style={{ alignSelf: "center", marginRight: 10 }} />
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
            <Feather name={'map'} size={scale(30)} color={'#348EAC'} style={{ alignSelf: "center", marginRight: 10 }} />
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
            <Feather name={'heart'} size={scale(30)} color={'#348EAC'} style={{ alignSelf: "center", marginRight: 10 }} />
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
            <Feather name={'message-square'} size={scale(30)} color={'#348EAC'} style={{ alignSelf: "center", marginRight: 10 }} />
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
