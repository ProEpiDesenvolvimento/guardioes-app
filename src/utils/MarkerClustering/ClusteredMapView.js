import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Platform, Dimensions, LayoutAnimation } from 'react-native'
import MapView from 'react-native-maps'
import SuperCluster from 'supercluster'
import GeoViewport from '@mapbox/geo-viewport'
import ClusterMarker from './ClusterMarker'
import { regionToBoundingBox, itemToGeoJSONFeature } from './util'

/* 
  Clustering engine is MapBox https://github.com/mapbox/supercluster
*/

export default class ClusteredMapView extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      data: [], // helds renderable clusters and markers
      region: props.region || props.initialRegion, // helds current map region
      unhealthy: [] 
    }

    this.isAndroid = Platform.OS === 'android'
    this.dimensions = [props.width, props.height]

    this.mapRef = this.mapRef.bind(this)
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this)
  }

  componentDidMount() {
    this.clusterize(this.props.data)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data)
      this.clusterize(nextProps.data)
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.isAndroid && this.props.animateClusters && this.clustersChanged(nextState))
      LayoutAnimation.configureNext(this.props.layoutAnimationConf)
  }

  mapRef(ref) {
    this.mapview = ref
  }

  getMapRef() {
    return this.mapview
  }

  getClusteringEngine() {
    return this.index
  }

  splitHealthyUnhealthy(data) {
    return {
      unhealthy: data.filter(el => el.symptoms),
      healthy: data.filter(el => !el.symptoms)
    }
  }

  clusterize(dataset) {
    this.index = new SuperCluster({ // eslint-disable-line new-cap
      extent: this.props.extent,
      minZoom: this.props.minZoom,
      maxZoom: this.props.maxZoom,
      radius: this.props.radius || (this.dimensions[0] * this.props.screenSizeClusterPercentage),
    })

    // get formatted GeoPoints for cluster
    const rawData = dataset.map(item => itemToGeoJSONFeature(item, this.props.accessor))

    this.index.load(rawData)
    
    const clusters = this.getClusters(this.state.region)

    this.setState({ data: [...clusters] })
  }

  clustersChanged(nextState) {
    return this.state.data.length !== nextState.data.length
  }

  onRegionChangeComplete(region) {
    let data = [...this.getClusters(region)]
    this.setState({ region, data }, () => {
        this.props.onRegionChangeComplete && this.props.onRegionChangeComplete(region, data)
    })
  }

  getClusters(region) {
    const bbox = regionToBoundingBox(region),
          viewport = (region.longitudeDelta) >= 40 ? { zoom: this.props.minZoom } : GeoViewport.viewport(bbox, this.dimensions)

    return this.index.getClusters(bbox, viewport.zoom)
  }

  render() {
    const { style, ...props } = this.props
    return (
      <MapView
        {...props}
        style={style}
        ref={this.mapRef}
        onRegionChangeComplete={this.onRegionChangeComplete}>
        {
          this.props.clusteringEnabled && this.state.data.map((d) => {
            if (d.properties.point_count === 0) // SE NÂO FIZER PARTE DE UM CLUSTER
            {
              if (d.properties.item.symptoms) // SE FOR SAUDAVEL
                return this.props.renderMarker.bad(d.properties.item) // DESENHA PINO VERMELHO
              else
                return this.props.renderMarker.good(d.properties.item) // DESENHA PINO VERDE
            }
            // SE FAZ PARTE DE UM CLUSTER
            d.CLUSTER_SIZE_DIVIDER = this.props.CLUSTER_SIZE_DIVIDER
            return (
              <ClusterMarker
                {...d}
                clusteringEngine={this.index}
                key={`cluster-${d.properties.cluster_id}`} 
                region={this.state.region} />
            )
          })
        }
        {
          !this.props.clusteringEnabled && this.props.data.map(d => this.props.renderMarker(d))
        }
        {this.props.children}
      </MapView>
    )
  }
}

ClusteredMapView.defaultProps = {
  minZoom: 1,
  maxZoom: 16,
  extent: 512,
  accessor: 'location',
  animateClusters: true,
  clusteringEnabled: true,
  clusterPressMaxChildren: 100,
  preserveClusterPressBehavior: true,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  layoutAnimationConf: LayoutAnimation.Presets.spring,
  edgePadding: { top: 10, left: 10, right: 10, bottom: 10 }
}

ClusteredMapView.propTypes = {
  ...MapView.propTypes,
  // number
  radius: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  extent: PropTypes.number.isRequired,
  minZoom: PropTypes.number.isRequired,
  maxZoom: PropTypes.number.isRequired,
  clusterPressMaxChildren: PropTypes.number.isRequired,
  // array
  data: PropTypes.array.isRequired,
  // func
  onExplode: PropTypes.func,
  onImplode: PropTypes.func,
  renderMarker: PropTypes.func.isRequired,
  renderCluster: PropTypes.func.isRequired,
  // bool
  animateClusters: PropTypes.bool.isRequired,
  clusteringEnabled: PropTypes.bool.isRequired,
  preserveClusterPressBehavior: PropTypes.bool.isRequired,
  // object
  layoutAnimationConf: PropTypes.object,
  edgePadding: PropTypes.object.isRequired,
  // string
  // mutiple
  accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
}