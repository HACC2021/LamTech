import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import { Reports } from '../../api/report/Report';
import AdminReportItems from '../components/AdminReportItems';
import Geo from '../components/Geo';

/** A simple static component to render some text for the landing page. */
class AdminReports extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }


  renderPage() {
    return (
      <div className='AdminPage'>
        <Geo/>
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
              {this.props.report.map((reports) => <AdminReportItems key={reports._id} report={reports} />)}
            </Table.Body>
          </Table>
          <CSVLink
            data={this.props.report}
            onClick={() => {
              console.log('You click the link'); // 👍🏻 Your click handling logic
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
