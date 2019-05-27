import React from "react"
import {compose, withProps, lifecycle} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker, } from "react-google-maps"
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkjnVWVTQb3uKdaikkl2P3QBy31YxeIA0&?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div style={{height: `400px`}}/>,
    mapElement: <div style={{height: `100%`}}/>,
  }),
  withScriptjs,
  withGoogleMap,

)((props) =>
  <GoogleMap
    defaultZoom={8}
    center={props.position || {lat: 20, lng: 100}}
    zoom={props.zoom || 8}
  >

    {props.isMarkerShown && props.markers.map((marker, index) => {
     console.log(props)
      return (
        <Marker key={index} position={marker} onClick={props.onMarkerClick}/>
      )
    })}

  </GoogleMap>
);

export class GGMap extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isMarkerShown: false,
    };
  }


  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({isMarkerShown: true})
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({isMarkerShown: false})
    this.delayedShowMarker()
  }

  render() {

    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        {...this.props}
      />
    )
  }
}