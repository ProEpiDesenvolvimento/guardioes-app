import mapHTML from './map'
import mapScript from './mapScript'
import { API_URL } from '../../utils/constUtils'

class MapParser {
  constructor(coords, initialRegion, googlemapsapikey) {
    this.state = {
      coords: coords,
      initialRegion: initialRegion,
      googlemapsapikey: googlemapsapikey
    }
  }
  
  getCoordinates () {
    let coords = this.state.coords
    coords = coords.map(x => this.convert(x))
    return JSON.stringify(coords)
  }

  getInitCoordinate () {
    let coord = this.state.initialRegion
    coord = this.convert(coord)
    return JSON.stringify(coord)
  }

  convert (x) {
    let sick = x.symptom && x.symptom.length > 0
    return { lat: x.latitude, lng: x.longitude, good: !sick }
  }

  getMapHTML() {
    const ret = mapHTML.replace("mapScript.js", 
      mapScript
    ).replace('$COORDINATES',
      this.getCoordinates()
    ).replace('$INIT_COORD',
      this.getInitCoordinate()
    ).replace(/\$API_URL/g, // THIS IS WHERE THE ICONS COME FROM, THE API
      '192.168.0.143:3000'//API_URL
    ).replace("$ZOOM",
      this.state.initialRegion.zoom
    ).replace("$GOOGLE_MAPS_API_KEY",
      this.state.googlemapsapikey
    )
    return ret
  }
}

export default MapParser