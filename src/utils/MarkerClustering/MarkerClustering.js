import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import mapHTML from './map'

class MarkerClustering extends Component {

  constructor(props) {
    super(props)
    this.state = {
      coords: props.coords
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      coords: nextProps.coords
    });
  }

  composeHTML (coords) {
    coords = JSON.stringify(coords)
    initRegion = JSON.stringify(this.convertCoordinate(this.props.initialRegion))
    return mapHTML.replace("$COORDINATES", coords).replace('$INIT_COORD', initRegion)
  }

  convertCoordinate(x) {
    return { lat: x.latitude, lng: x.longitude }
  }

  render() {
    const coords = this.state.coords.map((x) => {
      return this.convertCoordinate(x)
    })
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: this.composeHTML(coords) }}
      />
    )
  }
}

export default MarkerClustering;