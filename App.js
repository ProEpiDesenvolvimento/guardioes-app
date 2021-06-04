import React, { useEffect, useState, useCallback } from 'react'
import OneSignal from 'react-native-onesignal'
import { enableScreens } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native'
import AppProvider from './src/hooks'
import Routes from './src/routes'

import './src/config/ReactotronConfig'

enableScreens()

const Guardioes = () => {

    const [isSubscribed, setIsSubscribed] = useState(null)

    const initOneSignal = useCallback(async () => {
        /* O N E S I G N A L   S E T U P */
        OneSignal.setAppId("61c9e02a-d703-4e1c-aff1-3bce49948818");
        OneSignal.setLogLevel(6, 0);
        OneSignal.setRequiresUserPrivacyConsent(false);
        OneSignal.promptForPushNotificationsWithUserResponse(response => {
            console.log("Prompt response:", response);
        });

        /* O N E S I G N A L  H A N D L E R S */
        OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
            console.log("OneSignal: notification will show in foreground:", notifReceivedEvent);
            let notif = notifReceivedEvent.getNotification();

            const button1 = {
                text: "Cancel",
                onPress: () => { notifReceivedEvent.complete(); },
                style: "cancel"
            };

            const button2 = { text: "Complete", onPress: () => { notifReceivedEvent.complete(notif); }};

            Alert.alert("Complete notification?", "Test", [ button1, button2], { cancelable: true });
        });
        OneSignal.setNotificationOpenedHandler(notification => {
            console.log("OneSignal: notification opened:", notification);
        });
        OneSignal.setInAppMessageClickHandler(event => {
            console.log("OneSignal IAM clicked:", event);
        });
        OneSignal.addEmailSubscriptionObserver((event) => {
            console.log("OneSignal: email subscription changed: ", event);
        });
        OneSignal.addSubscriptionObserver(event => {
            console.log("OneSignal: subscription changed:", event);
            setIsSubscribed(event.to.isSubscribed);
        });
        OneSignal.addPermissionObserver(event => {
            console.log("OneSignal: permission changed:", event);
        });
  
        const deviceState = OneSignal.getDeviceState();

        setIsSubscribed(deviceState.isSubscribed);
        }, []) 

        useEffect(() => {
            initOneSignal()
        }, [initOneSignal])
        

    return (
        <NavigationContainer>
            <AppProvider>
                <Routes />
            </AppProvider>
        </NavigationContainer>
    )
}

export default Guardioes
