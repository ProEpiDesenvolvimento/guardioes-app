import styled from 'styled-components/native'

import { TouchableOpacity } from 'react-native'
import ShadowView from 'react-native-simple-shadow-view'

import { scale } from '../../utils/scalling'

export const TipContainer = styled(ShadowView).attrs({})`
    align-items: center;
    background-color: ${(props) => (props.alert ? '#f18f01' : '#5DD39E')};
    border-radius: ${scale(18)}px;
    padding: ${scale(20)}px;
    flex-direction: row;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 6px;
    shadow-offset: 0px 4px;
`

export const StatusTip = styled.View`
    align-items: flex-start;
    margin-left: ${scale(14)}px;
    flex-shrink: 1;
`

export const StatusTitle = styled.Text`
    color: white;
    font-family: ArgentumSans-SemiBold;
    font-size: ${scale(15)}px;
    include-font-padding: false;
    margin-bottom: ${scale(5)}px;
`

export const StatusMessage = styled.Text`
    color: white;
    font-family: ArgentumSans;
    font-size: ${scale(15)}px;
    include-font-padding: false;
`

export const CloseTipButton = styled(TouchableOpacity).attrs({
    activeOpacity: 0.5,
})`
    position: absolute;
    right: -${scale(8)}px;
    top: -${scale(8)}px;
    z-index: 1;
`

export const CloseTip = styled.View`
    align-items: center;
    background-color: #bdbdbd;
    border-radius: ${scale(22)}px;
    padding: ${scale(4)}px;
`
