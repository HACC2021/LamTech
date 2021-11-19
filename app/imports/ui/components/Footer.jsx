import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
          <footer className='footer'>
            <div className="ui center aligned container" >
              <a  className='footerText' href="#/signin">Staff/Admin Login</a>
              <br/>
              Website Designed by LamTech
            </div>
          </footer>
    );
  }
}

export default Footer;
