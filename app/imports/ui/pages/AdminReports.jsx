import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Grid } from 'semantic-ui-react';
import { Form } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import { _ } from 'meteor/underscore';
import { Reports } from '../../api/report/Report';
import AdminReportItems from '../components/AdminReportItems';
import Geo from '../components/Geo';

/** A simple static component to render some text for the landing page. */
class AdminReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSeal: true,
      checkTurtle: true,
      checkDolphin: true,
      checkWhale: true,
      checkBird: true,
    };

    this.handleCheckSeal = this.handleCheckSeal.bind(this);
    this.handleCheckTurtle = this.handleCheckTurtle.bind(this);
    this.handleCheckDolphin = this.handleCheckDolphin.bind(this);
    this.handleCheckWhale = this.handleCheckWhale.bind(this);
    this.handleCheckBird = this.handleCheckBird.bind(this);
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  handleCheckSeal(evt) {
    this.setState({ checkSeal: evt.target.checked });
  }

  handleCheckTurtle(evt) {
    this.setState({ checkTurtle: evt.target.checked });
  }

  handleCheckDolphin(evt) {
    this.setState({ checkDolphin: evt.target.checked });
  }

  handleCheckWhale(evt) {
    this.setState({ checkWhale: evt.target.checked });
  }

  handleCheckBird(evt) {
    this.setState({ Seabird: evt.target.checked });
  }

  renderPage() {
    let reportData = this.props.report;
    if (!this.state.checkSeal) {
      reportData = _.reject(reportData, function (reports) { return reports.animal === 'Hawaiian Monk Seals'; });
    }
    if (!this.state.checkTurtle) {
      reportData = _.reject(reportData, function (reports) { return reports.animal === 'Hawaii’s Sea Turtles'; });
    }
    if (!this.state.checkDolphin) {
      reportData = _.reject(reportData, function (reports) { return reports.animal === 'Spinner Dolphins'; });
    }
    if (!this.state.checkWhale) {
      reportData = _.reject(reportData, function (reports) { return reports.animal === 'Humpback Whales'; });
    }
    if (!this.state.checkBird) {
      reportData = _.reject(reportData, function (reports) { return reports.animal === "Hawaii's Seabirds"; });
    }

    return (
      <div className='AdminPage'>
        <Geo parentToChild={reportData}/>
        <Form.Group>
          <Form.Check inline type="checkbox" label="Hawaiian Monk Seals" checked={this.state.checkSeal} onChange={this.handleCheckSeal}/>
          <Form.Check inline type="checkbox" label="Hawaii’s Sea Turtles" checked={this.state.checkTurtle} onChange={this.handleCheckTurtle}/>
          <Form.Check inline type="checkbox" label="Spinner Dolphins" checked={this.state.checkDolphin} onChange={this.handleCheckDolphin}/>
          <Form.Check inline type="checkbox" label="Humpback Whales" checked={this.state.checkWhale} onChange={this.handleCheckWhale}/>
          <Form.Check inline type="checkbox" label="Hawaii's Seabirds" checked={this.state.checkBird} onChange={this.handleCheckBird}/>
        </Form.Group>
        <Header as="h1" textAlign="center">Submitted Forms</Header>
        <Container>
          <Table padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Animal</Table.HeaderCell>
                <Table.HeaderCell>Reporter Name</Table.HeaderCell>
                <Table.HeaderCell>Reporter PhoneNumber</Table.HeaderCell>
                <Table.HeaderCell>Time of Report</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Location of Report</Table.HeaderCell>
                <Table.HeaderCell>Behavior</Table.HeaderCell>
                <Table.HeaderCell>Characteristics of the Animal</Table.HeaderCell>
                <Table.HeaderCell>Number of Beach Goers NearBy</Table.HeaderCell>
                <Table.HeaderCell>Picture of the Animal</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {reportData.map((reports) => <AdminReportItems key={reports._id} report={reports} />)}
            </Table.Body>
          </Table>
          <CSVLink
            data={reportData}
            onClick={() => {
              console.log('You click the link');
            }}
          >
            Download me
          </CSVLink>
        </Container>
      </div>
    );
  }
}

AdminReports.propTypes = {
  report: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Reports.adminPublicationName);
  const ready = subscription.ready();
  const report = Reports.collection.find({}).fetch();
  return {
    report,
    ready,
  };
})(AdminReports);
