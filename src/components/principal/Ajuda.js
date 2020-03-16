import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { imgTermos, imgTutorial } from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import translate from "../../../locales/i18n";

class Ajuda extends Component {
  static navigationOptions = {
    title: translate("ajuda.title")
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btnOne}
          onPress={() => navigate('TermosPoliticas')}
        >
          <Image source={imgTermos} style={styles.btnOneImg}/>
          <Text style={styles.btnOneTxt}>{translate("ajuda.useTermsBtn")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOne}
          onPress={() => navigate('Botao2')}
        >
          <Image source={ imgTutorial } style={styles.btnOneImg}/>
          <Text style={styles.btnOneTxt}>{translate("ajuda.tutorialBtn")}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnOne: {
    height: scale(100),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnOneImg: {
    height: scale(60),
    width: scale(60),
    marginHorizontal: scale(30),
  },
  btnOneTxt: {
    fontFamily: 'poiretOne',
    fontSize: 18,
  }
})

export default Ajuda;
