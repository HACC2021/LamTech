import React from 'react';
import { Card, Button, Container, CardGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container>
        <CardGroup>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="images/animals/Monk1-min.jpg" />
            <Card.Body>
              <Card.Title>Hawaiian Monk Seals</Card.Title>
              <Card.Text>
                Of all marine mammals, the Hawaiian monk seal (ʻilio holo ika ua ua) is the most endangered in the pinniped family (seals, sea lions and walrus) in the western hemisphere and is listed as endangered under the Endangered Species Act.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button href="#/reportForm">Report Sighting</Button>
            </Card.Footer>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="images/animals/SeaTurtle-min.jpg" />
            <Card.Body>
              <Card.Title>Hawaii’s Sea Turtles</Card.Title>
              <Card.Text>
                The green sea turtle (honu) is categorized as threatened under the Endangered Species Act while the hawksbill turtle (honu ‘ea or ʻea) is categorized as endangered under the Endangered Species Act.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button href="#/reportForm">Report Sighting</Button>
            </Card.Footer>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="images/animals/SpinnerDolphins-min.jpg" />
            <Card.Body>
              <Card.Title>Spinner Dolphins</Card.Title>
              <Card.Text>
                The spinner dolphin (nai’a or ka nai’a) is not currently listed under the Endangered Species Act but is protected under the Marine Mammal Protection Act.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button href="#/reportForm">Report Sighting</Button>
            </Card.Footer>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="images/animals/Humpback1-min.jpg" />
            <Card.Body>
              <Card.Title>Humpback Whales</Card.Title>
              <Card.Text>
                The humpback whale (koholā or koholā kuapi’o) is not currently listed under the Endangered Species Act but is protected under the Marine Mammal Protection Act.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button href="#/reportForm">Report Sighting</Button>
            </Card.Footer>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="images/animals/Bird.jpg" />
            <Card.Body>
              <Card.Title>Hawaii's Seabirds</Card.Title>
              <Card.Text>
                Hawaii’s seabirds travel widely throughout the Pacific and are therefore very important sentinel species. Like “canaries in a coal mine," seabirds can help us understand ecosystem changes that not only affect the birds themselves but pose serious risks to humans.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button href="#/reportForm">Report Sighting</Button>
            </Card.Footer>
          </Card>
        </CardGroup>
      </Container>
    );
  }
}

export default Landing;
