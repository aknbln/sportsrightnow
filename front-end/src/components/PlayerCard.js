import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const PlayerCard = (props) => {
  const { name, image, team, league, age, country, player_id } = props.playerData;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()

  function ButtonClicked(id) {
    navigate("/players/instance?id=" + id)
  }

  return (
    <Card
    style= {{backgroundColor: 'lightgray'}}>
      <Card.Img variant="top" src={image} style={{width: '100%', height: '20vw', objectFit: 'cover'}}/>
      <Card.Body>
        <Card.Title style = {{fontSize: '3vh', color: '#333232'}}>{name}</Card.Title>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Team: {team}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>League: {league}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Age: {age}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Nationality: {country}</Card.Text>
      </Card.Body>
      <Card.Footer style= {{backgroundColor: 'dimgray'}}>
        <Button class="btn btn-primary stretched-link" onClick={() => ButtonClicked(player_id)}
        style= {{backgroundColor: '#3d405b', borderColor: 'black'}}>
          More Info
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PlayerCard;