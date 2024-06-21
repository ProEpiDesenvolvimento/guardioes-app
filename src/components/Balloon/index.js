import React from 'react'
import moment from 'moment'

import { StyleSheet, Text, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Avatar } from 'react-native-elements'

import { scale } from '../../utils/scalling'
import { getInitials, getNameParts } from '../../utils/consts'
import { useUser } from '../../hooks/user'

const styles = StyleSheet.create({
    bubbleWrapper: {
        flexDirection: 'row',
    },
    bubbleWrapperSent: {
        alignSelf: 'flex-end',
        marginLeft: 40,
    },
    bubbleWrapperReceived: {
        alignSelf: 'flex-start',
        marginRight: 40,
    },
    balloon: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 16,
        marginBottom: 10,
    },
    balloonSent: {
        backgroundColor: Colors.white,
    },
    balloonReceived: {
        backgroundColor: Colors.primary,
    },
    balloonText: {
        fontSize: 16,
    },
    balloonTextSent: {
        color: Colors.black,
    },
    balloonTextReceived: {
        color: Colors.white,
    },
    balloonTextSentName: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: 'bold',
    },
    avatar: {
        borderColor: '#ffffff',
        borderWidth: 0,
        marginRight: 8,
    },
})

const Balloon = ({ message }) => {
    const { user } = useUser()

    const balloonColor = styles.balloonReceived
    const balloonTextColor = styles.balloonTextReceived
    const bubbleWrapper = styles.bubbleWrapperReceived

    const formatSenderName = (name, initials) => {
        if (name === 'GDS App Bot') {
            if (!initials) {
                return 'Você'
            }
            return getNameParts(user.user_name)
        }
        return getNameParts(name)
    }

    const formatISODate = (dateString) => {
        const date = moment(dateString, 'YYYY-MM-DD HH:mm:ss')
        return date.format('[em] DD/MM/YYYY [às] HH:mm[:]')
    }

    return (
        <View>
            <View
                style={{
                    ...styles.bubbleWrapper,
                    ...bubbleWrapper,
                    ...styles.balloon,
                    ...balloonColor,
                }}
            >
                <View style={{ }}>
                    <Avatar
                        containerStyle={[styles.avatar]}
                        size={scale(22)}
                        source={null}
                        title={getInitials(
                            formatSenderName(message.author_id.name, true)
                        )}
                        rounded
                    />
                </View>
                <View style={{ }}>
                    <Text
                        style={{
                            ...styles.balloonTextSentName,
                            ...balloonTextColor,
                        }}
                    >
                        {formatSenderName(message.author_id.name, false)}{' '}
                        {formatISODate(message.date)}
                    </Text>
                    <Text
                        style={{ ...styles.balloonText, ...balloonTextColor }}
                    >
                        {message.body}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Balloon
