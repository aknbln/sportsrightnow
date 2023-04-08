import React from 'react';
import TeamCard from '../components/TeamCard';
import { Stack } from 'react-bootstrap';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
import { sportsTeamData } from '../assets/SportsTeamData'
import { Pagination } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react'
import Button from "react-bootstrap/Button";
import { useForm } from 'react-hook-form';


import axios from 'axios';

const ax = axios.create({
  baseURL: "https://api.sportsrightnow.me/"
})

const Teams = ({}) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [dataSlice, setDataSlice] = useState([])
  const [teamData, setTeamData] = useState([])
  const [dataLength, setDataLength] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [pages, setPages] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [filterParams, setFilterParams] = useState({})

  const {register, handleSubmit} = useForm()
  const onSubmit = data => CreateFilter(data)

  const ITEMS_PER_PAGE = 9
  const stateRef = useRef()
  stateRef.current = teamData
  stateRef.page = currentPage
  
  let active = 1

  function CreatePages(count){
    let temp = []

    for (let item = 1; item <= count; item++) {
      temp.push(
        <Pagination.Item key={item} active={item === stateRef.page} onClick={(event) => changePage(item)}>
          {item}
        </Pagination.Item>
      )
    }

    setPages(temp)
  }

  function CreateFilter(data){
    let filter = {}
    if(data.teamName !== "") filter.name = data.teamName
    if(data.city !== "") filter.city = data.city
    if(data.minWins !== "" && data.minWins !== undefined) filter.win = data.minWins
    if(data.maxLosses !== "" && data.maxLosses !== undefined) filter.loss = data.maxLosses
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
      case "wins-asc":
        filter.sort = "totalWins"
        filter.asc = true
        break
      case "wins-dsc":
        filter.sort = "totalWins"
        break
      case "loss-asc":
        filter.sort = "totalLosses"
        filter.asc = true
        break
      case "loss-dsc":
        filter.sort = "totalLosses"
        break
    }
    setFilterParams(filter)
  }

  useEffect(() => {
    

    const fetchData = async(params) => {
      await ax
      .get("teams", {params})
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
      .get("teams", {params})
      .then((response) => (
        setTeamData(response.data.data)
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
      <div className="Teams">
      <header className="App-header" style={{padding: "2%"}}>
        <h1>Teams</h1>
        <p>Find your favorite teams!</p>
      </header>
      
      <div className="App-body">
        <h2>Loading...</h2>
      </div>
    </div>
    )
  }
  else{
  return (
    <div className="Teams">
      <header className="App-header" style={{padding:"2%"}}>
        <h1>Teams</h1>
        <p>Find your favorite teams!</p>
        <p>Total teams: {dataLength}</p>
      </header>
      
      <div className="App-body">
        <Container style={{padding: '3vh'}}>
          <h1>Teams</h1>
          <hr style={{backgroundColor: 'white', height: "2px"}}/>
          <h2>Filter / Sort</h2>

          <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexWrap:"wrap", gap: "1%", rowGap:"1vh"}}>
            <div className='Form-element'>
              <label>Team Name</label>
              <br/>
              <input type="text" name="teamName" {...register("teamName")}/>
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
              <label>Win count at least</label>
              <br/>
              <input min="0" type="number" name="minWins" {...register("minWins")}/>
            </div>

            <div className='Form-element'>
              <label>Loss count at most</label>
              <br/>
              <input min="0" type="number" name="maxLosses" {...register("maxLosses")}/>
            </div>

            <div style={{width: "100%"}}/>

            <div className='Form-element'>
              <label>Sort By</label>
              <br/>
              <select {...register("sort")}>
                <option value="default">Default</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-dsc">Name Z-A</option>
                <option value="wins-asc">Wins ↑</option>
                <option value="wins-dsc">Wins ↓ </option>
                <option value="loss-asc">Losses ↑</option>
                <option value="loss-dsc">Losses ↓ </option>
              </select>
            </div>

            <div style={{width: "100%"}}/>

            <input type="submit" value="Filter" style={{width: '15%', marginTop:"3vh"}}/> 
          </form>

          <hr style={{backgroundColor: 'white', height: "2px"}}/>
            <Row xs={2} md={3} lg={3}>
              {teamData.map((dat) => {
                return (
                  <Col className='d-flex align-self-stretch' style={{paddingTop: '4px', minWidth: "33%", alignContent:"center"}}>
                    <TeamCard sportsTeamData={dat}/>                        
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

export default Teams
