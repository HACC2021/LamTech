import React from 'react';
import { Image, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container className="landing">
        <Image src="images/landing.jpg" fluid/>
        <div className="reportcss">
          <Button className="btn btn-primary btn-lg" href="#/selectAnimal">Report a Sighting</Button>
          <p className="h4">Or</p>
          <p className="h4">Animal is Distress?</p>
          <a className="h4" href="tel:8882569840">Call us at 888-256-9840</a>
        </div>
      </Container>

    );
  }
}

export default Landing;
