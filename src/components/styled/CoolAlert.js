import styled from 'styled-components';

import AwesomeAlert from 'react-native-awesome-alerts';

import { scale, percentage } from '../../utils/scallingUtils';

export const CoolAlert = styled(AwesomeAlert).attrs({
    overlayStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    contentContainerStyle: {
        borderRadius: scale(18),
        padding: scale(16)
    },
    titleStyle: {
        fontFamily: 'ArgentumSans-SemiBold',
        fontSize: scale(16),
        color: '#32323B',
        paddingVertical: 0,
        paddingHorizontal: 0,
        paddingBottom: scale(16),
    },
    messageStyle: {
        fontFamily: 'ArgentumSans',
        fontSize: scale(14),
        paddingTop: 0,
    },
    confirmButtonColor: '#5DD39E',
    confirmButtonStyle: {
        borderRadius: scale(10),
        paddingHorizontal: scale(10),
        paddingVertical: scale(8)
    },
    confirmButtonTextStyle: {
        fontFamily: 'ArgentumSans-Medium',
        fontSize: scale(14)
    },
    cancelButtonColor: '#F18F01',
    cancelButtonStyle: {
        borderRadius: scale(10),
        paddingHorizontal: scale(10),
        paddingVertical: scale(8)
    },
    cancelButtonTextStyle: {
        fontFamily: 'ArgentumSans-Medium',
        fontSize: scale(14)
    }
})``;