import React, {Component} from 'react';
import {Alert, Modal, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {Title, BodyText} from './styles';
import {
  ModalContainer,
  ModalBox,
  ModalTitle,
  FormInlineCheck,
  CheckBoxStyled,
  ModalText,
  ModalButton,
  ModalButtonText,
  CheckLabel,
} from '../../styled/NormalForms';
import {
  Container,
  KeyboardScrollView,
  FormInline,
  FormLabel,
  NormalInput,
  SendContainer,
  SendText,
  Button,
} from '../../styled/NormalForms';

import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import {scale} from '../../../utils/scallingUtils';
import translate from '../../../../locales/i18n';
import {API_URL} from 'react-native-dotenv';

Feather.loadFont();

class Vigilancia extends Component {
  static navigationOptions = {
    title: translate('drawer.toSurveillance'),
  };
  constructor(props) {
    super(props);
    this.state = {
      vigilance: false,
      phone: null,
      userID: null,
      userToken: null,
      isLoading: true,
      modalTerms: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const id = await AsyncStorage.getItem('userID');
    const userToken = await RNSecureStorage.get('userToken');

    this.setState({
      userID: id,
      userToken: userToken,
    });

    let response = await fetch(`${API_URL}/users/${this.state.userID}`, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
        Authorization: `${this.state.userToken}`,
      },
    });
    response = response.status == 200 ? await response.json() : response;

    this.setState({
      vigilance: response.user.is_vigilance,
      phone: response.user.phone,
      isLoading: false,
      acceptTerms: response.user.is_vigilance ? true : false,
    });
  };

  handleEdit = () => {
    if (!this.state.acceptTerms) return false;

    return fetch(`${API_URL}/users/${this.state.userID}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
        Authorization: `${this.state.userToken}`,
      },
      body: JSON.stringify({
        is_vigilance: !this.state.vigilance,
        phone: !this.state.vigilance ? this.state.phone : null,
      }),
    }).then(response => {
      console.warn(response.status);
      if (response.status == 200) {
        this.props.navigation.goBack();
      } else {
        Alert.alert(translate('register.geralError'));
      }
    });
  };

  render() {
    return (
      <Container>
        <Modal //Modal View for Terms
          animationType="fade"
          transparent={true}
          visible={this.state.modalTerms}
          onRequestClose={() => {
            this.setState({modalTerms: !this.state.modalTerms});
          }}>
          <ModalContainer>
            <ModalBox>
              <ModalTitle>{translate('vigilanceTerms.title')}</ModalTitle>

              <ScrollView>
                <ModalText>{translate('vigilanceTerms.text')}</ModalText>
              </ScrollView>

              <Button
                onPress={() => {
                  this.setState({modalTerms: !this.state.modalTerms});
                }}>
                <ModalButton>
                  <ModalButtonText>
                    {translate('register.riskGroupButton')}
                  </ModalButtonText>
                </ModalButton>
              </Button>
            </ModalBox>
          </ModalContainer>
        </Modal>
        <KeyboardScrollView>
          <Title>O que é?</Title>
          <BodyText>{translate('about.textoVigilancia')}</BodyText>
          {!this.state.isLoading ? (
            <>
              <Title>
                {this.state.vigilance
                  ? translate('drawer.participateSuccess')
                  : translate('drawer.participateQuestion')}
              </Title>
              {!this.state.vigilance ? (
                <FormInline>
                  <FormLabel>Informe seu telefone:</FormLabel>
                  <NormalInput
                    placeholder="5561988888888"
                    maxLength={13}
                    returnKeyType="done"
                    keyboardType="number-pad"
                    value={this.state.phone}
                    onChangeText={text => this.setState({phone: text})}
                  />
                </FormInline>
              ) : null}

              {!this.state.vigilance ? (
                <FormInlineCheck>
                  <CheckBoxStyled
                    title={translate('drawer.confirmRead')}
                    checked={this.state.acceptTerms}
                    onPress={() => {
                      this.setState({acceptTerms: !this.state.acceptTerms});
                    }}
                  />
                  <CheckLabel onPress={() => this.setState({modalTerms: true})}>
                    <Feather
                      name="help-circle"
                      size={scale(25)}
                      color="#348EAC"
                    />
                  </CheckLabel>
                </FormInlineCheck>
              ) : null}

              <FormInline />

              <Button onPress={this.handleEdit}>
                <SendContainer>
                  <SendText>
                    {this.state.vigilance
                      ? translate('drawer.cancelParticipation')
                      : translate('drawer.participate')}
                  </SendText>
                </SendContainer>
              </Button>
            </>
          ) : null}
        </KeyboardScrollView>
      </Container>
    );
  }
}

export default Vigilancia;
