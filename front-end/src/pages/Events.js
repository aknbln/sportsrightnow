import React from 'react';
import EventCard from '../components/EventCard';
import { Stack } from 'react-bootstrap';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
import { eventData } from '../assets/EventData'

const Events = ({}) => {
  return (
    <div className="Events">
      <header className="Events-header">
        <h1>Events</h1>
        <p>Find your upcoming events!</p>
      </header>
      
      <div className="Players-body">
        <Container style={{padding: '3vh'}}>
          <h2>Events</h2>
          <hr style={{backgroundColor: 'white', height: "2px"}}/>
            <Row xs={2} md={3} lg={4}>
              {eventData.map((dat) => {
                return (
                  <Col className='d-flex align-self-stretch' style={{paddingTop: '4px'}}>
                    <EventCard eventData={dat}/>                        
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

export default Events
