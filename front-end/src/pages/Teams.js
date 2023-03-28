import React from 'react';
import TeamCard from '../components/TeamCard';
import { Stack } from 'react-bootstrap';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
import { sportsTeamData } from '../assets/SportsTeamData'
import { Pagination } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react'

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

  useEffect(() => {
    

    const fetchData = async() => {
      await ax
      .get("teams")
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
      .get("teams", {params: {page: pageNum, perPage: ITEMS_PER_PAGE}})
      .then((response) => (
        setTeamData(response.data.data)
      ))
    }
    setCurrentPage(num)
    fetch(num)
  }

  return (
    <div className="Teams">
      <header className="App-header" style={{padding:"2%"}}>
        <h1>Teams</h1>
        <p>Find your favorite teams!</p>
        <p>Total teams: {dataLength}</p>
      </header>
      
      <div className="App-body">
        <Container style={{padding: '3vh'}}>
          <h2>Teams</h2>
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
};

export default Teams
