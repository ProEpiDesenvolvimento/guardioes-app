import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { API_URL } from '../../constUtils';
import translate from '../../../locales/i18n';

class Maps extends Component {
    static navigationOptions = {
        title: translate("maps.title")
    }

    constructor(props) {
        super(props);
        this.props.navigation.addListener('didFocus', payload => {
            //console.warn(payload)
            this.getInfos();
            this.getLocation();
        });
        this.state = {
            userLatitude: 0,
            userLongitude: 0,
            isLoading: true,
            dataSource: [],
        }
    }

    getInfos = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        this.setState({ userToken });
        this.getSurvey();
    }

    getSurvey = () => {//Get Survey
        return fetch(`${API_URL}/surveys/all_surveys`, {
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.surveys
                })
            })
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001
                    },
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 50000 },
        );
    }

    render() {
        let markers = this.state.dataSource;
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.region}
                    style={styles.map}
                >
                    {markers.map((marker, index) => {
                        let coordinates = { latitude: marker.latitude, longitude: marker.longitude }
                        if (marker.symptom && marker.symptom.length) {
                            return (
                                <Marker
                                    key={index}
                                    coordinate={coordinates}
                                    description={marker.symptom.toString()}
                                    title={translate("maps.reportBad")}
                                />
                            )
                        }
                        return (
                            <Marker
                                key={index}
                                coordinate={coordinates}
                                title={translate("maps.reportGood")}
                                pinColor='rgba(136,196,37, 1)'

                            />
                        )
                    }
                    )}
                </MapView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-end' },
    map: { flex: 1 },
});

//make this component available to the app
export default Maps;
