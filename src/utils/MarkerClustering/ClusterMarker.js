import React, {PureComponent, Component} from 'react';
import clusterImages from './imgImport';
import {Marker} from 'react-native-maps';
import translate from '../../../locales/i18n';

export default class ClusterMarker extends Component {
  constructor(props) {
    super(props);

    const pointCount = this.props.properties.point_count;
    const coordinate = {
      latitude: this.props.geometry.coordinates[1],
      longitude: this.props.geometry.coordinates[0],
    };
    const clusterId = this.props.properties.cluster_id;
    const clusteredPoints = this.props.clusteringEngine.getLeaves(
      clusterId,
      10000,
    );

    const healthyPercentage =
      clusteredPoints.filter(x => !x.properties.item.symptoms).length /
      pointCount;
    let reqNum = Math.floor(healthyPercentage * 100.0);
    while (!clusterImages.imgLevels.includes(reqNum)) {
      reqNum--;
    }
    let orderOfMagnitude = Math.floor(
      Math.log(pointCount) / Math.log(this.props.CLUSTER_SIZE_DIVIDER),
    );
    if (orderOfMagnitude < 0) orderOfMagnitude = 0;
    if (orderOfMagnitude > 6) orderOfMagnitude = 6;
    const zeroCoordinate =
      coordinate.latitude === 0 && coordinate.longitude === 0;
    let message =
      translate('map.symptomatic') +
      Math.floor((1.0 - healthyPercentage) * 100.0) +
      '%';
    const image =
      clusterImages.reqFiles[orderOfMagnitude][
        clusterImages.imgLevels.indexOf(reqNum)
      ];
    if (zeroCoordinate) {
      message = translate('map.noLocal');
    }

    this.state = {
      image: image,
      message: message,
      title: translate('map.people') + pointCount,
      pointCount: pointCount,
      coordinate: coordinate,
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Marker
        anchor={{x: 0.5, y: 0.5}}
        centerOffset={{x: 0.5, y: 0.5}}
        coordinate={this.state.coordinate}
        image={this.state.image}
        title={translate('map.people') + this.state.pointCount}
        description={this.state.message}
        tracksViewChanges={true}
      />
    );
  }
}
