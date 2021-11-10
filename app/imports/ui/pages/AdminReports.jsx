import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Reports } from '../../api/report/Report';
import AdminReportItems from '../components/AdminReportItems';

/** A simple static component to render some text for the landing page. */
class AdminReports extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <div>
        <Header as="h1" textAlign="center">Check In History/Status</Header>
        <Container>
          <Table padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Animal</Table.HeaderCell>
                <Table.HeaderCell>Reporter Name</Table.HeaderCell>
                <Table.HeaderCell>Reporter PhoneNumber</Table.HeaderCell>
                <Table.HeaderCell>Time of Report</Table.HeaderCell>
                <Table.HeaderCell>Location of Report</Table.HeaderCell>
                <Table.HeaderCell>Behavior of Animal</Table.HeaderCell>
                <Table.HeaderCell>Characteristics of the Animal</Table.HeaderCell>
                <Table.HeaderCell>Number of Beach Goers NearBy</Table.HeaderCell>
                <Table.HeaderCell>Picture of the Animal</Table.HeaderCell>
                <Table.HeaderCell>Transaction</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.report.map((reports) => <AdminReportItems key={reports._id} report={reports} />)}
            </Table.Body>
          </Table>
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
