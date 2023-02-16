import React from 'react';
import PlayerCard from '../components/PlayerCard';
import { Stack } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { playerData } from '../assets/PlayerData'

const Players = ({}) => {
  return (
    <div className="Players">
      <header className="Players-header">
        <h1>Players</h1>
        <p>Find your favorite players!</p>
      </header>
      
      <div className="Players-body">
        <Container style={{padding: '3vh'}}>
          <h2>Players</h2>
          <hr style={{backgroundColor: 'white', height: "2px"}}/>
            <Row xs={2} md={3} lg={4}>
              {playerData.map((dat) => {
                return (
                  <Col className='d-flex align-self-stretch' style={{paddingTop: '4px'}}>
                    <PlayerCard playerData={dat}/>                        
                  </Col>
               )
             })}
            </Row>
            <br/>
            <br/>
        </Container>
      </div>
    </div>
  );
};

export default Players
