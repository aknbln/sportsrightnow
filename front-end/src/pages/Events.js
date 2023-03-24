import React from 'react';
import EventCard from '../components/EventCard';
import { Stack } from 'react-bootstrap';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
import { Pagination } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react'

import axios from 'axios';

const ax = axios.create({
  baseURL: "http://api.sportsrightnow.me/events"
})

const Events = ({}) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [dataSlice, setDataSlice] = useState([])
  const [eventData, setEventData] = useState([])
  const [dataLength, setDataLength] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [pages, setPages] = useState([])
  const ITEMS_PER_PAGE = 8
  const stateRef = useRef()
  stateRef.current = eventData

  let active = 1
  
  function CreatePages(count){
    let temp = []

    for (let item = 1; item <= count; item++) {
      temp.push(
        <Pagination.Item key={item} active={item === currentPage} onClick={(event) => changePage(item)}>
          {item}
        </Pagination.Item>
      )
    }

    setPages(temp)
  }

  useEffect(() => {
    
    const fetchData = async() => {
      await ax
      .get()
      .then((response) => (
        console.log(response.data.data),
        setEventData(response.data.data),
        setDataLength(response.data.data.length),
        setPageCount(Math.ceil(response.data.data.length / ITEMS_PER_PAGE)),
        CreatePages(Math.ceil(response.data.data.length / ITEMS_PER_PAGE)),
        setDataSlice(response.data.data.slice(1, ITEMS_PER_PAGE + 1)))
      )
    }

    fetchData()

  }, [])

  function changePage(num) {
    setCurrentPage(num)
    setDataSlice(stateRef.current.slice((num - 1) * ITEMS_PER_PAGE + 1, num * ITEMS_PER_PAGE + 1)) 
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
