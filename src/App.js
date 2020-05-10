import React , {createRef } from 'react';
import './App.css';

import L from 'leaflet';
import { Map, TileLayer, Marker, Popup , Circle,FeatureGroup, LayerGroup,Rectangle} from 'react-leaflet';

var myIcon = L.icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  iconSize: [25,41],
  iconAnchor: [12.5,41],
  popupaAnchor:[0, -41]
})

const center = [51.505, -0.09]
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]


class App extends React.Component {

  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
    listOfPlces: [
      {lat: 51.505, lng: -0.09},
      {lat: 51.502, lng: -0.09},
      {lat: 51.501, lng: -0.09},
    ],
    latlng: {
      lat: 51.505,
      lng: -0.09,
    },
    hasLocation:false,
    marker: {
      lat: 36.821402,
      lng: 10.125312,
    },
    draggable: true,
    onClickMarker: {
      lat: null,
      lng: null,
    },
  }

  mapRef = createRef()
  refmarker = createRef()

 
  handleClick = (e) => {
    const map = this.mapRef.current
    if (map != null) {
      map.leafletElement.locate()
    }
    //get current position when i click on the map
    console.log("test click map"+e.latlng);
    this.setState({
      onClickMarker:e.latlng
    })
    console.log(this.state.onClickMarker)
  }
   /**Locate your position using permission of google chrome */
  handleLocationFound = (e) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    })
    
    //console.log(this.state.latlng+"location using gps")
  }
  /*draggable marker*/
  /* this method does not working right now beacause when i move the marker i do not get the new latLag of marker*/
  /**Hope i fixed */
  toggleDraggable = (e) => {
    this.setState({ draggable: !this.state.draggable })
    console.log(e.latlng+"draggable");
  }

  updatePosition = () => {
    const marker = this.refmarker.current
    if (marker != null) {
      this.setState({
        marker: marker.leafletElement.getLatLng(),
      })
    }
    console.log(this.state.marker+"aaa")
  }
  
  render() {
    return (
          <Map className="map" center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}
            onClick={this.handleClick}
            onLocationfound={this.handleLocationFound}
            ref={this.mapRef}
          >
              {/* set tile layer */ }
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* put simple marker in the map*/ }
              <Marker position={[this.state.lat, this.state.lng]} icon = {myIcon}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>

              {/* loop an array add put markers in the map*/ }
              {this.state.listOfPlces.map(p => {
                return (
                  <Marker position={[p.lat, p.lng]} icon = {myIcon} key= {p.lat}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
                )
              })}

              {/* set a marker when i click on the map*/ }
              {this.state.onClickMarker.lat != null ? 
              <Marker icon = {myIcon}
                  draggable={this.state.draggable}
                  onDragend={this.updatePosition}
                  position={[this.state.onClickMarker.lat, this.state.onClickMarker.lng]}
                  ref={this.refmarker}>
              </Marker>
               : null}

              
              
          </Map>
    );
  }
}

export default App;
