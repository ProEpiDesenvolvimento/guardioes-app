import React, { Component } from 'react'
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import RNSecureStorage from 'rn-secure-storage'
import ClusteredMapView from '../../utils/MarkerClustering'
import mapStyle from '../../utils/MarkerClustering/mapStyle'
import { API_URL } from 'react-native-dotenv'
import translate from '../../../locales/i18n'
import Geolocation from 'react-native-geolocation-service'
import poligonoBR from '../../utils/DF.json'
import AwesomeAlert from 'react-native-awesome-alerts'
import { Marker } from 'react-native-maps'

const greenMarker = require('../../imgs/mapIcons/green-marker.png')
const redMarker = require('../../imgs/mapIcons/red-marker.png')
const CLUSTER_SIZE_DIVIDER = 4

class Maps extends Component {
    static navigationOptions = {
        title: translate("maps.title")
    }

    constructor(props) {
        super(props)
        this.props.navigation.addListener('didFocus', payload => {
            //console.warn(payload)
            //this.fetchData()
        })
        this.state = {
            isLoading: true,
            dataSource: [],
            dataFilterd: [],
            polygonState: "Federal District",
            mapViewPolygon: false,
            showAlert: false,
            initialRegion: {
                latitude: -15.8194724,
                longitude: -47.924146,
                latitudeDelta: 0.3,
                longitudeDelta: 0.3
            },
            showUserLocation: false,
            mapKey: 0
        }
        this.getLocation()
    }
    
    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        const userToken = await RNSecureStorage.get('userToken')
        
        let showAlert = JSON.parse(await AsyncStorage.getItem('showMapTip'))
        if (showAlert == null) {
            showAlert = true
        }

        this.setState({ userToken, showAlert })
        this.getSurvey()
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
                    initialRegion: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.06,
                        longitudeDelta: 0.06
                    },
                    showUserLocation: true,
                    error: null,
                    mapKey: this.state.mapKey + 1 // This forces the map component to remount with the new initial region
                })
            },
            (error) => {},
            { enableHighAccuracy: true, timeout: 50000 },
        )
    }

    CoordInsidePolygon(point, vs) {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

        let x = point[0]
        let y = point[1]

        let inside = false
        for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            let xi = vs[i][0], yi = vs[i][1]
            let xj = vs[j][0], yj = vs[j][1]

            let intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
            if (intersect) inside = !inside
        }

        return inside
    }

    PolygonColor(numCase, maxCase) {
        let colorR = 0
        let colorG = 0

        if (numCase == 0) {
            fillColor = `rgba(0, 0, 0, 0.0)`
        }
        else {
            if (numCase <= (maxCase / 2)) {
                colorR = ((255 * numCase) / (maxCase / 2))
                fillColor = `rgba(${parseInt(colorR)}, 255, 0, 0.5)`
            } else {
                colorG = 255 - ((255 * numCase) / maxCase)
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

    renderBadMarker = (data) => <Marker key={data.id || Math.random()} coordinate={data.location} image={redMarker} tracksViewChanges={false} />
    renderGoodMarker = (data) => <Marker key={data.id || Math.random()} coordinate={data.location} image={greenMarker} tracksViewChanges={false} />

    render() {
        const {showAlert} = this.state
        return (
            <View style={styles.container}>
                <ClusteredMapView
                    key={this.state.mapKey}
                    showsUserLocation={this.state.showUserLocation}
                    style={styles.map}
                    data={this.coordsFilter()}
                    initialRegion={this.state.initialRegion}
                    customMapStyle={mapStyle}
                    renderMarker={{ good: this.renderGoodMarker, bad: this.renderBadMarker }}
                    CLUSTER_SIZE_DIVIDER={CLUSTER_SIZE_DIVIDER} // The log of number of points in cluster by this constant's base defines cluster image size
                    screenSizeClusterPercentage={0.13} // Cluster occupies 13% of screen 
                />
                <AwesomeAlert
                    show={showAlert}
                    message={translate(`maps.guide`)}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    cancelText="Entendido!"
                    cancelButtonColor="#55dd55"
                    onCancelPressed={() => {
                        this.setState({
                            showAlert: false
                        })
                        AsyncStorage.setItem('showMapTip', JSON.stringify(false))
                    }}
                />
                {/*<TouchableOpacity style={styles.mapChange}
                    onPress={() => { this.state.mapViewPolygon == false ? this.setState({ mapViewPolygon: true }) : this.setState({ mapViewPolygon: false }) }}>
                    <Text style={styles.textButton}>Visualizar {this.state.mapViewPolygon == false ? "Poligonos" : "Mapa"}</Text>
                </TouchableOpacity>*/}
            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-end' },
    map: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
    },
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
    }
})

//make this component available to the app
export default Maps