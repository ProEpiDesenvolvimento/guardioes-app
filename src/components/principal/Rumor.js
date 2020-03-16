import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal, Dimensions, TextInput, AsyncStorage, Keyboard, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { API_URL } from '../../constUtils';
import AwesomeAlert from 'react-native-awesome-alerts';
import translate from "../../../locales/i18n";
import Emoji from 'react-native-emoji';
import { scale } from '../scallingUtils';

const { height, width } = Dimensions.get('window');

let markerLat = 0;
let markerLon = 0;

export class Rumor extends Component {
  static navigationOptions = {
    title: "Rumor"
  }

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
      circleRadius: 600,
      modalVisibility: false,
      showMarker: false,
      descriptionHeight: 40,


      description: '',
      confirmed_cases: 0,
      confirmed_deaths: 0,
      title: ''
    }
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
      showProgressBar: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    })
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLatitude: position.coords.latitude,
          userLongitude: position.coords.longitude,
          error: null,
        });
        console.log("Log the position -> ", position);
        console.log("Log the state after get location", this.state);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 50000 },
    );
  }

  _setModalVisible = () => {
    this.setState({ modalVisibility: !this.state.modalVisibility })
  }

  _showMarker = () => {
    this.setState({ showMarker: true })
  }

  _updateUserLoc = (lat, lon) => {
    this.setState({
      userLatitude: lat,
      userLongitude: lon
    })
  }

  updateSize = (height) => {
    this.setState({
      descriptionHeight: height
    });
  }

  _createRumor = async () => {
    Keyboard.dismiss();
    const user_token = await AsyncStorage.getItem('userToken');
    const { title, description, confirmed_cases, confirmed_deaths } = this.state;

    try {
      fetch(API_URL + "/rumors", {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/json',
          Authorization: user_token
        },
        body: JSON.stringify({
          rumor: {
            title,
            description,
            confirmed_cases,
            confirmed_deaths
          }
        })
      })
        .then(res => {
          console.log("Res -> ", res);
          return res.json();
        })
        .then(resJson => {
          console.log("ResJson -> ", resJson);
          console.log("Data -> ", resJson.data)
          if (resJson.message == "Sucesso") {
            // this.props.navigation.navigate('Home');
            // this.hideAlert();
            this.setState({ showProgressBar: false })
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { height, description } = this.state;

    const checked = (<Feather name="check-square" size={20} color='green' />)
    const unchecked = (<EvilIcons name="close" size={20} color="red" />)

    let newStyle = {
      height
    }
    const marker = (
      <Marker
        coordinate={{
          latitude: markerLat,
          longitude: markerLon
        }}
      />
    )

    return (
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          <Modal
            transparent={true}
            visible={this.state.modalVisibility}
            onRequestClose={() => {
              this._setModalVisible();
            }}
          >
            <MapView
              style={styles.map}
              region={{
                latitude: this.state.userLatitude,
                longitude: this.state.userLongitude,
                latitudeDelta: this.state.userLatitudeDelta,
                longitudeDelta: this.state.userLongitudeDelta
              }}
              // liteMode={true}
              showsUserLocation={true}
              scrollEnabled={true}
              rotateEnabled={true}
              onPress={e => {
                // console.log("My Coordinate -> ", this.state.userLatitude, this.state.userLongitude);
                // console.log("Coordinate Position -> ", e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
                markerLat = e.nativeEvent.coordinate.latitude;
                markerLon = e.nativeEvent.coordinate.longitude;
                console.warn("Show Marker", markerLat, markerLon);

                this._showMarker();
                //When user scrolls through the map and clicks, the map goes back to where the
                //the user is, thus is required userLatitude and userLongitude to be changed as well
                this._updateUserLoc(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);

                setTimeout(() => {
                  this._setModalVisible();
                }, 500);
              }}
            >
              {this.state.showMarker ? marker : null}
            </MapView>

            <TouchableOpacity
              style={styles.exitModalBtn}
              onPress={() => this._setModalVisible()}
            >
              <Text style={styles.exitModalText}>X</Text>
            </TouchableOpacity>
          </Modal>
          <View style={styles.viewCommom}>
            <Text style={styles.commomText}>Título:</Text>
            <TextInput style={styles.formInput}
              value={this.state.title}
              onSubmitEditing={() => this.eventInput.focus()}
              onChangeText={title => this.setState({ title })}
            />
          </View>
          <View style={styles.viewCommom}>
            <Text style={styles.commomText}>Descrição:</Text>


            <TextInput style={styles.formInput}
              multiline={true}
              maxLength={300}
              onChangeText={description => this.setState({ description })}
              value={description}
              ref={(input) => this.eventInput = input}
              onSubmitEditing={() => this.casesInput.focus()}
              onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
            />
          </View>
          <View style={styles.viewRow}>
            <View style={styles.viewChild}>
              <Text style={styles.commomTextView}>Número de Casos:</Text>
              <TextInput style={styles.formInputChild}
                keyboardType='number-pad'
                value={this.state.confirmed_cases}
                ref={(input) => this.casesInput = input}
                onSubmitEditing={() => this.deathsInput.focus()}
                onChangeText={(confirmed_cases) => this.setState({ confirmed_cases })}
              />
            </View>

            <View style={styles.viewChild}>
              <Text style={styles.commomTextView}>Número de Mortes:</Text>
              <TextInput style={styles.formInputChild}
                keyboardType='number-pad'
                value={this.state.confirmed_deaths}
                ref={(input) => this.deathsInput = input}
                onChangeText={(confirmed_deaths) => this.setState({ confirmed_deaths })}
              />
            </View>

          </View>

          <View style={styles.viewRow}>
            <View style={styles.viewChild}>
            <Text style={styles.commomTextView}>Localização:</Text>
              <TouchableOpacity style={styles.openMapBtn}
                onPress={() => { this._setModalVisible(); Keyboard.dismiss(); }}
              >
                <Text>Marcar no Mapa</Text>
                {this.state.showMarker ? checked : unchecked}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                this.showAlert();
                this._createRumor();
              }}
              style={styles.sendBtn}
            >
              <Text style={{
                fontSize: scale(15),
                fontWeight: '500',
                color: 'black'
              }}>Enviar</Text>
            </TouchableOpacity>
          </View>

          <AwesomeAlert
            show={this.state.showAlert}
            showProgress={this.state.showProgressBar ? true : false}
            title={this.state.showProgressBar ? translate("badReport.alertMessages.sending") : <Text>{translate("badReport.alertMessages.thanks")} {emojis[1]}{emojis[1]}{emojis[1]}</Text>}
            message={this.state.showProgressBar ? null : <Text style={{ alignSelf: 'center' }}>{translate("rumor.rumorSent")} {emojis[0]}{emojis[0]}{emojis[0]}</Text>}
            closeOnTouchOutside={this.state.showProgressBar ? false : true}
            closeOnHardwareBackPress={false}
            showConfirmButton={this.state.showProgressBar ? false : true}
            confirmText={translate("badReport.alertMessages.confirmText")}
            confirmButtonColor='green'
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.hideAlert();
            }}
            onDismiss={() => this.hideAlert()}
          />
        </ScrollView>
      </View>
    )
  }
}

const emojis = [
  (
    <Emoji //Emoji heart up
      name='heart'
      style={{ fontSize: scale(15) }}
    />
  ),
  (
    <Emoji //Emoji tada up
      name='tada'
      style={{ fontSize: scale(15) }}
    />
  )
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: '3%',
    justifyContent: 'space-between',
  },
  body: {
    paddingTop: "5%"
  },
  map: {
    flex: 1
  },
  exitModalBtn: {
    position: 'absolute',
    top: width * 0.05,
    left: width * 0.05,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#348EAC',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 90,
    elevation: 10
  },
  exitModalText: {
    fontSize: 'bold',
    color: 'white',
    fontSize: 21
  },
  openMapBtn: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: "80%",
    height: 35,
    fontSize: 16,
    paddingBottom: 0,
    paddingTop: 2,
  },
  textInput: {
    borderColor: 'lightgray',
    borderWidth: 1,
    width: '100%',
    marginBottom: '3%'
  },
  sendBtn: {
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#166B87',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: "5%",
  },
  normalTexts: {
    marginBottom: 5,
    fontSize: 15,
    fontFamily: 'roboto',
    color: '#166B87',
    fontWeight: 'bold'
  },
  viewCasos: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  formInput: {
    width: "90%",
    height: 35,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#348EAC',
    paddingBottom: 0,
    paddingTop: 2,
  },
  formInputChild: {
    width: "80%",
    height: 35,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#348EAC',
    paddingBottom: 0,
    paddingTop: 2,
  },
  commomText: {
    fontSize: 17,
    fontFamily: 'roboto',
    color: '#465F6C',
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: "5%",
  },
  viewCommom: {
    width: '100%',
    height: 65,
    alignItems: 'center',
  },
  commomTextView: {
    fontSize: 17,
    fontFamily: 'roboto',
    color: '#465F6C',
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: '10%',
  },
  viewRow: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
  },
  viewChild: {
    width: "50%",
    height: 65,
    alignItems: 'center',
  },
})

export default Rumor;
