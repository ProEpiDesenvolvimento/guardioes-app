import React, {Component} from 'react';
import {Text, View, Modal, Keyboard} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {ExitMap, ConfirmMap, MapFormMarker, MapFormText} from './styles';
import {
  Container,
  KeyboardScrollView,
  FormInline,
  FormLabel,
  NormalInput,
} from '../../../components/NormalForms';
import {
  FormGroup,
  FormGroupChild,
  Button,
  SendContainer,
  SendText,
} from '../../../components/NormalForms';
import {CoolAlert} from '../../../components/CoolAlert';

import RNSecureStorage from 'rn-secure-storage';
import MapView, {Marker} from 'react-native-maps';
import {API_URL} from 'react-native-dotenv';
import translate from '../../../../locales/i18n';
import Emoji from 'react-native-emoji';
import {scale} from '../../../utils/scallingUtils';
import Geolocation from 'react-native-geolocation-service';

Feather.loadFont();

let markerLat = 0;
let markerLon = 0;

class Rumor extends Component {
  static navigationOptions = {
    title: 'Rumor',
  };

  constructor(props) {
    super(props);

    this.getLocation(); //Get user location

    this.state = {
      showAlert: false,
      showProgressBar: false, //Custom Progress Bar
      userLatitude: 0,
      userLongitude: 0,
      userLatitudeDelta: 0.0222,
      userLongitudeDelta: 0.0121,
      modalVisibility: false,
      showMarker: false,
      descriptionHeight: 40,

      description: '',
      confirmed_cases: 0,
      confirmed_deaths: 0,
      title: '',
    };
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
      showProgressBar: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  getLocation() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLatitude: position.coords.latitude,
          userLongitude: position.coords.longitude,
          error: null,
        });
        console.log('Log the position -> ', position);
        console.log('Log the state after get location', this.state);
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 50000},
    );
  }

  _setModalVisible = () => {
    this.setState({modalVisibility: !this.state.modalVisibility});
  };

  _showMarker = show => {
    this.setState({showMarker: show});
  };

  _updateUserLoc = (lat, lon) => {
    this.setState({
      userLatitude: lat,
      userLongitude: lon,
    });
  };

  updateSize = height => {
    this.setState({
      descriptionHeight: height,
    });
  };

  _createRumor = async () => {
    this.showAlert();
    Keyboard.dismiss();
    const userToken = await RNSecureStorage.get('userToken');
    const {title, description, confirmed_cases, confirmed_deaths} = this.state;

    try {
      fetch(API_URL + '/rumors', {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/json',
          Authorization: userToken,
        },
        body: JSON.stringify({
          rumor: {
            title,
            description,
            confirmed_cases,
            confirmed_deaths,
          },
        }),
      })
        .then(res => {
          console.log('Res -> ', res);
          return res.json();
        })
        .then(resJson => {
          console.log('ResJson -> ', resJson);
          console.log('Data -> ', resJson.data);
          if (resJson.message == 'Sucesso') {
            // this.props.navigation.navigate('Home');
            // this.hideAlert();
            this.setState({showProgressBar: false});
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {showAlert} = this.state;

    const marker = (
      <Marker
        coordinate={{
          latitude: markerLat,
          longitude: markerLon,
        }}
      />
    );

    return (
      <Container>
        <KeyboardScrollView>
          <Modal
            transparent={true}
            visible={this.state.modalVisibility}
            onRequestClose={() => {
              this._setModalVisible();
            }}>
            <MapView
              style={{flex: 1}}
              region={{
                latitude: this.state.userLatitude,
                longitude: this.state.userLongitude,
                latitudeDelta: this.state.userLatitudeDelta,
                longitudeDelta: this.state.userLongitudeDelta,
              }}
              // liteMode={true}
              showsUserLocation={true}
              onPress={e => {
                // console.log("My Coordinate -> ", this.state.userLatitude, this.state.userLongitude);
                markerLat = e.nativeEvent.coordinate.latitude;
                markerLon = e.nativeEvent.coordinate.longitude;
                console.warn('Show Marker', markerLat, markerLon);

                this._showMarker(true);
                //When user scrolls through the map and clicks, the map goes back to where the
                //the user is, thus is required userLatitude and userLongitude to be changed as well
                this._updateUserLoc(
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude,
                );
              }}>
              {this.state.showMarker ? marker : null}
            </MapView>

            <ExitMap
              onPress={() => {
                this._showMarker(false);
                this._updateUserLoc(
                  this.state.userLatitude,
                  this.state.userLongitude,
                );
                this._setModalVisible();
              }}>
              <Feather name="x" size={scale(25)} color="#ffffff" />
            </ExitMap>
            {this.state.showMarker ? (
              <ConfirmMap onPress={() => this._setModalVisible()}>
                <Feather name="check" size={scale(25)} color="#ffffff" />
              </ConfirmMap>
            ) : null}
          </Modal>

          <FormInline>
            <FormLabel>Título:</FormLabel>
            <NormalInput
              maxLength={100}
              onSubmitEditing={() => this.eventInput.focus()}
              onChangeText={title => this.setState({title})}
            />
          </FormInline>
          <FormInline>
            <FormLabel>Descrição:</FormLabel>
            <NormalInput
              multiline={true}
              maxLength={300}
              ref={input => (this.eventInput = input)}
              onSubmitEditing={() => this.casesInput.focus()}
              onContentSizeChange={e =>
                this.updateSize(e.nativeEvent.contentSize.height)
              }
              onChangeText={description => this.setState({description})}
            />
          </FormInline>

          <FormGroup>
            <FormGroupChild>
              <FormLabel>Número de Casos:</FormLabel>
              <NormalInput
                keyboardType="number-pad"
                ref={input => (this.casesInput = input)}
                onSubmitEditing={() => this.deathsInput.focus()}
                onChangeText={confirmed_cases =>
                  this.setState({confirmed_cases})
                }
              />
            </FormGroupChild>

            <FormGroupChild>
              <FormLabel>Número de Mortes:</FormLabel>
              <NormalInput
                keyboardType="number-pad"
                ref={input => (this.deathsInput = input)}
                onChangeText={confirmed_deaths =>
                  this.setState({confirmed_deaths})
                }
              />
            </FormGroupChild>
          </FormGroup>

          <FormGroup>
            <FormGroupChild>
              <FormLabel>Localização:</FormLabel>
              <Button
                onPress={() => {
                  this._setModalVisible();
                  Keyboard.dismiss();
                }}>
                <MapFormMarker>
                  <MapFormText>Marcar no Mapa</MapFormText>
                  {this.state.showMarker ? (
                    <Feather
                      name="check-circle"
                      size={scale(20)}
                      color="#348EAC"
                    />
                  ) : (
                    <Feather name="x-circle" size={scale(20)} color="#c4c4c4" />
                  )}
                </MapFormMarker>
              </Button>
            </FormGroupChild>
          </FormGroup>

          <Button onPress={() => this._createRumor()}>
            <SendContainer>
              <SendText>Enviar</SendText>
            </SendContainer>
          </Button>
        </KeyboardScrollView>

        <CoolAlert
          show={showAlert}
          showProgress={this.state.showProgressBar}
          title={
            this.state.showProgressBar ? (
              translate('badReport.alertMessages.sending')
            ) : (
              <Text>
                {translate('badReport.alertMessages.thanks')} {emojis[1]}
                {emojis[1]}
                {emojis[1]}
              </Text>
            )
          }
          message={
            this.state.showProgressBar ? null : (
              <Text>
                {translate('rumor.rumorSent')} {emojis[0]}
                {emojis[0]}
                {emojis[0]}
              </Text>
            )
          }
          closeOnTouchOutside={this.state.showProgressBar ? false : true}
          closeOnHardwareBackPress={false}
          showConfirmButton={this.state.showProgressBar ? false : true}
          confirmText={translate('badReport.alertMessages.confirmText')}
          onCancelPressed={() => this.hideAlert()}
          onConfirmPressed={() => this.hideAlert()}
          onDismiss={() => this.hideAlert()}
        />
      </Container>
    );
  }
}

const emojis = [
  <Emoji //Emoji heart up
    name="heart"
    style={{fontSize: scale(15)}}
  />,
  <Emoji //Emoji tada up
    name="tada"
    style={{fontSize: scale(15)}}
  />,
];

export default Rumor;
