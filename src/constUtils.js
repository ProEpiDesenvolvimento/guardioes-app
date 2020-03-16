import { Alert, Linking } from 'react-native';

export const app_token = 'd41d8cd98f00b204e9800998ecf8427e';

//export const API_URL = 'http://192.168.0.10:3001';
//export const API_URL = 'http://192.168.43.41:3001';  //UnB 
//export const API_URL = 'https://apiguardioes.herokuapp.com'; //Heroku
//export const API_URL = 'http://10.0.2.2:3001';
export const API_URL = 'http://gds.proepi.org.br'; //live


export const Redirect = (titulo, message, url) => {
    Alert.alert(
        `${titulo}`,
        `${message}`,
        [
            { text: "Cancelar", style: 'cancel' },
            { text: "Ok", onPress: () => Linking.openURL(`${url}`) }
        ]
    )
}

export const userLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({
                userLatitude: position.coords.latitude,
                userLongitude: position.coords.longitude,
                error: null,
            });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 50000 },
    );
}
