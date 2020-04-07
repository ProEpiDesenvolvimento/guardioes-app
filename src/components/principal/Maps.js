import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Button } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { API_URL } from '../../constUtils';
import translate from '../../../locales/i18n';
import Geolocation from 'react-native-geolocation-service';
import poligonoBR from '../../utils/polygonBR.json'

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
        Geolocation.getCurrentPosition(
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

    generatePolygon() {
        poligonoBR.features.map(municipio => {
            const MuniPoly = municipio.geometry.coordinates[0].map(coordsArr => {
                let coords = {
                    latitude: coordsArr[1],
                    longitude: coordsArr[0],
                }
                return coords
            });
            console.warn(MuniPoly)
            return (
                <Polygon
                    coordinates={MuniPoly}
                />
            )
        })
    }

    insideSym(point, vs) {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
        let x = point[0]
        let y = point[1];
    
        let inside = false;
        for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            let xi = vs[i][0], yi = vs[i][1];
            let xj = vs[j][0], yj = vs[j][1];
    
            let intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
    
        return inside;
    };

    PolygonColor(Ncase) {
        if(Ncase > 0){
            fillColor = "rgba(255, 0, 0, 0.5);"
        } else {
            fillColor = "rgba(255, 0, 0, 0.0);"
        }
        return fillColor
    }

    render() {
        let markers = this.state.dataSource;
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.region}
                    style={styles.map}
                >
                    {poligonoBR.features.map(municipio => {
                        const MuniPoly = municipio.geometry.coordinates[0].map(coordsArr => {
                            let coords = {
                                latitude: coordsArr[1],
                                longitude: coordsArr[0],
                            }
                            return coords
                        });
                        const CoordsOnly = municipio.geometry.coordinates[0].map(coordsArr => {
                            let coords = [coordsArr[1], coordsArr[0]]
                            return coords
                        });
                        let contador = 0
                        markers.map(marker => {
                            if (this.insideSym([ marker.latitude, marker.longitude ], CoordsOnly) == true){
                                contador = contador + 1
                            }
                        })
                        return (
                            <Polygon
                                coordinates={MuniPoly}
                                strokeColor = "rgba(0, 81, 0, 0.0);"
                                fillColor = {this.PolygonColor(contador)}
                                onPress = {() => console.warn("Cidade: " + municipio.properties.name + " N Casos: " + contador)}
                            />
                        )
                    })}
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
