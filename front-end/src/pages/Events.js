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
  const [loaded, setLoaded] = useState(false)
  const [filterParams, setFilterParams] = useState({})

  const {register, handleSubmit} = useForm()
  const onSubmit = data => CreateFilter(data)

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

  function CreateFilter(data){
    let filter = {}
    if(data.eventName !== "") filter.name = data.eventName
    if(data.city !== "") filter.city = data.city
    if(data.venue !== "") filter.venue = data.venue
    if(data.date !== "") filter.date = data.date
    if(data.time !== "") filter.time = data.time
    if(data.league !== "any") filter.league = data.league
    
    switch(data.sort){
      case "default":
        break
      case "name-asc":
        filter.sort = "name"
        filter.asc = true
        break
      case "name-dsc":
        filter.sort = "name"
        break
      case "date-asc":
        filter.sort = "local_date"
        filter.asc = true
        break
      case "date-dsc":
        filter.sort = "local_date"
        break
    }

    setFilterParams(filter)
  }

  useEffect(() => {
    

    const fetchData = async() => {
      await ax
      .get("events", {params})
      .then((response) => (
        setDataLength(response.data.data.length),
        setPageCount(Math.ceil(response.data.data.length / ITEMS_PER_PAGE)),
        CreatePages(Math.ceil(response.data.data.length / ITEMS_PER_PAGE)),
        setDataSlice(response.data.data.slice(1, ITEMS_PER_PAGE + 1)),
        setLoaded(true),
        changePage(1))
      )
    }

    setLoaded(false)
    const params = new URLSearchParams(filterParams)
    fetchData(params)
    
  }, [filterParams])

  useEffect(() => {
    CreatePages(pageCount)
  }, [currentPage])

  function changePage(num) {

    const fetch = async(params) => {
      await ax
      .get("events", {params})
      .then((response) => (
        setEventData(response.data.data)
      ))
    }
    
    let p = structuredClone(filterParams)
    p.page = num
    p.perPage = ITEMS_PER_PAGE
    const params = new URLSearchParams(p)
    setCurrentPage(num)
    fetch(params)
  }

  if(!loaded){
    return(
      <div className="Events">
      <header className="App-header" style={{padding: "2%"}}>
        <h1>Events</h1>
        <p>Find your upcoming events!</p>
      </header>
      
      <div className="App-body">
        <h2>Loading...</h2>
      </div>
    </div>
    )
  }
  else{
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
          <h2>Filter / Sort</h2>

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
                <option value="any">Any</option>
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

            <div className='Form-element'>
              <label>Sort By</label>
              <br/>
              <select {...register("sort")}>
                <option value="default">Default</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-dsc">Name Z-A</option>
                <option value="date-asc">Date ↑</option>
                <option value="date-dsc">Date ↓</option>
              </select>
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
  }
};

export default Events
