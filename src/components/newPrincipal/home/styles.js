import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import { scale } from '../../../utils/scallingUtils';

export const Container = styled.View`
  flex: 1;
`;

export const ScrolView = styled.ScrollView.attrs({
  backgroundColor: '#f4f4f4',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
})``;

export const Background = styled(LinearGradient).attrs({
  colors: ['#348eac', '#5DD39E'],
})`
  min-height: 45%;
  min-width: 100%;
  border-bottom-left-radius: 50;
  border-bottom-right-radius: 50;
  flex: 1;
`;

export const Avatar = styled.Image`
  margin-right: 10%;
  border-radius: 50;
  border-color: #ffffff;
  border-width: 3px;
  height: ${scale(60)}px;
  width: ${scale(60)}px;;
`;

export const UserView = styled.View`
  margin-top: -22%;
  flex: 1;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const NamesContainer = styled.View`
  margin-left: 10%;
`;

export const TextName = styled.Text`
  font-weight: bold;
  font-size: ${scale(20)}px;
  color: white;
`;

export const AppName = styled.Text`
  font-size: ${scale(18)}px;
  color: white;
  font-weight: 500;
`;

export const StatusContainer = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 4},
  shadowOpacity: 0.15,
  shadowRadius: 4.65,
  elevation: 8,
})`
  margin-top: -20%;
  background: white;
  border-radius: 20px;
  margin-right: 6%;
  margin-left: 6%;
  padding: 10%;
  align-items: center;
`;

export const Text = styled.Text`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: ${scale(16)}px;
`;

export const StatusBemMal = styled.View`
  align-self: center;
  flex-direction: row;
`;

export const Bem = styled(TouchableOpacity)` 
  height: 60px;
  width: 120px;
  background: #348eac;
  border-bottom-left-radius: 22;
  border-top-left-radius: 22;
  margin-right: 3px;
  align-items: center;
  justify-content: center;
`;

export const Mal = styled(TouchableOpacity)`
  height: 60px;
  width: 120px;
  background: #f18f01;
  border-bottom-right-radius: 22px;
  border-top-right-radius: 22px;
  margin-left: 3px;
  align-items: center;
  justify-content: center;
`;

export const StatusText = styled.Text`
  font-weight: bold;
  color: white;
  font-size: ${scale(15)}px;
`;

export const Alertas = styled.Text`
  margin-top: 8%;
  margin-bottom: 8%;
  font-size: ${scale(20)}px;
  font-weight: 500;
  margin-left: 8%;
`;

export const BairroContainer = styled.View`
  flex: 1;
  background-color: #5DD39E;
  border-radius: 20px;
  margin-right: 6%;
  margin-left: 6%;
  padding: 20px;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const StatusBairro = styled.View`
  align-items: flex-start;
`;

export const StatusTitle = styled.Text`
  color: white;
  font-size: ${scale(18)}px;
  font-weight: bold;
  margin-bottom: ${scale(5)}px;
`;

export const StatusBairroText = styled.Text`
  color: white;
  font-size: ${scale(18)}px;
  font-weight: 500;
`;