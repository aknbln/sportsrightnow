import React from "react";
import Card from "react-bootstrap/Card";

function DarkText({ children }) {
  return (
    <span style={{  fontSize: '17px', color: 'black', font: 'Sans-Serif'  }}>{children}</span>
  );
}

function LightText({ children }) {
  return (
    <span style={{  fontSize: '17px', color: '#404040', font: 'Sans-Serif'  }}>{children}</span>
  );
}

const DeveloperCard = (props) => {
  const {
    name,
    image,
    gitlab_username,
    role,
    bio,
    commits,
    issues,
    unit_tests,
  } = props.data;
  return (
    <Card
    style= {{backgroundColor: 'lightgray'}}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title><LightText>{name}</LightText></Card.Title>

        <Card.Subtitle><LightText>@{gitlab_username}</LightText></Card.Subtitle>
        <Card.Text><LightText>Role: {role}</LightText></Card.Text>
        <Card.Text><LightText>{bio}</LightText></Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted" style= {{backgroundColor: 'dimgray'}}>
        <DarkText>Commits: {commits} </DarkText><br />
        <DarkText>Issues: {issues} </DarkText><br />
        <DarkText>Unit Tests: {unit_tests}</DarkText>
      </Card.Footer>
    </Card>
  );
};

export default DeveloperCard;
