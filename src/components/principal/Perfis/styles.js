import styled from 'styled-components';

import ShadowView from 'react-native-simple-shadow-view';

import { scale, percentage } from '../../../utils/scallingUtils';

export const ScrollViewStyled = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#F8F8F8',
        flexGrow: 1,
        paddingTop: percentage(7),
        paddingHorizontal: percentage(7),
    }
})``;

const Profile = `
    flex-direction: row;
    border-radius: ${scale(18)}px;
    margin-bottom: ${percentage(7)}px;
    padding: ${scale(15)}px;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 10px;
    shadow-offset: 0px 4px;
`;

export const User = styled(ShadowView).attrs({
})`
    ${Profile}
    background-color: #348EAC;
`;

export const AvatarWrapper = styled.View`
    justify-content: center;
    padding-right: ${percentage(4)}px;
`;

export const InfoContainer = styled.View`
    flex: 1;
    flex-direction: row;
`;

export const InfoWrapper = styled.View`
    flex: 1;
    justify-content: center;
`;

export const Name = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    color: #ffffff;
`;

export const Relation = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: #ffffff;
`;

export const ButtonsWrapper = styled.View`
    justify-content: center;
`;

export const HouseholdWrapper = styled.View`
    padding-horizontal: ${scale(9)}px;
    margin-bottom: ${percentage(6)}px;
`;

export const HouseholdTitle = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(16)}px;
    color: #32323B;
`;

export const Household = styled(ShadowView).attrs({
})`
    ${Profile}
    background-color: #ffffff;
`;

export const HouseholdName = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    color: #348EAC;
`;

export const HouseholdRelation = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: #c4c4c4;
`;