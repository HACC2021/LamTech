import React from 'react';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

/** A simple static component to render some text for the landing page. */
class Geo extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  /* getGeolocation() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
      },
      function (error) {
        console.error(`Error Code = ${error.code} - ${error.message}`);
      },
    );
  } */

  render() {
    /* const mapStyles = {
      width: '100%',
      height: '100%',
    }; */
    return (
      <Container fluid={'md'}>
        <Button onClick={this.getGeolocation()}>Get current Location</Button>
        {/* <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176 }}
        >
          <Marker position={{ lat: 48.00, lng: -122.00 }} />
        </Map> */}
      </Container>
    );
  }
}

export default GoogleApiWrapper({
',
})(Geo);
