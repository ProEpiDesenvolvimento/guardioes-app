import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { ONESIGNAL_APP_ID } from 'react-native-dotenv'
import OneSignal from 'react-native-onesignal'

import { enableScreens } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native'

import AppProvider from './src/hooks'
import Routes from './src/routes'
import './src/config/ReactotronConfig'

enableScreens()

const Guardioes = () => {
    const [isSubscribed, setIsSubscribed] = useState(null)

    useEffect(() => {
        const initOneSignal = async () => {
            /* ONESIGNAL SETUP */
            OneSignal.setAppId(ONESIGNAL_APP_ID)
            OneSignal.setLogLevel(5, 0)
            OneSignal.promptForPushNotificationsWithUserResponse((response) => {
                console.log('Prompt response:', response)
            })

            /* ONESIGNAL HANDLERS */
            OneSignal.setNotificationWillShowInForegroundHandler(
                (notifReceivedEvent) => {
                    console.log(
                        'OneSignal: notification will show in foreground:',
                        notifReceivedEvent
                    )
                    const notif = notifReceivedEvent.getNotification()

                    const button1 = {
                        text: 'Cancel',
                        onPress: () => {
                            notifReceivedEvent.complete()
                        },
                        style: 'cancel',
                    }

                    const button2 = {
                        text: 'Confirm',
                        onPress: () => {
                            notifReceivedEvent.complete(notif)
                        },
                    }

                    Alert.alert(notif.title, notif.body, [button1, button2], {
                        cancelable: false,
                    })
                }
            )
            OneSignal.setNotificationOpenedHandler((notification) => {
                console.log('OneSignal: notification opened:', notification)
            })
            OneSignal.addSubscriptionObserver((event) => {
                console.log('OneSignal: subscription changed:', event)
                setIsSubscribed(event.to.isSubscribed)
            })
            OneSignal.addPermissionObserver((event) => {
                console.log('OneSignal: permission changed:', event)
            })

            const deviceState = await OneSignal.getDeviceState()
            setIsSubscribed(deviceState.isSubscribed)
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
