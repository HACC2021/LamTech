import React from 'react';
import { Button, Container } from 'react-bootstrap';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container>
        <Button href="#/reportForm">Report A Sighting</Button>
        <a href="tel:8882569840">Call us at 888-256-9840</a>
      </Container>
    );
  }
}

export default Landing;
