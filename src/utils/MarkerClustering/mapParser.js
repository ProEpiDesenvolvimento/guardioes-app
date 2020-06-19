import mapHTML from './map'
import mapScript from './mapScript'
import { API_URL } from '../../utils/constUtils'

class MapParser {
  constructor(coords, initialRegion) {
    this.state = {
      coords: coords,
      initialRegion: initialRegion
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
    console.log("COORDS:", this.state.coords.length)
    const ret = mapHTML.replace("mapScript.js", 
      mapScript
    ).replace('$COORDINATES',
      this.getCoordinates()
    ).replace('$INIT_COORD',
      this.getInitCoordinate()
    ).replace(/\$API_URL/g, // THIS IS WHERE THE ICONS COME FROM, THE API
      API_URL
    )
    return ret
  }
}

export default MapParser