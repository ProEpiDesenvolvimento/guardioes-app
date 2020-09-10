import styled from 'styled-components/native';

import { scale, percentage } from '../../../utils/scallingUtils';

export const ScrollViewStyled = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#f8f8f8',
        flexGrow: 1,
        paddingVertical: percentage(6),
        paddingHorizontal: percentage(7),
    }
})``;

export const Title = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(20)}px;
    text-align: left;
    color: #348EAC;
    include-font-padding: false;
    line-height: ${scale(20)}px;
    padding: 0;
    margin-bottom: ${scale(10)}px;
`;

export const BodyText = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(14)}px;
    text-align: justify;
    color: #2b3d51;
    margin-bottom: ${scale(30)}px;
`;