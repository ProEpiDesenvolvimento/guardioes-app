import styled from 'styled-components/native';

import Spinner from 'react-native-spinkit';

import { scale } from '../../utils/scallingUtils';

export const Screen = styled.View`
  flex: 1;
  background-color: #f8f8f8;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled(Spinner).attrs({
    type: "ThreeBounce",
    color: "#348EAC",
    size: scale(72)
})``;