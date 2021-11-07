import React from 'react';
import { Image, Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Geo from '../components/Geo';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container>
        <Geo/>
        <div className="text-center">
          <Image src="images/landing.jpg" fluid/>
          <Button className="btn btn-primary btn-lg" href="#/selectAnimal">Report A Sighting</Button>
          <p className="h4">Or</p>
          <a className="h4" href="tel:8882569840">Call us at 888-256-9840</a>
        </div>
      </Container>
    );
  }
}

export default Landing;
