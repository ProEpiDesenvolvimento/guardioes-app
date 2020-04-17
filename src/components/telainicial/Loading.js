import React from 'react';
import { ActivityIndicator, AsyncStorage, Image, StatusBar, StyleSheet, View } from 'react-native';
import { imagemLogo, imagemLogoBR, logoProEpi, logoUnB } from '../../imgs/imageConst';
import LinearGradient from 'react-native-linear-gradient';
import translate from '../../../locales/i18n';
import { scale } from '../scallingUtils';
import { API_URL } from '../../constUtils';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.getInfos();
  }

  getInfos = async () => { //Ger user infos
    let userEmail = await AsyncStorage.getItem('userEmail');
    let userPwd = await AsyncStorage.getItem('userPwd');
    this.setState({ userEmail, userPwd });
    console.log(this.state.userEmail)
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let UserID = await AsyncStorage.getItem('userID');

    if (UserID !== null) {
      setTimeout(() => {
        this.verifyUserToken();
      }, 1500);
    } else {
      AsyncStorage.removeItem('userName');
      AsyncStorage.removeItem('userID');
      AsyncStorage.removeItem('householdID');
      AsyncStorage.removeItem('userToken');
      AsyncStorage.removeItem('appID');
      AsyncStorage.removeItem('userSelected');
      AsyncStorage.removeItem('avatarSelected');
      AsyncStorage.removeItem('userEmail');
      AsyncStorage.removeItem('appPwd');

      this.props.navigation.navigate('Cadastro');
    }
  };


  verifyUserToken = async () => {
    return fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user:
        {
          email: this.state.userEmail,
          password: this.state.userPwd
        }
      })
    })
      .then((response) => {
        if (response.status == 200) {
          AsyncStorage.setItem('userToken', response.headers.map.authorization);
          this.props.navigation.navigate('BottomMenu');

        } else {
          this.props.navigation.navigate('Cadastro');
        }
      })
  };

  // Render any loading content that you like here
  render() {
    const statusColor = (<StatusBar backgroundColor='#348EAC' />)

    const logoBR = (
      <Image style={styles.imageLogo} source={imagemLogoBR} />
    )

    const logoES = (
      <Image style={styles.imageLogo} source={imagemLogo} />
    )

    let imageType;
    if (translate("initialscreen.title") === "Guardianes de la Salud") {
      imageType = logoES
    }
    else {
      imageType = logoBR
    }

    return (
      <LinearGradient style={styles.container} colors={['#348EAC', '#013444']} start={{ x: 1.5, y: 0.6 }} end={{ x: -0.2, y: 1.4 }}>
        {statusColor}
        {imageType}
        <View style={styles.viewLogos}>
          <View style={styles.viewHalfLogos}><Image style={styles.imageHalfLogo} source={logoProEpi} /></View>
          <View style={styles.viewHalfLogos}><Image style={styles.imageHalfLogo} source={logoUnB} /></View>
        </View>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    height: scale(235),
    resizeMode: 'contain',
    marginBottom: 20,
  },
  viewLogos: {
    flexDirection: "row",
    width: "90%",
    height: scale(130),
    //borderColor: "red",
    //borderWidth: 1,
  },
  viewHalfLogos: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: "100%",
    //borderColor: "green",
    //borderWidth: 1,
  },
  imageHalfLogo: {
    width: scale(100),
    resizeMode: 'contain',
  },
});

export default AuthLoadingScreen;