import Reactotron, { trackGlobalErrors } from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage'

if (__DEV__) {
    const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
        .configure()
        .use(
            trackGlobalErrors({
                offline: true,
            })
        )
        .useReactNative()
        .connect()

    console.tron = tron
    tron.clear()
}
