import { NetInfo, Alert } from 'react-native';
import translate from '../../locales/i18n';

const isConnected = () =>
  NetInfo.isConnected.fetch().then((connected) =>
    connected
      ? this.verifyLocalization()
      : Alert.alert(
          translate('noInternet.noInternetConnection'),
          translate('noInternet.ohNo'),
          [
            {
              text: translate('noInternet.alertAllRightMessage'),
              onPress: () => null,
            },
          ]
        )
  );

export { isConnected };
