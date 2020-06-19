import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from '../../utils/constUtils';
import translate from '../../../locales/i18n';
import MarkerCluster from '../../utils/MarkerClustering/MarkerCluster'

const INIT_REGION = {           // BRASILIA - BRAZIL
    latitude: -15.8194724,
    longitude: -47.874146,
    zoom: 11
}

class Maps extends Component {
    static navigationOptions = {
        title: translate("maps.title")
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            surveys: [],
            dataFilterd: [],
            polygonState: "Federal District",
            mapViewPolygon: false
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        this.setState({ userToken });
        this.getWeeklySurveys();
        this.getGoogleMapsApiKey();
    }

    getWeeklySurveys = async () => {
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
                        surveys: [...responseJson.surveys, localpin]
                    })
                } else {
                    this.setState({
                        surveys: responseJson.surveys
                    })
                }
            })
    }

    getGoogleMapsApiKey = async () => {
        return fetch(`${API_URL}/googlemapsapikey`, {
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    googlemapsapikey: responseJson.googlemapsapikey
                })
            })
    }

    render() {
        return (
            <MarkerCluster
                initialRegion={INIT_REGION}
                coords={this.state.surveys}
                googlemapsapikey={this.state.googlemapsapikey} />
        )
    }
}

export default Maps;
