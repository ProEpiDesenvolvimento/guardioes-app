import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import MapParser from './mapParser'

class MarkerCluster extends Component {

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

  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: new MapParser(this.state.coords, this.props.initialRegion, this.props.googlemapsapikey).getMapHTML() }}
      />
    )
  }
}

export default MarkerCluster;