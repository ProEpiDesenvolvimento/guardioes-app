import styled from 'styled-components/native';
import { scale } from '../../utils/scallingUtils';

export const Container = styled.View`
  flex: 1;
`;

export const Avatar = styled.Image`
  border-radius: 50;
  border-color: #ffffff;
  border-width: 3px;
  height: ${scale(90)}px;
  width: ${scale(90)}px;
`;

export const AvatarContainer = styled.View`
  margin-bottom: ${scale(35)}px;
  align-items: center;
  margin-top: ${scale(30)}px;
`;

export const UserOption = styled.View`
  margin-top: ${scale(15)};
  background: #348eac;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  align-items: center;
  border-radius: 20px;
  margin-right: ${scale(16)}px;
  margin-left: ${scale(16)}px;
  padding: ${scale(10)}px;
`;

export const TextOption = styled.Text`
  margin-left: ${scale(16)}px;
  font-size: ${scale(16)}px;
  color: white;
  font-weight: 500;
`;

export const Aplicativo = styled.Text`
  margin-top:${scale(30)}px;
  font-size: ${scale(18)}px;
  font-weight: 500;
  margin-left: 8%;
`;