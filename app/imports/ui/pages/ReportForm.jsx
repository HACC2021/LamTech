import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Form, Button, Container, Spinner, Image } from 'react-bootstrap';
import {
  AutoForm,
  ErrorsField,
  NumField,
  LongTextField,
  SubmitField,
  TextField, HiddenField,

} from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Geocode from 'react-geocode';
import { Geolocation } from 'meteor/mdg:geolocation';
import { Reports } from '../../api/report/Report';
import 'bootstrap/dist/css/bootstrap.min.css';

const bridge = new SimpleSchema2Bridge(Reports.schema);
Geocode.setApiKey('AIzaSyDE0DdeQlWnwN0IggkY4GMD_SniLR_3ZhA');

class ReportForm extends React.Component {
  constructor(props) {
    super(props);
    this.getAddress();
    this.state = {
      date: new Date(),
      address: '',
      lat: 0,
      lng: 0,
      image: '',
      check: false,
      redirectToReferer: false,
    };

    this.onImageChange = this.onImageChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.getAddress = this.getAddress.bind(this);
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      const image = URL.createObjectURL(img);
      this.setState({
        image: image,
      });
    }
  };

  handleCheck(evt) {
    this.setState({ check: evt.target.checked });
  }

  getAddress() {
    let lat;
    let lng;
    let address;
    const latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (latLng != null) {
      lat = latLng.lat;
      lng = latLng.lng;
      this.setState({ lat, lng });
      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          address = response.results[0].formatted_address;
          this.setState({ address });
          console.log(address);
          console.log(lat);
          console.log(lng);
        },
        (error) => {
          console.error(error);
        },
      );
    }
  }

  submit(data) {
    const { animal, name, phoneNumber, email, date, location, latitude, longitude, behavior, characteristics, beachGoers, image } = data;
    Reports.collection.insert({ animal, name, phoneNumber, email, date, location, latitude, longitude, behavior, characteristics, beachGoers, image },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Report submitted successfully', 'success');
          Meteor.call(
            'sendEmail',
            'LamTech <lamtechmailguy@gmail.com>',
            'lamtechmailguy@gmail.com',
            (`A new ${animal} sighting has been reported`),
            (`Animal: ${animal}\n
            Reporter: ${name}\n
            Reporter phone#: ${phoneNumber}\n
            Reporter email: ${email}\n
            Date: ${new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date)}\n
            Location: ${location}\n
            Coordinate: ${latitude}, ${longitude}\n
            Behavior: ${behavior}\n
            Characteristics: ${characteristics}\n
            # of onlookers: ${beachGoers}\n
            `),
          );
          this.setState({ redirectToReferer: true });
        }
      });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Spinner animation="border"/>;
  }

  renderPage() {
    const { animal } = this.props.location;
    if (this.state.redirectToReferer || animal === undefined) {
      return <Redirect to='/'/>;
    }
    return (
      <Container className='AdminPage'>
        <h1>Report Sighting of {animal}</h1>
        <Image src={this.state.image}/>
        <Form.Group widths={'equal'}>
          <Form.Label>Upload a image</Form.Label>
          <Form.Control
            type="file"
            accept="image/png, image/jpeg"
            onChange={this.onImageChange}
          />
        </Form.Group>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
          <Form.Group widths={'equal'}>
            <TextField name='name' placeholder='John Doe' label='Name'/>
            <TextField name='email' placeholder='john@foo.com' label='Email'/>
            <NumField name='phoneNumber' placeholder='8081234567' label='Phone#'/>
          </Form.Group>
          <Form.Group widths={'equal'}>
            <Button onClick={this.getAddress}>Get Current Location</Button>
            <h3>Your current location is: {this.state.address}</h3>
            <LongTextField name='behavior' placeholder="Behavior of the animal and it's interaction with the envierment" label='Behavior'/>
            <LongTextField name='characteristics' placeholder='Characteristics of the animal' label='Characteristics'/>
            <NumField name='beachGoers' placeholder='# of people around the animal' label='People Nearby'/>
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Animal is not injured" checked={this.state.check} onChange={this.handleCheck}/>
          </Form.Group>
          {
            this.state.check ? <SubmitField color='green' value='Summit Report'/> :
              (
                <Form.Group>
                  <p className="h4">If the animal is injured please call immediately</p>
                  <a className="h4" href="tel:8882569840">Call us at 888-256-9840</a>
                </Form.Group>
              )
          }
          <br/>
          <Button color='red' as={NavLink} exact to="/selectAnimal">Cancel</Button>
          <ErrorsField/>
          <HiddenField name='animal' value={animal}/>
          <HiddenField name='date' value={this.state.date}/>
          <HiddenField name='location' value={this.state.address}/>
          <HiddenField name='latitude' value={this.state.lat}/>
          <HiddenField name='longitude' value={this.state.lng}/>
          <HiddenField name="image" value={this.state.image}/>
        </AutoForm>
      </Container>
    );
  }
}

ReportForm.propTypes = {
  ready: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    animal: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Reports.adminPublicationName);
  const ready = subscription.ready();
  return {
    ready,
  };
})(ReportForm);
