import React from 'react';
import { Image, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <Image className="landingImage" src="https://wallpaperaccess.com/full/4847452.jpg"/>
          <div className="reportcss">
          <Button className="btn btn-primary btn-lg" href="#/selectAnimal">Report a Sighting</Button> <br/><br/>
          <div className="textsize" >
            Or <br/><br/>
            Animal is Distress? <br/><br/>
            Call us at <a className="textsize" href="tel:8882569840">888-256-9840</a>
          </div>
          </div>
          <Footer/>
        </div>
    );
  }
}

export default Landing;
