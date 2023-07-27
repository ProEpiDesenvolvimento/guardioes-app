import React, { useCallback, useState, useRef } from 'react'
import {
    Alert,
    Text,
    Modal,
    Keyboard,
    Platform,
    StyleSheet,
} from 'react-native'

import Feather from 'react-native-vector-icons/Feather'
import MapView, { Marker } from 'react-native-maps'
import { useFocusEffect } from '@react-navigation/native'

import mapStyle from '../../../utils/MarkerClustering/mapStyle'
import {
    Container,
    KeyboardScrollView,
    FormInline,
    FormLabel,
    NormalInput,
    FormGroup,
    FormGroupChild,
    Button,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'
import { CoolAlert } from '../../../components/CoolAlert'
import { ExitMap, ConfirmMap, MapFormMarker, MapFormText } from './styles'
import { Emojis } from '../../../img/imageConst'

import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import { useUser } from '../../../hooks/user'
import { createRumor } from '../../../api/rumors'
import { validRumor } from '../../../utils/formConsts'

const Rumor = ({ navigation }) => {
    const { token, location, getCurrentLocation } = useUser()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [confirmedCases, setConfirmedCases] = useState(0)
    const [confirmedDeaths, setConfirmedDeaths] = useState(0)
    const [region, setRegion] = useState(location)
    const [modalVisible, setModalVisible] = useState(false)
    const [showMarker, setShowMarker] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showProgressBar, setShowProgressBar] = useState(true)

    const eventInput = useRef()
    const casesInput = useRef()
    const deathsInput = useRef()

    useFocusEffect(
        useCallback(() => {
            getCurrentLocation()
        }, [])
    )

    const sendRumor = async () => {
        Keyboard.dismiss()

        const newRumor = {
            title,
            description,
            confirmed_cases: confirmedCases,
            confirmed_deaths: confirmedDeaths,
            latitude: region.latitude,
            longitude: region.longitude,
        }

        if (!validRumor(newRumor, showMarker)) return
        setShowAlert(true)

        const response = await createRumor({ rumor: newRumor }, token)

        if (response.status === 201) {
            setShowProgressBar(false)
        } else {
            Alert.alert(translate('register.geralError'))
            setShowAlert(false)
        }
    }

    return (
        <Container>
            <KeyboardScrollView>
                <Modal
                    transparent
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible)
                    }}
                >
                    <MapView
                        style={{ flex: 1 }}
                        region={region}
                        customMapStyle={mapStyle} // Android
                        userInterfaceStyle='dark' // iOS
                        showsUserLocation
                        onPress={(e) => {
                            console.warn(
                                'Show Marker',
                                e.nativeEvent.coordinate.latitude,
                                e.nativeEvent.coordinate.longitude
                            )

                            setShowMarker(true)
                            // When user scrolls through the map and clicks, the map goes back to where the
                            // the user is, thus is required userLatitude and userLongitude to be changed as well
                            setRegion({
                                ...region,
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude,
                            })
                        }}
                    >
                        {showMarker ? (
                            <Marker
                                coordinate={{
                                    latitude: region.latitude,
                                    longitude: region.longitude,
                                }}
                            />
                        ) : null}
                    </MapView>

                    <ExitMap
                        onPress={() => {
                            setShowMarker(false)
                            setRegion({
                                ...region,
                                latitude: location.latitude,
                                longitude: location.longitude,
                            })
                            setModalVisible(false)
                        }}
                    >
                        <Feather
                            name='x'
                            size={scale(25)}
                            color='#ffffff'
                            style={styles.icons}
                        />
                    </ExitMap>
                    {showMarker ? (
                        <ConfirmMap onPress={() => setModalVisible(false)}>
                            <Feather
                                name='check'
                                size={scale(25)}
                                color='#ffffff'
                                style={styles.icons}
                            />
                        </ConfirmMap>
                    ) : null}
                </Modal>

                <FormInline>
                    <FormLabel>Título:</FormLabel>
                    <NormalInput
                        maxLength={100}
                        onSubmitEditing={() => eventInput.current.focus()}
                        onChangeText={(text) => setTitle(text)}
                    />
                </FormInline>
                <FormInline>
                    <FormLabel>Descrição:</FormLabel>
                    <NormalInput
                        multiline
                        maxLength={300}
                        ref={eventInput}
                        onSubmitEditing={() => casesInput.current.focus()}
                        onChangeText={(text) => setDescription(text)}
                    />
                </FormInline>

                <FormGroup>
                    <FormGroupChild>
                        <FormLabel>Número de Casos:</FormLabel>
                        <NormalInput
                            keyboardType='number-pad'
                            ref={casesInput}
                            onSubmitEditing={() => deathsInput.current.focus()}
                            onChangeText={(text) => setConfirmedCases(text)}
                        />
                    </FormGroupChild>

                    <FormGroupChild>
                        <FormLabel>Número de Mortes:</FormLabel>
                        <NormalInput
                            keyboardType='number-pad'
                            ref={deathsInput}
                            onChangeText={(text) => setConfirmedDeaths(text)}
                        />
                    </FormGroupChild>
                </FormGroup>

                <FormGroup>
                    <FormGroupChild>
                        <FormLabel>Localização:</FormLabel>
                        <Button
                            onPress={() => {
                                Keyboard.dismiss()
                                setModalVisible(true)
                            }}
                        >
                            <MapFormMarker>
                                <MapFormText>Marcar no Mapa</MapFormText>
                                {showMarker ? (
                                    <Feather
                                        name='check-circle'
                                        size={scale(20)}
                                        color='#348EAC'
                                    />
                                ) : (
                                    <Feather
                                        name='x-circle'
                                        size={scale(20)}
                                        color='#c4c4c4'
                                    />
                                )}
                            </MapFormMarker>
                        </Button>
                    </FormGroupChild>
                </FormGroup>

                <Button onPress={() => sendRumor()}>
                    <SendContainer>
                        <SendText>Enviar</SendText>
                    </SendContainer>
                </Button>
            </KeyboardScrollView>

            <CoolAlert
                show={showAlert}
                showProgress={showProgressBar}
                title={
                    showProgressBar ? (
                        translate('badReport.messages.sending')
                    ) : (
                        <Text>
                            {translate('badReport.messages.thanks')}{' '}
                            {Emojis.tada}
                        </Text>
                    )
                }
                message={
                    showProgressBar ? null : (
                        <Text>{translate('rumor.rumorSent')}</Text>
                    )
                }
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showConfirmButton={!showProgressBar}
                confirmText={translate('badReport.messages.confirmText')}
                onConfirmPressed={() => navigation.goBack()}
                onDismiss={() => setShowAlert(false)}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    icons: {
        marginBottom: Platform.OS === 'ios' ? -3 : 0,
    },
})

export default Rumor
