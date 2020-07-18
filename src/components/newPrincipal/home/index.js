import React from 'react';
import { StatusBar } from 'react-native';
// import { Avatar } from 'react-native-elements';

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
  Text,
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

export default function Inicio() {
  return (
    <>  
      <StatusBar backgroundColor='#348EAC' barStyle="light-content"/>
      <Container>
        <ScrolView>
          <Background>
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
            <Text>Como está se sentindo hoje?</Text>
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