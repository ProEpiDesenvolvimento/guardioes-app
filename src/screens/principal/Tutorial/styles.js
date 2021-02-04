import styled from 'styled-components';

import { scale, percentage } from '../../../utils/scalling';

export const ScrollViewStyled = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#f8f8f8',
        flexGrow: 1,
        paddingVertical: percentage(7),
        paddingHorizontal: percentage(7),
    }
})``;

export const Title = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(20)}px;
    text-align: center;
    color: #348EAC;
    padding: 0;
`;

export const Subtitle = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    text-decoration-line: underline;
    color: #348EAC;
    margin-top: ${scale(20)}px;
    margin-bottom: ${scale(10)}px;
`;

export const ImageContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: ${scale(20)}px;
    margin-bottom: ${scale(20)}px;
`;

export const BodyText = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(14)}px;
    text-align: justify;
    color: #2b3d51;
`;