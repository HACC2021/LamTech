import React from 'react';
import { Image, Button, Container, Col, Row } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import Geo from '../components/Geo';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container fluid className="position-absolute top-50 start-50 translate-middle">
        <Row>
          <Col>
            <div className="text-center">
              <Image src="images/landing.jpg" fluid/>
            </div>
          </Col>
          <Col>
            <div>
              <Button className="btn btn-primary btn-lg" href="#/selectAnimal"><MDBIcon icon="eye"/>Report A Sighting</Button>
              <p className="h4">Or</p>
              <p className="h4">Find Anmial is Distress?</p>
              <a className="h4" href="tel:8882569840">Call us at 888-256-9840</a>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Landing;
