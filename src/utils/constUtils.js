import { Alert, Linking } from 'react-native';

import Geolocation from 'react-native-geolocation-service';

export const getNameParts = (fullName, firstandLast = false) => {
    if (fullName) {
        let nameParts = fullName.split(" ");
        let length = nameParts.length;

        if (firstandLast && length > 1) {
            return `${nameParts[0]} ${nameParts[length-1]}`;
        }
        else {
            return nameParts[0];
        }
    }
}

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
    Geolocation.getCurrentPosition(
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
