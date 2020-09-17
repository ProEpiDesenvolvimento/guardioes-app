import styled from 'styled-components/native';

import ShadowView from 'react-native-simple-shadow-view';
import { TouchableOpacity } from 'react-native';

import { scale, percentage } from '../../utils/scallingUtils';

export const HeaderNavigator = styled.View`
    width: 100%;
    background-color: #348EAC;
    border-bottom-left-radius: ${scale(18)}px;
    border-bottom-right-radius: ${scale(18)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: ${percentage(10)}px;
    padding-horizontal: ${percentage(4)}px;
    padding-bottom: ${percentage(4)}px;
`;

export const BackButton = styled(TouchableOpacity).attrs({
    activeOpacity: 0.2
})``;

export const ScreenTitle = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(18)}px;
    color: #ffffff;
`;

export const Empty = styled.View`
  width: ${scale(38)}px;
`;

export const Container = styled.View`
  background-color: #ffffff;
  border-top-right-radius: ${scale(25)}px;
  border-bottom-right-radius: ${scale(25)}px;
  flex: 1;
`;

export const ScrollViewStyled = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  }
})``;

export const Button = styled(TouchableOpacity).attrs({
  activeOpacity: 0.5
})``;

export const AvatarContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-vertical: ${percentage(10)}px;
`;

const option = `
  margin-bottom: ${scale(15)}px;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  align-items: center;
  border-radius: 20px;
  margin-right: ${scale(16)}px;
  margin-left: ${scale(16)}px;
  padding: ${scale(10)}px;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  shadow-offset: 0px 0px;
`;

export const UserOptionBlue = styled(ShadowView).attrs({
})`
  ${option}
  background-color: #348eac;
  shadow-color: #348eac;
`;

export const UserOptionGreen = styled(ShadowView).attrs({
})`
  ${option}
  background-color: #5DD39E;
  shadow-color: #5DD39E;
`;

export const TextOption = styled.Text`
  font-family: ArgentumSans;
  font-size: ${scale(14)}px;
  margin-left: ${scale(16)}px;
  color: white;
`;

export const Aplicativo = styled.Text`
  font-family: ArgentumSans-Medium;
  font-size: ${scale(16)}px;
  margin-top: ${percentage(5)}px;
  margin-bottom: ${scale(15)}px;
  margin-left: ${scale(8)}%;
`;

export const SocialContainer = styled.View`
  margin-vertical: ${percentage(7)}px;
  flex-direction: row;
  margin-left: ${(scale(75))}px;
  margin-right: ${(scale(75))}px;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const RedeSocial = styled(ShadowView).attrs({
})`
  border-radius: 100px;
  background-color: #348eac;
  padding: ${scale(10)}px;
  shadow-color: #348eac;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  shadow-offset: 0px 0px;
`;