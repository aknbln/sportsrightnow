import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const APICard = (props) => {
  const { title, image, text, url } = props.techData;
  return (
    <Card
    style= {{backgroundColor: 'lightgray'}}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title style = {{fontSize: '4vh', color: '#404040'}}>{title}</Card.Title>
        <Card.Text style = {{fontSize: '2.5vh', color: '#404040'}}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer style= {{backgroundColor: 'dimgray'}}>
        <Button href={url} class="btn btn-primary stretched-link"
        style= {{backgroundColor: '#3d405b', borderColor: 'black'}}>
          More Info
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default APICard;
