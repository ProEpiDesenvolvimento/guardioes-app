import React, {Component} from 'react';
import {SafeAreaView, StatusBar, Alert} from 'react-native';

import {
  GradientBackground,
  Touch,
  SnowButton,
  Label,
} from '../../../components/SnowForms';
import {Container, Logo, WelcomeText} from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import {GDSLogoES, GDSLogoBR} from '../../../img/imageConst';
import translate from '../../../../locales/i18n';

const Redirect = (titulo, message, navigation) => {
  Alert.alert(`${titulo}`, `${message}`, [
    {
      text: 'Cancelar',
      onPress: () => navigation.navigate('Welcome'),
      style: 'cancel',
    },
    {text: 'Ok', onPress: () => navigation.navigate('Registrar')},
  ]);
};

class Welcome extends Component {
  constructor(props) {
    super(props);
    //this._loadInitialState();
  }

  //Funcao responsavel por verificar se o usuario está logado e ser redirecionado automaticamente para Home
  _loadInitialState = async () => {
    let UserID = await AsyncStorage.getItem('userID');
    this.props.navigation.navigate(UserID ? 'BottomMenu' : 'Cadastro');
  };

  render() {
    const {navigate} = this.props.navigation;

    let LogoType;
    if (translate('lang.code') === 'es') {
      LogoType = GDSLogoES;
    } else {
      LogoType = GDSLogoBR;
    }

    return (
      <>
        <SafeAreaView style={{flex: 0, backgroundColor: '#5DD39E'}} />
        <StatusBar backgroundColor="#5DD39E" barStyle="light-content" />
        <GradientBackground>
          <Container>
            <Logo source={LogoType} />
            <WelcomeText>{translate('initialscreen.welcome')}</WelcomeText>

            <Touch onPress={() => navigate('Login')}>
              <SnowButton>
                <Label>{translate('initialscreen.login')}</Label>
              </SnowButton>
            </Touch>

            <Touch
              onPress={() =>
                Redirect(
                  textos.tituloTermosDeUso,
                  textos.mensagem,
                  (navigation = this.props.navigation),
                )
              }>
              <SnowButton>
                <Label>{translate('initialscreen.signup')}</Label>
              </SnowButton>
            </Touch>
          </Container>
        </GradientBackground>
      </>
    );
  }
}

const textos = {
  tituloTermosDeUso: translate('useTerms.title'),
  mensagem: `${translate('useTerms.terms.textoTermosTitulo')}\n
        ${translate('useTerms.terms.textoTermos_1')}\n
        ${translate('useTerms.terms.textoTermos_2')}\n
        ${translate('useTerms.terms.textoTermos_3')}\n
        ${translate('useTerms.terms.textoTermos_4')}\n
        ${translate('useTerms.terms.textoTermos_5')}\n
        ${translate('useTerms.terms.textoTermos_6')}\n
        ${translate('useTerms.terms.textoTermos_7')}\n
        ${translate('useTerms.terms.textoTermos_8')}\n
        ${translate('useTerms.terms.textoTermos_9')}\n
        ${translate('useTerms.terms.textoTermos_10')}\n
        ${translate('useTerms.terms.textoTermos_11')}\n
        ${translate('useTerms.terms.textoTermos_12')}\n
        ${translate('useTerms.terms.textoTermos_13')}`,
  ifYes: 'Registrar',
  ifNo: 'Welcome',
};

export default Welcome;
