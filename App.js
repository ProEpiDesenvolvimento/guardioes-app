import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import * as Navegar from './src/components/navigation/navigator';

class Guardioes extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#348EAC'}}>        
        <Navegar.Authentication />
        </SafeAreaView>
    );
  }
}


export default Guardioes;
