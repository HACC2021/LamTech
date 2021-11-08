import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    return (
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">LamsTech</Navbar.Brand>
          {this.props.currentUser ? (
            [<Nav.Link href="/add" key='add'>Add Stuff</Nav.Link>,
              <Nav.Link href="/list" key='list'>List Stuff</Nav.Link>]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Nav.Link href="/admin" key='admin'>Admin</Nav.Link>
          ) : ''}
          <Nav className="justify-content-end">
            {this.props.currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login" icon={'user'}>
                <NavDropdown.Item id="login-dropdown-sign-in" icon="user" href="#/signin">Sign In</NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" icon="add user" href="#/signup">Sign Up</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={this.props.currentUser} icon={'user'}>
                <NavDropdown.Item id="navbar-sign-out" icon="sign out" href="#/signout">Sign Out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
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
