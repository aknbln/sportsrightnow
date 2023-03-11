import React from 'react';
import EventCard from '../components/EventCard';
import { Stack } from 'react-bootstrap';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
import { eventData } from '../assets/EventData'
import { Pagination } from 'react-bootstrap';
import { useState, useEffect } from 'react'

const Events = ({}) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [dataSlice, setDataSlice] = useState([])

  let active = 1
  let pages = []
  for (let item = 1; item <= 3; item++){
    pages.push(
      <Pagination.Item key={item} active={item === currentPage} onClick={(event) => changePage(item)}>
        {item}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    setDataSlice(eventData.slice(currentPage - 1,currentPage))
  }, [])

  const changePage = pageNumber => {
    setCurrentPage(pageNumber)
    setDataSlice(eventData.slice(pageNumber - 1,pageNumber))
  }

  return (
    <div className="Events">
      <header className="App-header">
        <h1>Events</h1>
        <p>Find your upcoming events!</p>
      </header>
      
      <div className="App-body">
        <Container style={{padding: '3vh'}}>
          <h2>Events</h2>
          <hr style={{backgroundColor: 'white', height: "2px"}}/>
            <Row xs={2} md={3} lg={4}>
              {dataSlice.map((dat) => {
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
        <Pagination>{pages}</Pagination>
      </div>
    </div>
  );
};

export default Events
