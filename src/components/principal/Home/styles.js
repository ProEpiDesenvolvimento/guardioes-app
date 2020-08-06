import styled from 'styled-components/native';

import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import ShadowView from 'react-native-simple-shadow-view';

import { scale, percentage } from '../../../utils/scallingUtils';

export const Container = styled.View`
  flex: 1;
  background-color: #f8f8f8;
`;

export const ScrollViewStyle = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})``;

export const Background = styled(LinearGradient).attrs({
  colors: ['#348eac', '#5DD39E'],
})`
  min-height: ${scale(45)}%;
  min-width: 100%;
  border-bottom-left-radius: ${scale(25)}px;
  border-bottom-right-radius: ${scale(25)}px;
`;

export const Button = styled(TouchableOpacity).attrs({
  activeOpacity: 0.5
})`
  flex-wrap: wrap;
`;

export const UserView = styled.View`
  margin-top: ${scale(20)}%;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const NamesContainer = styled.View`
  margin-left: ${scale(8)}%;
`;

export const TextName = styled.Text`
  font-family: ArgentumSans-SemiBold;
  font-size: ${scale(18)}px;
  color: white;
  margin-bottom: ${scale(3)}px;
`;

export const AppName = styled.Text`
  font-size: ${scale(16)}px;
  font-family: ArgentumSans;
  color: white;
  font-weight: 500;
`;

export const StatusContainer = styled(ShadowView).attrs({
})`
    width: 88%;
    margin-top: ${scale(-25)}%;
    background: white;
    border-radius: ${scale(20)}px;
    padding-vertical: ${percentage(12)}px;
    align-items: center;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 10px;
    shadow-offset: 0px 4px;
`;

export const TextStyle = styled.Text`
  margin-bottom: ${scale(20)}px;
  font-family: ArgentumSans-SemiBold;
  font-weight: 500;
  font-size: ${scale(16)}px;
  color: #32323B;
`;

export const StatusBemMal = styled.View`
  align-self: center;
  flex-direction: row;
`;

const BemMal = `
  height: ${scale(50)}px;
  width: ${scale(114)}px;
  align-items: center;
  justify-content: center;
  shadow-opacity: 0.4;
  shadow-radius: 10px;
  shadow-offset: 0px 2px;
`;

export const Bem = styled(TouchableOpacity).attrs({
  activeOpacity: 0.5
})` 
  ${BemMal}
  background: #348eac;
  border-bottom-left-radius: ${scale(18)}px;
  border-top-left-radius: ${scale(18)}px;
  margin-right: ${scale(2)}px;
  shadow-color: #348eac;
`;

export const Mal = styled(TouchableOpacity).attrs({
  activeOpacity: 0.5
})`
  ${BemMal}
  background: #f18f01;
  border-bottom-right-radius: ${scale(18)}px;
  border-top-right-radius: ${scale(18)}px;
  margin-left: ${scale(2)}px;
  shadow-color: #f18f01;
`;

export const StatusText = styled.Text`
  font-size: ${scale(14)}px;
  font-family: ArgentumSans-Medium;
  color: white;
`;

export const Alertas = styled.Text`
  width: 88%;
  font-size: ${scale(16)}px;
  font-family: ArgentumSans-Medium;
  color: #32323B;
  margin-top: ${percentage(7)}px;
  margin-bottom: ${percentage(6)}px;
  margin-left: ${scale(20)}px;
`;

export const BairroContainer = styled(ShadowView).attrs({
})`
  width: 88%;
  align-items: center;
  background-color: ${props => (props.alert ? '#f18f01' : '#5DD39E')};
  border-radius: ${scale(18)}px;
  padding: ${scale(20)}px;
  flex-direction: row;
  margin-bottom: ${percentage(7)}px;
  shadow-color: #000000;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
`;

export const StatusBairro = styled.View`
  align-items: flex-start;
  margin-left: ${scale(14)}px;
  flex-shrink: 1;
`;

export const StatusTitle = styled.Text`
  color: white;
  font-family: ArgentumSans-SemiBold;
  font-size: ${scale(16)}px;
`;

export const StatusBairroText = styled.Text`
  color: white;
  font-family: ArgentumSans;
  font-size: ${scale(16)}px;
  font-weight: 500;
`;