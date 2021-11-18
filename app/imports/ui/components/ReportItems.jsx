import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridRow, Header, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ReportItems extends React.Component {
  render() {
    return (
      <Grid columns={10} divided>
        <GridRow>
          <Header as='h5' textAlign='left'>Reported Animal: {this.props.report.animal}</Header>
        </GridRow>
        <GridRow>
          <Header as='h5' textAlign='left'>Reporter Name: {this.props.report.name}</Header>
          <Header as='h5' textAlign='left'>Reporter Email: {this.props.report.email}</Header>
          <Header as='h5' textAlign='left'>Reporter PhoneNumber: {this.props.report.phoneNumber}</Header>
        </GridRow>
        <GridRow>
          <Header as='h5' textAlign='left'>Time of Report: {this.props.report.date}</Header>
          <Header as='h5' textAlign='left'>Location of Animal Sight: {this.props.report.location}</Header>
        </GridRow>
        <GridRow>
          <Header as='h5' textAlign='left'>Behavior of Animal: {this.props.report.behavior}</Header>
        </GridRow>
        <GridRow>
          <Header as='h5' textAlign='left'>Characteristics of the Animal: {this.props.report.characteristics}</Header>
        </GridRow>
        <GridRow>
          <Header as='h5' textAlign='left'>Number of Beach Goers nearBy: {this.props.report.beachGoers}</Header>
        </GridRow>
        <GridRow>
          <Image as='h5' textAlign='left'>Picture of the Animal: {this.props.report.image}</Image>
        </GridRow>
      </Grid>
    );
  }
}

// Require a document to be passed to this component.
ReportItems.propTypes = {
  report: PropTypes.shape({
    animal: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    email: PropTypes.string,
    location: PropTypes.string,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    behavior: PropTypes.string,
    characteristics: PropTypes.string,
    beachGoers: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ReportItems);
