import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

import { Marker } from 'react-native-maps'
import { useFocusEffect } from '@react-navigation/native'

import mapStyle from '../../../utils/MarkerClustering/mapStyle'
import { CoolAlert } from '../../../components/CoolAlert'
import { Container, ButtonMapChange, TextMapChange } from './styles'

import ClusteredMapView from '../../../utils/MarkerClustering'
import translate from '../../../../locales/i18n'
import { greenMarker, redMarker } from '../../../img/imageConst'
import { useUser } from '../../../hooks/user'
import { getWeekSurveys } from '../../../api/surveys'

const initialRegion = {
    latitude: -15.8194724,
    longitude: -47.924146,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
}

const CLUSTER_SIZE_DIVIDER = 4

const Maps = () => {
    const {
        isOffline,
        token,
        getCurrentLocation,
        getAppTip,
        hideAppTip,
        getCacheData,
    } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [region, setRegion] = useState(initialRegion)
    const [mapKey, setMapKey] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const [showUserLocation, setShowUserLocation] = useState(false)
    const [weekSurveys, setWeekSurveys] = useState([])
    const [filteredSurveys, setFilteredSurveys] = useState([])
    const [showPolygon, setShowPolygon] = useState(false)
    const [polygonState, setPolygonState] = useState('Federal District')

    useFocusEffect(
        useCallback(() => {
            getMapPins()
        }, [])
    )

    useEffect(() => {
        if (getAppTip('mapTip')) {
            setShowAlert(true)
        }
    }, [])

    const getMapPins = async () => {
        const local = await getCurrentLocation()

        if (local.error === 0) {
            setRegion(local)
            setShowUserLocation(true)
            setMapKey(mapKey + 1)
        }

        if (!isOffline && isLoading) {
            const localPin = await getCacheData('localPin', false)
            await getSurveys(localPin)
        }
    }

    const getSurveys = async (localPin) => {
        // Get Week Surveys
        const response = await getWeekSurveys(token)

        if (response.status === 200) {
            if (localPin) {
                setWeekSurveys([...response.data.surveys, localPin])
            } else {
                setWeekSurveys(response.data.surveys)
            }

            setIsLoading(false)
            // getSurveyPerState() // Logica que filtra casos de covid
        }
    }

    const hideAlert = async () => {
        setShowAlert(false)
        hideAppTip('mapTip')
    }

    const getSurveyPerState = async () => {
        const dataFilterd = []
        let reportsInState = 0
        let badReportsInState = 0
        let covidCasesInState = 0

        weekSurveys.forEach((data) => {
            if (data.state === polygonState) {
                reportsInState += 1
                if (data.symptom && data.symptom.length) {
                    badReportsInState += 1
                    if (
                        data.symptom.includes('Febre') &&
                        (data.symptom.includes('DordeGarganta') ||
                            data.symptom.includes('DificuldadeParaRespirar') ||
                            data.symptom.includes('Tosse') ||
                            data.symptom.includes('Cansaco') ||
                            data.symptom.includes('Mal-estar'))
                    ) {
                        dataFilterd.push(data)
                        covidCasesInState += 1
                    }
                }
            }
        })

        setFilteredSurveys(dataFilterd)
    }

    const CoordInsidePolygon = (point, vs) => {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

        const x = point[0]
        const y = point[1]

        let inside = false
        for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            const xi = vs[i][0]
            const yi = vs[i][1]
            const xj = vs[j][0]
            const yj = vs[j][1]

            const intersect =
                yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
            if (intersect) inside = !inside
        }

        return inside
    }

    const PolygonColor = (numCase, maxCase) => {
        let colorR = 0
        let colorG = 0

        if (numCase === 0) {
            fillColor = 'rgba(0, 0, 0, 0.0)'
        } else if (numCase <= maxCase / 2) {
            colorR = (255 * numCase) / (maxCase / 2)
            fillColor = `rgba(${parseInt(colorR, 10)}, 255, 0, 0.5)`
        } else {
            colorG = 255 - (255 * numCase) / maxCase
            fillColor = `rgba(255, ${parseInt(colorG, 10)}, 0, 0.5)`
        }
        return fillColor
    }

    const coordsFilter = () => {
        const markers = []
        weekSurveys.forEach((mark) => {
            markers.push({
                location: {
                    latitude: mark.latitude,
                    longitude: mark.longitude,
                },
                symptoms: mark.symptom && mark.symptom.length > 0,
            })
        })
        return markers
    }

    const renderGoodMarker = (data) => (
        <Marker
            key={data.id || Math.random()}
            coordinate={data.location}
            image={greenMarker}
            tracksViewChanges={false}
        />
    )

    const renderBadMarker = (data) => (
        <Marker
            key={data.id || Math.random()}
            coordinate={data.location}
            image={redMarker}
            tracksViewChanges={false}
        />
    )

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#348EAC' }} />
            <Container>
                <ClusteredMapView
                    key={mapKey} // Updates Map
                    showsUserLocation={showUserLocation}
                    style={styles.map}
                    data={coordsFilter()}
                    initialRegion={region}
                    customMapStyle={mapStyle} // Android
                    userInterfaceStyle='dark' // iOS
                    renderMarker={{
                        good: renderGoodMarker,
                        bad: renderBadMarker,
                    }}
                    CLUSTER_SIZE_DIVIDER={CLUSTER_SIZE_DIVIDER} // The log of number of points in cluster by this constant's base defines cluster image size
                    screenSizeClusterPercentage={0.13} // Cluster occupies 13% of screen
                />
                <CoolAlert
                    show={showAlert}
                    message={translate('maps.guide')}
                    showConfirmButton
                    confirmText={translate('maps.confirmGuide')}
                    onConfirmPressed={() => hideAlert()}
                />
                {/*
                <ButtonMapChange
                    onPress={() => {
                        !showPolygon
                            ? setShowPolygon(true)
                            : setShowPolygon(false)
                    }}
                >
                    <TextMapChange>
                        Visualizar {!showPolygon ? 'Poligonos' : 'Mapa'}
                    </TextMapChange>
                </ButtonMapChange>
                */}
            </Container>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
    },
})

export default Maps
