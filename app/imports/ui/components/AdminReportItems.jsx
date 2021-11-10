import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AdminReportItems extends React.Component {
  handleClick(id) {
    Event.collection.remove(id);
  }
  render() {
    return (
        <Table.Row>
          <Table.HeaderCell>{this.props.report.animal}</Table.HeaderCell>
          <Table.HeaderCell>{this.props.report.animal}</Table.HeaderCell>
          <Table.HeaderCell>{this.props.report.animal}</Table.HeaderCell>
          <Table.HeaderCell>{this.props.report.animal}</Table.HeaderCell>
          <Table.HeaderCell>{this.props.report.animal}</Table.HeaderCell>
          <Table.HeaderCell>{this.props.report.animal}</Table.HeaderCell>
          <Table.HeaderCell>{this.props.report.animal}</Table.HeaderCell>
          <Table.HeaderCell>{this.props.report.animal}</Table.HeaderCell>
          <Table.HeaderCell>{this.props.report.animal}</Table.HeaderCell>
          <Table.HeaderCell><Icon className='trashCan' size='small' color='red' onClick={() => this.handleClick(this.props.report._id)} name='trash'/></Table.HeaderCell>
        </Table.Row>
    );
  }
}

AdminReportItems.propTypes = {
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

export default withRouter(AdminReportItems);
