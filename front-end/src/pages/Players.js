import React from 'react';
import PlayerCard from '../components/PlayerCard';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
import { Pagination } from 'react-bootstrap';
import { playerData } from '../assets/PlayerData'
import { useState, useEffect } from 'react'

const Players = ({}) => {

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
    setDataSlice(playerData.slice(currentPage - 1,currentPage))
  }, [])

  const changePage = pageNumber => {
    setCurrentPage(pageNumber)
    setDataSlice(playerData.slice(pageNumber - 1,pageNumber))
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
