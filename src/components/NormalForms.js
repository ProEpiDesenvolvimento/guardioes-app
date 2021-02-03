import styled from 'styled-components';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import ModalSelector from 'react-native-modal-selector';
import DatePicker from 'react-native-datepicker';
import { CheckBox } from 'react-native-elements';
import ShadowView from 'react-native-simple-shadow-view';

import { scale, percentage } from '../utils/scallingUtils';

export const Container = styled.View`
    flex: 1;
    background-color: #f8f8f8;
`;

export const KeyboardScrollView = styled(KeyboardAwareScrollView).attrs({
    contentContainerStyle: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: percentage(7),
        paddingHorizontal: percentage(7),
    }
})``;

export const FormInline = styled.View`
    width: 100%;
    align-items: center;
    margin-bottom: ${scale(16)}px;
`;

export const FormLabel = styled.Text`
    align-self: flex-start;
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: ${props => (props.light ? '#ffffff' : '#32323B')};
    text-align: left;
    margin-bottom: ${scale(12)}px;
`;

export const NormalInput = styled.TextInput`
    width: 100%;
    min-height: ${scale(36)}px;
    background-color: #ffffff;
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: #32323B;
    border-radius: ${scale(12)}px;
    padding-vertical: 0px;
    padding-horizontal: ${scale(12)}px;
`;

export const ReadOnlyInput = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    color: #c4c4c4;
    text-align: center;
`;

export const FormGroup = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${scale(16)}px;
`;

export const FormGroupChild = styled.View`
    width: 48%;
    align-items: center;
    justify-content: space-between;
    margin: 0;
`;

export const FormInlineCheck = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${scale(12)}px;
`;

export const Selector = styled(ModalSelector).attrs({
    initValueTextStyle: {
        fontFamily: 'ArgentumSans',
        fontSize: scale(13),
        color: '#32323B'
    },
    touchableActiveOpacity: 0.5,
    selectStyle: {
        backgroundColor: '#ffffff',
        borderRadius: scale(12),
        borderWidth: 0,
    },
    selectTextStyle: {
        fontFamily: 'ArgentumSans',
        fontSize: scale(13),
        color: '#32323B'
    },
    overlayStyle: {
        padding: '10%'
    },
    optionContainerStyle: {
        backgroundColor: "#ffffff",
        borderRadius: scale(14)
    },
    optionStyle: {
        borderBottomWidth: 0,
    },
    optionTextStyle: {
        fontFamily: 'ArgentumSans',
        fontSize: scale(14),
        color: '#348EAC'
    },
    cancelContainerStyle: {
        backgroundColor: '#ffffff',
        borderRadius: scale(14),
        marginTop: scale(10)
    },
    cancelStyle: {
        backgroundColor: '#348EAC',
        padding: scale(10),
        borderRadius: scale(12),
    },
    cancelTextStyle: {
        fontFamily: 'ArgentumSans',
        fontSize: scale(14),
        color: '#ffffff'
    }
})`
    width: 90%;
`;

export const DateSelector = styled(DatePicker).attrs({
    showIcon: false,
    androidMode: 'spinner',
    customStyles: {
        dateInput: {
            borderWidth: 0
        },
        placeholderText: {
            justifyContent: "center",
            fontFamily: 'ArgentumSans',
            fontSize: scale(13),
            color: '#32323B'
        },
        dateText: {
            justifyContent: "center",
            fontFamily: 'ArgentumSans',
            fontSize: scale(13),
            color: '#32323B'
        }
    }
})`
    width: 90%;
    border-radius: ${scale(12)}px;
    background-color: #ffffff;
`;

export const CheckBoxStyled = styled(CheckBox).attrs({
    containerStyle: {
        flex: 1,
        alignSelf: "center",
        backgroundColor: '#ffffff',
        borderRadius: scale(15),
        borderWidth: 0,
        marginLeft: 0,
        marginRight: 0
    },
    textStyle:{
        fontFamily: 'ArgentumSans',
        fontSize: scale(14),
        color: '#32323B'
    },
    iconType: 'feather',
    checkedIcon: 'check-circle',
    uncheckedIcon: 'circle',
    checkedColor: '#348EAC',
    uncheckedColor: '#c4c4c4',
    size: scale(25),
})``;

export const CheckLabel = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5
})`
    margin-left: ${scale(10)}px;
`;

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5
})``;

export const SendContainer = styled(ShadowView).attrs({
})`
    align-self: center;
    background-color: #348EAC;
    border-radius: ${scale(16)}px;
    margin-bottom: ${scale(10)}px;
    padding-vertical: ${scale(10)}px;
    padding-horizontal: ${percentage(12)}px;
    shadow-color: #348EAC;
    shadow-opacity: 0.4;
    shadow-radius: 10px;
    shadow-offset: 0px 0px;
`;

export const SendText = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(14)}px;
    text-align: center;
    color: #ffffff;
`;

export const ModalContainer = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
`;

export const ModalBox = styled(ShadowView).attrs({
})`
    max-height: 90%;
    width: 90%;
    background-color: #ffffff;
    border-radius: ${scale(18)}px;
    align-self: center;
    justify-content: center;
    padding: ${scale(16)}px;
    shadow-color: #000000;
    shadow-opacity: 0.2;
    shadow-radius: 10px;
    shadow-offset: 0px 0px;
`;

export const ModalTitle = styled.Text`
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(16)}px;
    text-align: center;
    color: #348EAC;
    margin-bottom: ${scale(12)}px;
`;

export const ModalText = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(14)}px;
    text-align: justify;
    color: #32323B;
    margin-bottom: ${scale(12)}px;
`;

export const ModalButton = styled.View`
    width: 50%;
    align-self: center;
    justify-content: center;
    margin-bottom: ${scale(8)}px;
`;

export const ModalButtonText = styled.Text`
    font-family: ArgentumSans-Medium;
    font-size: ${scale(14)}px;
    text-align: center;
    color: #348EAC;
`;