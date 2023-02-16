import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const PlayerCard = (props) => {
  const { name, image, team, league, player_id } = props.playerData;
  return (
    <Card
    style= {{backgroundColor: 'lightgray'}}>
      <Card.Img variant="top" src={image} style={{width: '100%', height: '20vw', objectFit: 'cover'}}/>
      <Card.Body>
        <Card.Title style = {{fontSize: '4vh', color: '#404040'}}>{name}</Card.Title>
        <Card.Text style = {{fontSize: '2.5vh', color: '#404040'}}>{team}</Card.Text>
        <Card.Text style = {{fontSize: '2.5vh', color: '#404040'}}>{league}</Card.Text>
      </Card.Body>
      <Card.Footer style= {{backgroundColor: 'dimgray'}}>
        <Button href={`/player/${player_id}`} class="btn btn-primary stretched-link"
        style= {{backgroundColor: '#3d405b', borderColor: 'black'}}>
          More Info
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PlayerCard;