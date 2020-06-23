import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import ClusteredMapView from '../../utils/MarkerClustering'
import clusterImages from '../../utils/MarkerClustering/imgImport'
import mapStyle from '../../utils/MarkerClustering/mapStyle'
import { Marker } from 'react-native-maps';
import { API_URL } from 'react-native-dotenv';
import translate from '../../../locales/i18n';
import Geolocation from 'react-native-geolocation-service';
import poligonoBR from '../../utils/DF.json'

const greenMarker = require('../../imgs/mapIcons/green-marker.png')
const redMarker = require('../../imgs/mapIcons/red-marker.png')
const CLUSTER_SIZE_DIVIDER = 4

const INIT_REGION = {
    latitude: -15.7194724,
    longitude: -47.774146,
    latitudeDelta: 5,
    longitudeDelta: 5
}

class Maps extends Component {
    static navigationOptions = {
        title: translate("maps.title")
    }

    constructor(props) {
        super(props);
        this.props.navigation.addListener('didFocus', payload => {
            //console.warn(payload)
            //this.fetchData();
            this.getLocation();
        });
        this.state = {
            isLoading: true,
            dataSource: [],
            dataFilterd: [],
            polygonState: "Federal District",
            mapViewPolygon: false
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        const userToken = await RNSecureStorage.get('userToken');
        this.setState({ userToken });
        this.getSurvey();
    }

    getSurvey = async () => {//Get Survey
        let localpin = JSON.parse(await AsyncStorage.getItem('localpin'))
        return fetch(`${API_URL}/surveys/week`, {
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (localpin !== null) {
                    this.setState({
                        dataSource: [...responseJson.surveys, localpin]
                    })
                } else {
                    this.setState({
                        dataSource: responseJson.surveys
                    })
                }
                //this.getSurveyPerState() //Lógica que filtra casos de covid
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
                    if (data.symptom.includes("Febre") && (data.symptom.includes("DordeGarganta") || data.symptom.includes("DificuldadeParaRespirar") || data.symptom.includes("Tosse") || data.symptom.includes("Cansaco") || data.symptom.includes("Mal-estar"))) {
                        dataFilterd.push(data)
                        covidCasesInState = covidCasesInState + 1
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
                fillColor = `rgba(${parseInt(colorR)}, 255, 0, 0.5)`
            } else {
                colorG = 255 - ((255 * numCase) / maxCase);
                fillColor = `rgba(255, ${parseInt(colorG)}, 0, 0.5)`
            }
        }
        return fillColor
    }

    coordsFilter() {
        const markers = []
        this.state.dataSource.map(mark => {
            markers.push({
                location: {
                    latitude: mark.latitude,
                    longitude: mark.longitude,
                },
                symptoms: (mark.symptom && mark.symptom.length > 0)
            })
        })
        return markers
    }

    renderCluster = (cluster) => {
        const pointCount = cluster.pointCount.toString(),
            coordinate = cluster.coordinate,
            clusterId = cluster.clusterId

        // Clustering engine is MapBox https://github.com/mapbox/supercluster
        const clusteringEngine = this.map.getClusteringEngine(),
            clusteredPoints = clusteringEngine.getLeaves(clusterId, 10000)

        const healthyPercentage = clusteredPoints.filter(x => !x.properties.item.symptoms).length / pointCount
        let reqNum = Math.floor(healthyPercentage * 100.0)
        while (!clusterImages.imgLevels.includes(reqNum)) {
            reqNum--
        }
        let orderOfMagnitude = Math.floor(Math.log(pointCount) / Math.log(CLUSTER_SIZE_DIVIDER))
        if (orderOfMagnitude < 0) orderOfMagnitude = 0
        if (orderOfMagnitude > 6) orderOfMagnitude = 6
        return (
            <Marker
                anchor={{x:0.5,y:0.5}}
                centerOffset={{x:0.5,y:0.5}}
                coordinate={coordinate}
                style={{width:200, height: 200}}
                image={clusterImages.reqFiles[orderOfMagnitude][clusterImages.imgLevels.indexOf(reqNum)]}
                title={'Pessoas: ' + pointCount}
                description={'Sintomáticos: ' + Math.floor((1.0 - healthyPercentage) * 100.0) + '%'}
                tracksViewChanges={false}>
            </Marker>
        )
    }

    renderBadMarker = (data) => <Marker key={data.id || Math.random()} coordinate={data.location} image={redMarker} style={{ width: 13, height: 14 }} />
    renderGoodMarker = (data) => <Marker key={data.id || Math.random()} coordinate={data.location} image={greenMarker} style={{ width: 13, height: 14 }} />

    render() {
        return (
            <View style={styles.container}>
                <ClusteredMapView
                    loadingEnabled={true}
                    showsPointsOfInterest={true}
                    showsUserLocation={true}
                    style={{ flex: 1 }}
                    data={this.coordsFilter()}
                    initialRegion={INIT_REGION}
                    customMapStyle={mapStyle}
                    ref={(r) => { this.map = r }}
                    renderMarker={{ good: this.renderGoodMarker, bad: this.renderBadMarker }}
                    renderCluster={this.renderCluster} >
                </ClusteredMapView>

                {/*<TouchableOpacity style={styles.mapChange}
                    onPress={() => { this.state.mapViewPolygon == false ? this.setState({ mapViewPolygon: true }) : this.setState({ mapViewPolygon: false }) }}>
                    <Text style={styles.textButton}>Visualizar {this.state.mapViewPolygon == false ? "Poligonos" : "Mapa"}</Text>
        </TouchableOpacity>*/}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-end' },
    map: { flex: 1 },
    mapChange: {
        position: 'absolute',
        bottom: '2%',
        left: '25%',
        width: '50%',
        height: '5%',
        borderRadius: 90,
        backgroundColor: 'rgba(22, 107, 135, 0.25)',
        borderColor: 'rgba(22, 107, 135, 1)',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        fontWeight: 'bold',
        fontFamily: 'roboto',
        fontSize: 15,
        color: 'rgba(22, 107, 135, 1)'
    },
    myClusterTextStyle: {
        color: 'white'
    }
});

//make this component available to the app
export default Maps;