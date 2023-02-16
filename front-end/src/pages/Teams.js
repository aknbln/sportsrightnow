import React from 'react';
import TeamCard from '../components/TeamCard';
import { Stack } from 'react-bootstrap';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
import { sportsTeamData } from '../assets/SportsTeamData'

const Teams = ({}) => {
  return (
    <div className="Teams">
      <header className="Teams-header">
        <h1>Teams</h1>
        <p>Find your favorite teams!</p>
      </header>
      
      <div className="Teams-body">
        <Container style={{padding: '3vh'}}>
          <h2>Teams</h2>
          <hr style={{backgroundColor: 'white', height: "2px"}}/>
            <Row xs={2} md={3} lg={4}>
              {sportsTeamData.map((dat) => {
                return (
                  <Col className='d-flex align-self-stretch' style={{paddingTop: '4px'}}>
                    <TeamCard sportsTeamData={dat}/>                        
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

export default Teams
