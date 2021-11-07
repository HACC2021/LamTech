import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import {
  AutoForm, DateField,
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
import { Reports } from '../../api/report/Report';
import 'bootstrap/dist/css/bootstrap.min.css';
import Geocode from "react-geocode";

const bridge = new SimpleSchema2Bridge(Reports.schema);
Geocode.setApiKey("");

class ReportForm extends React.Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = { redirectToReferer: false };
  }

  submit(data) {
    const { animal, name, phoneNumber, email, date, location, longitude, latitude, behavior, characteristics, beachGoers, image } = data;
    Reports.collection.insert({ animal, name, phoneNumber, email, date, location, longitude, latitude, behavior, characteristics, beachGoers, image },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Report submitted successfully', 'success');
          this.setState({ redirectToReferer: true });
        }
      });

    Geocode.fromAddress("2996 Ala ilima Street").then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
        },
        (error) => {
          console.error(error);
        }
    );

    Geocode.fromLatLng("21.3454613", "-157.9054008").then(
        (response) => {
          const address = response.results[0].formatted_address;
          let city, state, country;
          for (let i = 0; i < response.results[0].address_components.length; i++) {
            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
              switch (response.results[0].address_components[i].types[j]) {
                case "locality":
                  city = response.results[0].address_components[i].long_name;
                  break;
                case "administrative_area_level_1":
                  state = response.results[0].address_components[i].long_name;
                  break;
                case "country":
                  country = response.results[0].address_components[i].long_name;
                  break;
              }
            }
          }
          console.log(city, state, country);
          console.log(address);
        },
        (error) => {
          console.error(error);
        }
    );

    console.log(Geolocation.currentLocation());
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Spinner animation="border">Getting data</Spinner>;
  }

  renderPage() {
    if (this.state.redirectToReferer) {
      return <Redirect to='/'/>;
    }
    const { animal } = this.props.location;
    return (
      <Container>
        <h1>Report Sighting of {animal}</h1>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
          <Form.Group widths={'equal'}>
            <TextField name='name' placeholder='John Doe' label='Name'/>
            <TextField name='email' placeholder='john@foo.com' label='Email'/>
            <NumField name='phoneNumber' placeholder='8081234567' label='Phone#'/>
          </Form.Group>
          <Form.Group widths={'equal'}>
            <DateField name='date' label='Date'/>
            <TextField name='location' placeholder='Address' label='Location'/>
            <LongTextField name='behavior' placeholder="Behavior of the animal and it's interaction with the envierment" label='Behavior'/>
            <LongTextField name='characteristics' placeholder='Characteristics of the animal' label='Characteristics'/>
            <NumField name='beachGoers' placeholder='# of people around the animal' label='People Nearby'/>
          </Form.Group>
          <SubmitField color='green' value='Summit Report'/>
          <Button color='red' as={NavLink} exact to="/selectAnimal">Cancel</Button>
          <ErrorsField/>
          <HiddenField name='animal' value={animal}/>
          <HiddenField name='longitude' value={1}/>
          <HiddenField name='latitude' value={1}/>
          <HiddenField name='image' value={'temp'}/>
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
