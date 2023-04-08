import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Highlight } from "../Utils";

const EventCard = (props) => {
  const { name, local_date, city, local_time, venue, id } = props.eventData;
  const search = [props.q]
  const navigate = useNavigate()


  function ButtonClicked(id) {
    navigate("/events/instance?id=" + id)
  }

  function CheckIfPastEvent(time){
    if(time.includes("-")){
      return "Past Event"
    }
    else{
      return Highlight(local_time, search)
    }
  }

  return (
    <Card
    style= {{backgroundColor: 'lightgray', width: "120%"}}>
      <Card.Body>
        <Card.Header style = {{fontSize: '3vh', color: '#333232'}}>{Highlight(name, search)}</Card.Header>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Date: {Highlight(local_date, search)}</Card.Text>

        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Time: {CheckIfPastEvent(local_time)}</Card.Text>

        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>City: {Highlight(city, search)}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Venue: {Highlight(venue, search)}</Card.Text>
        
      </Card.Body>
      <Card.Footer style= {{backgroundColor: 'dimgray'}}>
        <Button class="btn btn-primary stretched-link" onClick={() => ButtonClicked(id)}
        style= {{backgroundColor: '#3d405b', borderColor: 'black'}}>
          More Info
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default EventCard;