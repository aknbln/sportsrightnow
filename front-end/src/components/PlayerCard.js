import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Highlight } from "../Utils";

const PlayerCard = (props) => {
  const { name, headshot, team, league, college, jersey, id} = props.playerData;
  const search = [props.q]
  const navigate = useNavigate()

  function ButtonClicked(id) {
    navigate("/players/instance?id=" + id)
  }

  return (
    <Card
    style= {{backgroundColor: 'lightgray', minWidth: '100%'}}>
      <Card.Img variant="top" src={headshot} style={{width: '100%', height: '20vw', objectFit: 'cover'}}/>
      <Card.Body>
        <Card.Title style = {{fontSize: '3vh', color: '#333232'}}>{Highlight(name, search)}</Card.Title>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Team: {Highlight(team, search)}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Jersey #{Highlight(jersey, search)}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>League: {Highlight(league, search)}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>College: {Highlight(college, search)}</Card.Text>
        
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

export default PlayerCard;