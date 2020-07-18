import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { getNameParts } from '../../../utils/constUtils';
import translate from "../../../../locales/i18n";

import * as Imagem from '../../../imgs/imageConst';

import {
  Container,
  ScrolView,
  Background,
  Avatar,
  UserView,
  NamesContainer,
  TextName,
  AppName,
  StatusContainer,
  TextStyle,
  StatusBemMal,
  StatusText,
  Bem,
  Mal,
  Alertas,
  StatusBairro,
  StatusTitle,
  StatusBairroText,
  BairroContainer,
} from './styles';

Feather.loadFont();

export default function Inicio() {

  return (
    <>  
      <StatusBar backgroundColor='#348EAC' barStyle="light-content"/>
      <Container>
        <ScrolView>
          <Background>
            <Feather name="menu"
              size={32} 
              color='#ffffff' 
              style={styles.menuBars}
            />
            <UserView>  
              <NamesContainer>
                <TextName>Olá, Gabriel</TextName>
                <AppName>Guardião da Saude</AppName>
              </NamesContainer>
              <Avatar
                source={Imagem['NullAvatar']}
                activeOpacity={0.6}
              />
            </UserView>
          </Background>
          <StatusContainer>
            <TextStyle>Como está se sentindo hoje?</TextStyle>
            <StatusBemMal>
              <Bem>
                <StatusText>BEM</StatusText>
              </Bem>
              <Mal>
                <StatusText>MAL</StatusText>
              </Mal>
            </StatusBemMal>
          </StatusContainer>
          <Alertas>Alertas</Alertas> 
            <BairroContainer>
              <Feather name='alert-circle' size={70} color='#fff' />  
              <StatusBairro>
                <StatusTitle>Status do seu bairro: </StatusTitle>
                <StatusBairroText>Maioria sentindo-se bem</StatusBairroText>
              </StatusBairro>
            </BairroContainer>
        </ScrolView>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  menuBars: {
    position: 'absolute',
    left: '2%',
    top: 0,
    padding: '2%',
  }
});
