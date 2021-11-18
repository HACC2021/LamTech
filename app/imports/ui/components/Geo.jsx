import React, { useState } from 'react';
import { Container, Header, Loader, Button, Input } from 'semantic-ui-react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const test = {
  lat: 21.3484499,
  lng: -157.916605,
};

const center = {
  lat: 21.5,
  lng: -158,
};

const Geo = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '',
  });
  const [selected, setSelected] = useState(null);
  return (
    <Container>
      <Header>Filter   <Input placeholder='Animal Name'/></Header>
      { isLoaded ?
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <Marker
            key={test.lat + test.lng}
            position={{ lat: test.lat, lng: test.lng }}
            onClick={() => { setSelected(test); }}
          />
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => { setSelected(null); }}
            >
              <div>
                <Header>Hawaii&apos;s Sea Turtles Reported Here</Header>
                <Button>View Submitted Form</Button>
              </div>
            </InfoWindow>
          ) : null }
        </GoogleMap> :
        <Loader> Loading </Loader>
      }
    </Container>
  );
};

Geo.propTypes = {

};

export default Geo;
