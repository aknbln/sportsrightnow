import React, { useEffect, useState } from 'react'
import logo from '../assets/images/ball.svg'
import TestButton from '../components/Button'
import PlayerCard from '../components/PlayerCard'
import EventCard from '../components/EventCard'
import TeamCard from '../components/TeamCard'
import { useSearchParams, Link } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios'
import { Container, Col, Row } from 'react-bootstrap';

const ax = axios.create({
  baseURL: "https://api.sportsrightnow.me/search/"
})

const Search = ({}) =>{

    const [searchParams, setSearchParams] = useSearchParams()
    const [loaded, setLoaded] = useState(false)
    const [querry, setQuerry] = useState("")

    const [resultCount, setResultCount] = useState(0)
    const [resPlayers, setResPlayers] = useState([])
    const [resTeams, setResTeams] = useState([])
    const [resEvents, setResEvents] = useState([])

    function processData(data){
      let count = 0
      let temp = data.players.slice(0, 12);
      count += temp.length
      setResPlayers(temp)

      temp = data.teams.slice(0, 12);
      count += temp.length
      setResTeams(temp)

      temp = data.events.slice(0, 12);
      count += temp.length
      setResEvents(temp)
      
      setResultCount(count)

      console.log(count)
    }

    useEffect(() => {
      const search = async(q) => {
        await ax
        .get(q)
        .then((response) => (
          processData(response.data),
          setLoaded(true)
        ))
      }

      let q = searchParams.get("q")
      setQuerry(q)
      search(q)
    }, [searchParams])

    if(!loaded){
      return (
        <div className="App">
            <header className="App-header">
              <h2>Search</h2>
              <h4>You searched for "{querry}"</h4>
            </header>
            <div className='App-body'>
              <p>
                Loading...
              </p>
            </div>
          </div>
    )
    }
    else{
      return (
        <div className="App">
            <header className="App-header">
              <h2>Search</h2>
              <h4>You searched for "{querry}"</h4>
            </header>
            <div className='App-body'>
              <h2>{resultCount} Results</h2>
              <div style={{height:"6vh"}}/>
              <Tabs defaultActiveKey="players" className="mb-1">

                <Tab eventKey="players" title="Players">
                  <div style={{padding: "2vh"}}>
                      <Container>
                        <Row xs={2} md={3} lg={4}>
                          {resPlayers.map((dat) => {
                            return (
                            <Col className='d-flex align-self-stretch' style={{paddingTop: '4px'}}>
                              <PlayerCard playerData={dat} q={querry}/>                        
                            </Col>
                            )
                          })}
                      </Row>
                      </Container>
                  </div>
                </Tab>

                <Tab eventKey="teams" title="Teams">
                  <div style={{padding: "2vh"}}>
                      <Container>
                        <Row xs={2} md={3} lg={4}>
                          {resTeams.map((dat) => {
                            return (
                            <Col className='d-flex align-self-stretch' style={{paddingTop: '4px'}}>
                              <TeamCard sportsTeamData={dat} q={querry}/>                        
                            </Col>
                            )
                          })}
                      </Row>
                      </Container>
                  </div>
                </Tab>

                <Tab eventKey="events" title="Events">
                  <div style={{padding: "2vh"}}>
                      <Container>
                        <Row xs={2} md={3} lg={4}>
                          {resEvents.map((dat) => {
                            return (
                            <Col className='d-flex align-self-stretch' style={{paddingTop: '4px'}}>
                              <EventCard eventData={dat} q={querry}/>                        
                            </Col>
                            )
                          })}
                      </Row>
                      </Container>
                  </div>
                </Tab>

              </Tabs>
            </div>
          </div>
    )
    }
    
}

export default Search