import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const TeamCard = (props) => {
  const { name, image, country, league, record, founded, team_id } = props.sportsTeamData;
  return (
    <Card
    style= {{backgroundColor: 'lightgray'}}>
      <Card.Img variant="top" src={image} style={{width: '100%', height: '20vw', objectFit: 'cover'}}/>
      <Card.Body>
        <Card.Title style = {{fontSize: '3vh', color: '#333232'}}>{name}</Card.Title>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>League: {league}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Country: {country}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Founded: {founded}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Win/Loss: {record}</Card.Text>
      </Card.Body>
      <Card.Footer style= {{backgroundColor: 'dimgray'}}>
        <Button href={`/player/${team_id}`} class="btn btn-primary stretched-link"
        style= {{backgroundColor: '#3d405b', borderColor: 'black'}}>
          More Info
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default TeamCard;