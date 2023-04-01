import React from 'react';
import EventCard from '../components/EventCard';
import { Stack } from 'react-bootstrap';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
import { Pagination } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react'
import Button from "react-bootstrap/Button";
import { useForm } from 'react-hook-form';

import axios from 'axios';

const ax = axios.create({
  baseURL: "https://api.sportsrightnow.me/"
})

const Events = ({}) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [dataSlice, setDataSlice] = useState([])
  const [eventData, setEventData] = useState([])
  const [dataLength, setDataLength] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [pages, setPages] = useState([])
  const [loaded, setLoaded] = useState(false);

  const {register, handleSubmit} = useForm()
  const onSubmit = data => console.log(data)

  const ITEMS_PER_PAGE = 9
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
      .get("events")
      .then((response) => (
        setDataLength(response.data.data.length),
        setPageCount(Math.ceil(response.data.data.length / ITEMS_PER_PAGE)),
        CreatePages(Math.ceil(response.data.data.length / ITEMS_PER_PAGE)),
        setDataSlice(response.data.data.slice(1, ITEMS_PER_PAGE + 1)),
        changePage(1))
      )
    }

    fetchData()
    
  }, [])

  function changePage(num) {

    const fetch = async(pageNum) => {
      await ax
      .get("events", {params: {page: pageNum, perPage: ITEMS_PER_PAGE}})
      .then((response) => (
        setEventData(response.data.data)
      ))
    }
    setCurrentPage(num)
    fetch(num)
  }

  return (
    <div className="Events">
      <header className="App-header" style={{padding:"2%"}}>
        <h1>Events</h1>
        <p>Find your upcoming events!</p>
        <p>Total events: {dataLength}</p>
      </header>
      
      <div className="App-body">
        <Container style={{padding: '3vh'}}>
          
        <h1>Events</h1>
          <hr style={{backgroundColor: 'white', height: "2px"}}/>
          <h2>Filter</h2>

          <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexWrap:"wrap", gap: "1%", rowGap:"1vh"}}>
            <div className='Form-element'>
              <label>Event Name</label>
              <br/>
              <input type="text" name="eventName" {...register("eventName")}/>
            </div>
            
            <div className='Form-element'>
              <label>City</label>
              <br/>
              <input type="text" name="city" {...register("city")}/>
            </div>

            <div className='Form-element'>
              <label>League</label>
              <br/>
              <select {...register("league")}>
                <option value="nba">NBA</option>
                <option value="nfl">NFL</option>
                <option value="mlb">MLB</option>
              </select>
            </div>

            <div style={{width: "100%"}}/>

            <div className='Form-element'>
              <label>Venue</label>
              <br/>
              <input type="text" name="venue" {...register("venue")}/>
            </div>

            <div className='Form-element'>
              <label>Date</label>
              <br/>
              <input type="date" name="date" {...register("date")}/>
            </div>

            <div className='Form-element'>
              <label>Time</label>
              <br/>
              <input type="time" name="time" {...register("time")}/>
            </div>

            <div style={{width: "100%"}}/>

            <input type="submit" value="Filter" style={{width: '15%'}}/> 
          </form>
            
          <hr style={{backgroundColor: 'white', height: "2px"}}/>
            <Row xs={2} md={3} lg={3}>
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
        <Pagination>{pages}</Pagination>
      </div>
    </div>
  );
};

export default Events
