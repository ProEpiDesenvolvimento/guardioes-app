import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from '../../utils/constUtils';
import translate from '../../../locales/i18n';
import Geolocation from 'react-native-geolocation-service';
import poligonoBR from '../../utils/DF.json'
import MarkerCluster from '../../utils/MarkerClustering/MarkerClustering'

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
            //this.getInfos();
            // this.getLocation();
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
        this.getInfos()
    }

    getInfos = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
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
                this.getSurveyPerState()
            })
    }

    render() {
        return (
            <MarkerCluster
                initialRegion={INIT_REGION}
                coords={this.state.dataSource} />
        )
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
    myClusterStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: 90,
        width: 40,
        height: 40
    },
    myClusterTextStyle: {
        color: 'white'
    }
});

//make this component available to the app
export default Maps;
