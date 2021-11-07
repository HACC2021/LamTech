import React, { useState } from 'react';
import { Container, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 21.5,
  lng: -158,
};

const Maps = ({ allReports }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '',
  });
  const [selected, setSelected] = useState(null);
  return (
      <Container>
        { isLoaded ?
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
            </GoogleMap> :
            <Loader> Loading </Loader>
        }
      </Container>
  );
};

Maps.propTypes = {
};

export default Maps;