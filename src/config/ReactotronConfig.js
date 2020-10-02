import Reactotron from 'reactotron-react-native'
import { AsyncStorage } from 'react-native'

if (__DEV__){
    const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
        .configure()
        .useReactNative()
        .connect();

    console.tron = tron;

    tron.clear();
}