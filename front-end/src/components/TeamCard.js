import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Highlight } from "../Utils";

const TeamCard = (props) => {
  const { name, logo, city,rank, conference,league, totalWins, totalLosses, id } = props.sportsTeamData;
  const search = [props.q]
  const navigate = useNavigate()

  function ButtonClicked(id) {
    navigate("/teams/instance?id=" + id)
  }

  return (
    <Card onClick={(()=> console.log("clicked" + JSON.stringify(props)))}
    style= {{backgroundColor: 'lightgray', minWidth: '100%', maxHeight: '100%', minHeight: '100%', whiteSpace: 'nowrap'}}>
      <Card.Img variant="top" src={logo} style={{width: '100%', height: '20vw', objectFit: 'contain'}}/>
      <Card.Body>
        <Card.Title style = {{fontSize: '3vh', color: '#333232', textAlign: 'center'}}>{Highlight(name, search)}</Card.Title>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>League: {Highlight(league, search)}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Conference: {Highlight(conference, search)}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Rank: {rank}</Card.Text>
        <Card.Text style = {{fontSize: '2vh', color: '#404040'}}>Record(W/L): {totalWins} / {totalLosses}</Card.Text>
      </Card.Body>
      <Card.Footer style= {{backgroundColor: 'dimgray'}}>
        <Button class="btn btn-primary stretched-link" onClick={() => ButtonClicked(id)}
        style= {{backgroundColor: '#3d405b', borderColor: 'black',}}>
          More Info
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default TeamCard;