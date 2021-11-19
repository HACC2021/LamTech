import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    return (
      <div>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          [<Navbar key='Navbar' fixed="top" bg="black" variant="dark">
            <Container><Nav.Link href="#/admin" key='admin'>Admin</Nav.Link>,
              <Nav.Link href="#/signout" key='signout'>Sign Out</Nav.Link></Container>
          </Navbar>]
        ) : ''}
      </div>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
