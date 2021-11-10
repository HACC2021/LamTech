import React from 'react';
import { Table, Icon, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { Reports } from '../../api/report/Report';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AdminReportItems extends React.Component {
  handleClick(id) {
    Reports.collection.remove(id);
  }

  render() {
    return (
      <Table.Row>
        <Table.HeaderCell>{this.props.report.animal}</Table.HeaderCell>
        <Table.HeaderCell>{this.props.report.name}</Table.HeaderCell>
        <Table.HeaderCell>{this.props.report.phoneNumber}</Table.HeaderCell>
        <Table.HeaderCell>{new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(this.props.report.date)}</Table.HeaderCell>
        <Table.HeaderCell>{this.props.report.email}</Table.HeaderCell>
        <Table.HeaderCell>{this.props.report.location}</Table.HeaderCell>
        <Table.HeaderCell>{this.props.report.longitude}</Table.HeaderCell>
        <Table.HeaderCell>{this.props.report.latitude}</Table.HeaderCell>
        <Table.HeaderCell>{this.props.report.behavior}</Table.HeaderCell>
        <Table.HeaderCell>{this.props.report.characteristics}</Table.HeaderCell>
        <Table.HeaderCell>{this.props.report.beachGoers}</Table.HeaderCell>
        <Table.HeaderCell><Image width={180} height={180} src={this.props.report.image}/></Table.HeaderCell>
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
    _id: PropTypes.string,
  }).isRequired,
};

export default AdminReportItems;
