import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const EventCard = (props) => {
  const { name, date, location, league, event_id } = props.eventData;
  return (
    <Card
    style= {{backgroundColor: 'lightgray'}}>
      <Card.Body>
        <Card.Title style = {{fontSize: '4vh', color: '#404040'}}>{name}</Card.Title>
        <Card.Text style = {{fontSize: '2.5vh', color: '#404040'}}>{date}</Card.Text>
        <Card.Text style = {{fontSize: '2.5vh', color: '#404040'}}>{location}</Card.Text>
        <Card.Text style = {{fontSize: '2.5vh', color: '#404040'}}>{league}</Card.Text>
      </Card.Body>
      <Card.Footer style= {{backgroundColor: 'dimgray'}}>
        <Button href={`/player/${event_id}`} class="btn btn-primary stretched-link"
        style= {{backgroundColor: '#3d405b', borderColor: 'black'}}>
          More Info
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default EventCard;