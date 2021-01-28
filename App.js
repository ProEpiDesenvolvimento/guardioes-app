import React, { useEffect } from 'react'
import OneSignal from 'react-native-onesignal'

import { NavigationContainer } from '@react-navigation/native'
import AppProvider from './src/hooks'
import Routes from './src/routes'

import './src/config/ReactotronConfig'

const Guardioes = () => {
    const onReceived = (notification) => {
        console.log('Notification received: ', notification)
    }

    const onOpened = (openResult) => {
        console.log('Message: ', openResult.notification.payload.body)
        console.log('Data: ', openResult.notification.payload.additionalData)
        console.log('isActive: ', openResult.notification.isAppInFocus)
        console.log('openResult: ', openResult)
    }

    const onIds = (device) => {
        console.log('Device info: ', device)
    }

    useEffect(() => {
        OneSignal.init('61c9e02a-d703-4e1c-aff1-3bce49948818', {
            kOSSettingsKeyAutoPrompt: true,
        })

        OneSignal.addEventListener('received', onReceived)
        OneSignal.addEventListener('opened', onOpened)
        OneSignal.addEventListener('ids', onIds)

        return () => {
            OneSignal.removeEventListener('received', onReceived)
            OneSignal.removeEventListener('opened', onOpened)
            OneSignal.removeEventListener('ids', onIds)
        }
    }, [])

    return (
        <AppProvider>
            <NavigationContainer>
                <Routes />
            </NavigationContainer>
        </AppProvider>
    )
}

export default Guardioes
