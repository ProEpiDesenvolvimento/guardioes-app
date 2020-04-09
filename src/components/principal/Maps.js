import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Button } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { API_URL } from '../../constUtils';
import translate from '../../../locales/i18n';
import Geolocation from 'react-native-geolocation-service';
import poligonoBR from '../../utils/DF.json'

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
            dataFilterd: [],
            polygonState: "Federal District"
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
                this.getSurveyPerState()
            })
    }

    getSurveyPerState = async () => {
        let dataFilterd = []
        let reportsInState = 0
        let badReportsInState = 0
        let covidCasesInState = 0

        this.state.dataSource.map(data => {
            if (data.state == this.state.polygonState) {
                reportsInState = reportsInState + 1
                if (data.symptom && data.symptom.length) {
                    badReportsInState = badReportsInState + 1
                    if(data.symptom.includes("Febre") && (data.symptom.includes("DordeGarganta") || data.symptom.includes("DificuldadeParaRespirar") || data.symptom.includes("Tosse") || data.symptom.includes("Cansaco") || data.symptom.includes("Mal-estar"))){
                        dataFilterd.push(data)
                        covidCasesInState = covidCasesInState + 1
                        console.warn(dataFilterd)
                    }
                }
            }
        })

        this.setState({
            dataFilterd: dataFilterd,
            reportsInState: reportsInState,
            badReportsInState: badReportsInState,
            covidCasesInState: covidCasesInState,
        })
    }

    getLocation() {
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.020,
                        longitudeDelta: 0.020
                    },
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 50000 },
        );
    }

    CoordInsidePolygon(point, vs) {
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

    PolygonColor(numCase, maxCase) {
        let colorR = 0
        let colorG = 0

        if (numCase == 0) {
            fillColor = `rgba(0, 0, 0, 0.0)`
        }
        else {
            if (numCase <= (maxCase / 2)) {
                colorR = ((255 * numCase) / (maxCase / 2));
                fillColor = `rgba(${parseInt(colorR)}, 255, 0, 0.7)`
            } else {
                colorG = 255 - ((255 * numCase) / maxCase);
                fillColor = `rgba(255, ${parseInt(colorG)}, 0, 0.7)`
            }
        }
        return fillColor
    }

    render() {
        return (
            <View style={styles.container}>
                <View><Button
                    title="TESTE"
                    onPress={() => this.getSurveyPerState()}
                /></View>
                <MapView
                    initialRegion={this.state.region}
                    style={styles.map}
                >
                    {poligonoBR.features.map(municipio => {
                        //Lista os limites do poligono para formação do poligono
                        const MuniPoly = municipio.geometry.coordinates[0].map(coordsArr => {
                            let coords = {
                                latitude: coordsArr[1],
                                longitude: coordsArr[0],
                            }
                            return coords
                        });

                        //Lista os limites do poligono para verificar se um ponto esta inserido nele
                        const CoordsOnly = municipio.geometry.coordinates[0].map(coordsArr => {
                            let coords = [coordsArr[1], coordsArr[0]]
                            return coords
                        });

                        //Verifica os casos de COVID dentro do poligono
                        let covidCasesInPolygon = 0
                        this.state.dataFilterd.map(survey => {
                            if (this.CoordInsidePolygon([survey.latitude, survey.longitude], CoordsOnly) == true) {
                                covidCasesInPolygon = covidCasesInPolygon + 1
                            }
                        })

                        //Cria o Poligono
                        return (
                            <Polygon
                                coordinates={MuniPoly}
                                strokeColor="rgba(0, 81, 0, 0.0);"
                                fillColor={this.PolygonColor(covidCasesInPolygon, this.state.badReportsInState)}
                                onPress={() => { console.warn("Cidade: " + municipio.properties.NM_SUBDIST + " Nº Casos: " + covidCasesInPolygon + " Maximo: " + this.state.covidCasesInState) }}
                            />
                        )
                    })}
                    {/*markers.map((marker, index) => {
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
                )*/}
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
