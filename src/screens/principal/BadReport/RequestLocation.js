import { Platform, PermissionsAndroid } from 'react-native';
import translate from '../../../../locales/i18n';

const RequestLocation = async ({ navigation }) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: translate('locationRequest.requestLocationMessageTitle'),
        message: translate('locationRequest.requestLocationMessageMessage'),
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.warn(translate('locationRequest.requestDenied'));

      if (Platform.OS === 'android') {
        navigation.navigate('Home');
      }
    }
  } catch (err) {
    console.warn(err);
  }
};

export default RequestLocation;
