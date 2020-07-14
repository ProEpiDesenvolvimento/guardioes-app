'use-strict'

// base libs
import PropTypes from 'prop-types'
import React, { PureComponent, Component } from 'react'
import { Text } from 'react-native'
import clusterImages from './imgImport'
import { Marker } from 'react-native-maps'

export default class ClusterMarker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tracksViewChanges: true
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState(() => ({
        tracksViewChanges: true,
      }))
    }
  }

  componentDidUpdate() {
    if (this.state.tracksViewChanges) {
      this.setState(() => ({
        tracksViewChanges: false,
      }))
    }
  }

  render() {    
    const pointCount = this.props.properties.point_count // eslint-disable-line camelcase
    const coordinate = {
      latitude: this.props.geometry.coordinates[1],
      longitude: this.props.geometry.coordinates[0]
    }
    const clusterId = this.props.properties.cluster_id
    const clusteredPoints = this.props.clusteringEngine.getLeaves(clusterId, 10000)

    const healthyPercentage = clusteredPoints.filter(x => !x.properties.item.symptoms).length / pointCount
    let reqNum = Math.floor(healthyPercentage * 100.0)
    while (!clusterImages.imgLevels.includes(reqNum)) {
        reqNum--
    }
    let orderOfMagnitude = Math.floor(Math.log(pointCount) / Math.log(this.props.CLUSTER_SIZE_DIVIDER))
    if (orderOfMagnitude < 0) orderOfMagnitude = 0
    if (orderOfMagnitude > 6) orderOfMagnitude = 6
    const zeroCoordinate = coordinate.latitude === 0 && coordinate.longitude === 0
    let message = 'Sintomáticos: ' + Math.floor((1.0 - healthyPercentage) * 100.0) + '%'
    const image = clusterImages.reqFiles[orderOfMagnitude][clusterImages.imgLevels.indexOf(reqNum)]
    if (zeroCoordinate) {
        message = "Essas pessoas não compartilharam seu local"
    }
    return (
        <Marker
            anchor={{x:0.5,y:0.5}}
            centerOffset={{x:0.5,y:0.5}}
            coordinate={coordinate}
            image={image}
            title={'Pessoas: ' + pointCount}
            description={message}
            tracksViewChanges={this.state.tracksViewChanges}>
            {/* <Text>random text</Text> */}
        </Marker>
    )
  }
}

ClusterMarker.propTypes = {
  renderCluster: PropTypes.func,
  onPress: PropTypes.func.isRequired,
  geometry: PropTypes.object.isRequired,
  properties: PropTypes.object.isRequired,
}