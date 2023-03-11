import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const EventCard = (props) => {
  const { name, date, location, league, venue, event_id } = props.eventData;

  const navigate = useNavigate()

  function ButtonClicked(id) {
    navigate("/events/instance?id=" + id)
  }

  return (
    <Card
    style= {{backgroundColor: 'lightgray', width: "120%"}}>
      <Card.Body>
        <Card.Header style = {{fontSize: '3vh', color: '#333232'}}>{name}</Card.Header>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Date: {date}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>City: {location}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Venue: {venue}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>League: {league}</Card.Text>
      </Card.Body>
      <Card.Footer style= {{backgroundColor: 'dimgray'}}>
        <Button class="btn btn-primary stretched-link" onClick={() => ButtonClicked(event_id)}
        style= {{backgroundColor: '#3d405b', borderColor: 'black'}}>
          More Info
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default EventCard;