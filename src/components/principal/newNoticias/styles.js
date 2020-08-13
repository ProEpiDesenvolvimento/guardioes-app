import styled from 'styled-components/native';

import ShadowView from 'react-native-simple-shadow-view';

import { scale, percentage } from '../../../utils/scallingUtils';

export const Container = styled.View`
  background-color: #348eac;
  flex: 1;
`;

export const List = styled.FlatList.attrs({
    contentContainerStyle: {padding: scale(5)},
    showsVerticalScrollIndicator: false
})`
`;

export const TwitterOptionContainer = styled.View`
    margin-right: ${scale(6)}%;
    margin-left: ${scale(6)}%;
    margin-bottom: ${scale(6)}%;
    align-items: center;
`;

export const TwitterOption = styled.View`
    align-self: center;
    flex-direction: row;
`;

export const OptionLeft = styled.TouchableOpacity`
    height: ${scale(50)}px;
    width: ${scale(150)}px;
    background: #5DD39E;
    border-bottom-left-radius: 22px;
    border-top-left-radius: 22px;
    margin-right: ${scale(2)}px;
    align-items: center;
    justify-content: center;
`;

export const OptionRight = styled.TouchableOpacity`
    height: ${scale(50)}px;
    width: ${scale(150)}px;
    background: #5DD39E;
    border-bottom-right-radius: 22px;
    border-top-right-radius: 22px;
    margin-left: ${scale(2)}px;
    align-items: center;
    justify-content: center;
`;

export const OptionText = styled.Text`
    font-size: ${scale(14)}px;
    font-family: ArgentumSans-Medium;
    color: white;
`;


export const ScrollNoticias = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexGrow: 1,
        paddingTop: percentage(6),
        paddingHorizontal: percentage(7),
    }
})``;

export const NoticiasTitle = styled.Text`
    font-size: ${scale(19)}px;
    color: #32323B;
    font-family: ArgentumSans-SemiBold;
    include-font-padding: false;
    margin-bottom: ${scale(5)}px;
`;

export const FeedTitle = styled.Text`
    font-size: ${scale(14)}px;
    font-family: ArgentumSans-Medium;
    color: #c4c4c4;
    include-font-padding: false;
    margin-bottom: ${percentage(6)}px;
`;

export const NoticeContainer = styled(ShadowView).attrs({
})`
    flex: 1;
    background-color: #5DD39E;
    border-radius: ${scale(18)}px;
    padding: ${scale(16)}px;
    max-width: 100%; 
    margin-bottom: ${percentage(7)}px;
    shadow-color: #5DD39E;
    shadow-opacity: 0.4;
    shadow-radius: 4px;
    shadow-offset: 0px 2px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const TwitterInfo = styled.View`
`;

export const TwitterName = styled.Text`
    font-size: ${scale(16)}px;
    font-family: ArgentumSans-SemiBold;
    color: #ffffff;
`;

export const TwitterArroba = styled.Text`
    font-size: ${scale(14)}px;
    font-family: ArgentumSans-Medium;
    color: #348EAC;
`;

export const Data = styled.Text`
    font-size: ${scale(14)}px;
    font-family: ArgentumSans-Medium;
    color: #ffffff;
`;

export const NoticiaText = styled.Text` 
    font-size: ${scale(14)}px;
    color: #ffffff;
    font-family: ArgentumSans;
    margin-top: ${scale(10)}px;
`;

export const Imagem = styled.Image`
    margin-top: ${scale(8)}px;
    width: ${scale(260)}px;
    height: ${scale(80)}px;
    border-radius: 10px;
`;

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5
})``;