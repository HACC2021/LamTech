import React, { useState } from 'react';
import { Container, Header, Loader, Input } from 'semantic-ui-react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 21.5,
  lng: -158,
};

export default function Geo({ parentToChild }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '',
  });
  const [selected, setSelected] = useState(null);
  console.log(parentToChild);
  return (
    <Container>
      <Header>Filter   <Input placeholder='Animal Name'/></Header>
      { isLoaded ?
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {parentToChild.map((reports) => <Marker
            key={reports._id}
            position={{ lat: reports.latitude, lng: reports.longitude }}
            onClick={() => { setSelected(reports); }}
          />)}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.latitude, lng: selected.longitude }}
              onCloseClick={() => { setSelected(null); }}
            >
              <Card>
                <Card.Img variant="top" src={selected.image} />
                <Card.Body>
                  <Card.Title>{selected.animal} spotted here</Card.Title>
                  <Card.Text>
                    Reporter: {selected.name}
                    <br/>
                    Reporter phone#: {selected.phoneNumber}
                    <br/>
                    Reporter email: {selected.email}
                    <br/>
                    Date: {new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(selected.date)}
                    <br/>
                    Location: {selected.location}
                    <br/>
                    Coordinate: {selected.latitude}, {selected.longitude}
                    <br/>
                    Behavior: {selected.behavior}
                    <br/>
                    Characteristics: {selected.characteristics}
                    <br/>
                    # of onlookers: {selected.beachGoers}
                  </Card.Text>
                </Card.Body>
              </Card>
            </InfoWindow>
          ) : null }
        </GoogleMap> :
        <Loader> Loading </Loader>
      }
    </Container>
  );
}

Geo.propTypes = {
  parentToChild: PropTypes.array.isRequired,
};
