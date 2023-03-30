import React from 'react';
import PlayerCard from '../components/PlayerCard';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
import { Pagination } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react'
import Button from "react-bootstrap/Button";

import axios from 'axios';

const ax = axios.create({
  baseURL: "https://api.sportsrightnow.me/"
})


const Players = ({}) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [dataSlice, setDataSlice] = useState([])
  const [playerData, setPlayerData] = useState([])
  const [dataLength, setDataLength] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [pages, setPages] = useState([])
  const [loaded, setLoaded] = useState(false);
  const ITEMS_PER_PAGE = 12
  const stateRef = useRef()
  stateRef.current = playerData

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
      .get("players")
      .then((response) => (
        setDataLength(Math.min(response.data.data.length, 32 * ITEMS_PER_PAGE)),
        setPageCount(Math.min( Math.ceil(response.data.data.length / ITEMS_PER_PAGE), 32)),
        CreatePages(Math.min( Math.ceil(response.data.data.length / ITEMS_PER_PAGE), 32)),
        setDataSlice(response.data.data.slice(1, ITEMS_PER_PAGE + 1)),
        changePage(1))
      )
    }

    fetchData()
    
  }, [])


  function changePage(num) {

    const fetch = async(pageNum) => {
      await ax
      .get("players", {params: {page: pageNum, perPage: ITEMS_PER_PAGE}})
      .then((response) => (
        setPlayerData(response.data.data)
      ))
    }
    setCurrentPage(num)
    fetch(num)
  }

  return (
    <div className="Players">
      <header className="App-header" style={{padding: "2%"}}>
        <h1>Players</h1>
        <p>Find your favorite players!</p>
        <p>Total Players: {dataLength}</p>
      </header>
      
      <div className="App-body">
        <Container style={{padding: '3vh'}}>
          <h2>Players</h2>
          <Button variant="outline-secondary" onClick={() => setLoaded(false)}>
          Search
        </Button>

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

        <Pagination>{pages}</Pagination>
      </div>
    </div>
  );
};

export default Players
