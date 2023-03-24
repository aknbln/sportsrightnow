import React from 'react';
import PlayerCard from '../components/PlayerCard';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
import { Pagination } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react'

import axios from 'axios';

const ax = axios.create({
  baseURL: "http://api.sportsrightnow.me/players"
})


const Players = ({}) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [dataSlice, setDataSlice] = useState([])
  const [playerData, setPlayerData] = useState([])
  const [dataLength, setDataLength] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [pages, setPages] = useState([])
  const ITEMS_PER_PAGE = 8
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
      .get()
      .then((response) => (
        console.log(response.data.data),
        setPlayerData(response.data.data),
        setDataLength(response.data.data.length),
        setPageCount(31),
        CreatePages(31),
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
    <div className="Players">
      <header className="App-header">
        <h1>Players</h1>
        <p>Find your favorite players!</p>
      </header>
      
      <div className="App-body">
        <Container style={{padding: '3vh'}}>
          <h2>Players</h2>
          <hr style={{backgroundColor: 'white', height: "2px"}}/>
            <Row xs={2} md={3} lg={4}>
              {dataSlice.map((dat) => {
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
