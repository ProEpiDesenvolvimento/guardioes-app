import React from 'react'
import { SafeAreaView, StatusBar, Platform } from 'react-native'

import { StatusBarIOS } from './styles'

const StatusBarGDS = (props) => {
    const transparency = !!props.translucent

    const color = props.light
        ? transparency
            ? 'rgba(93, 211, 158, 0.8)'
            : 'rgb(93, 211, 158)'
        : transparency
            ? 'rgba(52, 142, 172, 0.8)'
            : 'rgb(52, 142, 172)'

    return (
        <>
            {Platform.OS === 'ios' ? (
                <>
                    {transparency ? (
                        <StatusBarIOS backgroundColor={color} />
                    ) : (
                        <SafeAreaView
                            style={{ flex: 0, backgroundColor: color }}
                        />
                    )}
                    <StatusBar barStyle='light-content' />
                </>
            ) : (
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={color}
                    translucent={transparency}
                />
            )}
        </>
    )
}

export default StatusBarGDS
