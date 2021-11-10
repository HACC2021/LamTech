import React, { useState } from 'react';
import { Container, Header, Loader, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const test = {
  lat: 21.5,
  lng: -158,
};

const center = {
  lat: 21.5,
  lng: -158,
};

const Geo = ({ }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '',
  });
  const [selected, setSelected] = useState(null);
  return (
    <Container>
      <Header>Filter</Header>
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
                <Header>Lam was spotted here</Header>
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
