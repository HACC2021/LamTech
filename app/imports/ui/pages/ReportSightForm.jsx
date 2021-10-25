import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

class ReportSightForm extends React.Component {

  render() {
    return (
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" placeholder="Date of Sight" />
          </Form.Group>

          <Form.Group as={Col} controlId="formPhoneNumber">
            <Form.Label>PhoneNumber</Form.Label>
            <Form.Control type="number" data-format="+1 (ddd) ddd-dddd" placeholder="(xxx)xxx-xxxx" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Button variant="primary" type="submit">
            Submit
        </Button>
      </Form>
    );
  }
}

export default ReportSightForm;
