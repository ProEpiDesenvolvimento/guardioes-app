import Reactotron, {
    networking,
    trackGlobalErrors,
} from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage'

if (__DEV__) {
    const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
        .configure()
        .use(
            networking(),
            trackGlobalErrors({
                offline: true,
            })
        )
        .useReactNative()
        .connect()

    console.tron = tron
    tron.clear()
}
