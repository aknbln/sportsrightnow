import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const EventCard = (props) => {
  const { name, date, location, league, venue, event_id } = props.eventData;
  return (
    <Card
    style= {{backgroundColor: 'lightgray'}}>
      <Card.Body>
        <Card.Header style = {{fontSize: '3vh', color: '#333232'}}>{name}</Card.Header>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Date: {date}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>City: {location}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Venue: {venue}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>League: {league}</Card.Text>
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