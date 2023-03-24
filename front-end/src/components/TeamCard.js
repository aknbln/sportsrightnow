import React, { useEffect } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const TeamCard = (props) => {
  const { name, logo, city, league, totalWins, totalLosses, id } = props.sportsTeamData;

  const navigate = useNavigate()

  function ButtonClicked(id) {
    navigate("/teams/instance?id=" + id)
  }

  return (
    <Card
    style= {{backgroundColor: 'lightgray'}}>
      <Card.Img variant="top" src={logo} style={{width: '100%', height: '20vw', objectFit: 'cover'}}/>
      <Card.Body>
        <Card.Title style = {{fontSize: '3vh', color: '#333232'}}>{name}</Card.Title>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>League: {league}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>City: {city}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Wins: {totalWins}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Losses: {totalLosses}</Card.Text>
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

export default TeamCard;