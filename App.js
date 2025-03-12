import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { ONESIGNAL_APP_ID } from 'react-native-dotenv'
import { LogLevel, OneSignal } from 'react-native-onesignal'

import { NavigationContainer } from '@react-navigation/native'

import AppProvider from './src/hooks'
import Routes from './src/routes'
import './src/config/ReactotronConfig'

const Guardioes = () => {
    const [isSubscribed, setIsSubscribed] = useState(null)

    useEffect(() => {
        const initOneSignal = async () => {
            OneSignal.Debug.setLogLevel(LogLevel.Verbose)
            OneSignal.initialize(ONESIGNAL_APP_ID)
            OneSignal.Notifications.requestPermission(true)

            // Method for listening for notification clicks
            OneSignal.Notifications.addEventListener('click', (event) => {
                console.log('OneSignal: notification clicked:', event)
            })

            const deviceState = await OneSignal.Notifications.getPermissionAsync()
            setIsSubscribed(deviceState)
            console.log('OneSignal is permitted?', deviceState)
        }

        initOneSignal()
    }, [])

    return (
        <NavigationContainer>
            <AppProvider>
                <Routes />
            </AppProvider>
        </NavigationContainer>
    )
}

export default Guardioes
