import React from 'react'

import Feather from 'react-native-vector-icons/Feather'

import {
    TipContainer,
    StatusTip,
    StatusTitle,
    StatusMessage,
    CloseTipButton,
    CloseTip,
} from './styles'
import { scale } from '../../utils/scalling'

const UserTip = (props) => {
    const { icon, title, message, isCloseable, onClose, alert } = props

    const TipIcon = icon || null
    const tipTitle = title || ''
    const tipMessage = message || ''
    const showClose = isCloseable || false
    const funcClose = onClose || null
    const active = alert || false

    return (
        <TipContainer alert={active}>
            {TipIcon}
            <StatusTip>
                <StatusTitle>{tipTitle}</StatusTitle>
                <StatusMessage>{tipMessage}</StatusMessage>
            </StatusTip>

            {showClose ? (
                <CloseTipButton onPress={funcClose}>
                    <CloseTip>
                        <Feather name='x' size={scale(24)} color='#ffffff' />
                    </CloseTip>
                </CloseTipButton>
            ) : null}
        </TipContainer>
    )
}

export default UserTip
