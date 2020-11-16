import React, {Component} from 'react';
import {SafeAreaView, Image, TouchableOpacity} from 'react-native';

import {ScrollViewStyled, Title, ImageContainer, BodyText} from './styles';

import {UnBLogo, ProEpiLogo} from '../../../img/imageConst';
import {scale} from '../../../utils/scallingUtils';
import {Redirect} from '../../../utils/constUtils';
import translate from '../../../../locales/i18n';

class Sobre extends Component {
  static navigationOptions = {
    title: translate('about.title'),
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <SafeAreaView style={{flex: 0, backgroundColor: '#348EAC'}} />
        <ScrollViewStyled>
          <Title>{translate('about.textoSobreTitulo')}</Title>

          <ImageContainer>
            <TouchableOpacity
              onPress={() =>
                Redirect(
                  translate('about.tituloBtnProEpi'),
                  translate('about.mensagemBtnProEpi'),
                  translate('about.linkBtnProEPi'),
                )
              }>
              <Image
                source={ProEpiLogo}
                style={{height: scale(60), width: scale(60)}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Redirect(
                  translate('about.tituloBtnUnb'),
                  translate('about.mensagemBtnUnb'),
                  translate('about.linkBtnUnb'),
                )
              }>
              <Image
                source={UnBLogo}
                style={{height: scale(60), width: scale(60)}}
              />
            </TouchableOpacity>
          </ImageContainer>

          <BodyText>{translate('about.textoSobre')}</BodyText>
        </ScrollViewStyled>
      </>
    );
  }
}

export default Sobre;
