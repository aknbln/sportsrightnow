import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Highlight } from "../Utils";

const TeamCard = (props) => {
  const { name, logo, city, league, totalWins, totalLosses, id } = props.sportsTeamData;
  const search = [props.q]
  const navigate = useNavigate()

  function ButtonClicked(id) {
    navigate("/teams/instance?id=" + id)
  }

  return (
    <Card
    style= {{backgroundColor: 'lightgray', minWidth: '100%'}}>
      <Card.Img variant="top" src={logo} style={{width: '100%', height: '20vw', objectFit: 'contain'}}/>
      <Card.Body>
        <Card.Title style = {{fontSize: '3vh', color: '#333232'}}>{Highlight(name, search)}</Card.Title>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>League: {Highlight(league, search)}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>City: {Highlight(city, search)}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Wins: {Highlight(totalWins, search)}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Losses: {Highlight(totalLosses, search)}</Card.Text>
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