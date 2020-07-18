import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

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
  max-height: 60px;
  max-width: 60px;
`;

export const UserView = styled.View`
  margin-top: -30%;
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
  font-size: 22px;
  color: white;
`;

export const AppName = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: 500;
`;

export const StatusContainer = styled.View`
  margin-top: -20%;
  background: white;
  border-radius: 20;
  margin-right: 30px;
  margin-left: 30px;
  padding: 30px;
  padding-bottom: 30px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: {width: 0, height: 4};
  shadow-opacity: 0.15;
  shadow-radius: 4.65;
  elevation: 8;
`;

export const Text = styled.Text`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 20px;
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
  shadow-color: #348eac;
  shadow-offset: {width: 0, height: 4};
  shadow-opacity: 0.30;
  shadow-radius: 4.65;
  elevation: 8;
`;

export const Mal = styled(TouchableOpacity)`
  height: 60px;
  width: 120px;
  background: #f18f01;
  border-bottom-right-radius: 22;
  border-top-right-radius: 22;
  margin-left: 3px;
  align-items: center;
  justify-content: center;
  shadow-color: #f18f01;
  shadow-offset: {width: 0, height: 4};
  shadow-opacity: 0.30;
  shadow-radius: 4.65;
  elevation: 8;
`;

export const StatusText = styled.Text`
  font-weight: bold;
  color: white;
  font-size: 16px;
`;