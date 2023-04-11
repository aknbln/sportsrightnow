import React, { useEffect, useState } from 'react'
import { playerData } from '../assets/PlayerData'
import {Link, useSearchParams} from 'react-router-dom'
import { GenerateMapQuerry } from '../Utils'
import PlayerCard from '../components/PlayerCard';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import axios from 'axios'

const ax = axios.create({
  baseURL: "https://api.sportsrightnow.me/teams/"
})

const TeamsInstance = ({}) =>{

    const [searchParams, setSearchParams] = useSearchParams()
    const [teamId, setTeamId] = useState(0)
    const [currentData, setCurrentData] = useState([])
    const [fetchedData, setFetchedData] = useState([])
    const [playerData, setPlayerData] = useState([])
    const [eventData, setEventData] = useState([])
    const [mapQuerry, setMapQuerry] = useState("")
    const [ready, setReady] = useState(false)

    useEffect(() => {
      let id = searchParams.get("id")
      setTeamId(id)
      const fetchData = async() => {
        await ax
        .get(id)
        .then((response) => (
          console.log(response.data.data), 
          setFetchedData(response.data.data),
          setPlayerData(response.data.data.players_info),
          setEventData(response.data.data.events),
          setMapQuerry(GenerateMapQuerry(response.data.data.name)),
          setReady(true)))
      }

      fetchData();
    }, [])

    

    if(!ready){
      return (
        <div className="App">
          <header className="App-header">
            <h1>Loading Team...</h1>
          </header>
            <div className='App-body'>
          </div>
        </div>
      )
    }
    else{
      return (
          <div className="App">
              <header className="App-header">
                <h1>{fetchedData.name}</h1>
              </header>
              <div className='App-body'>
                  <div style={{display: "flex", flexDirection: "row", justifyContent: "center", padding:"1%"}}>
                      <img src={fetchedData.logo} style={{float: 'left', width:'25%'}} alt="picture" />
                      <div style={{width: "10%"}}/>
                      <p style={{float: 'right'}}>
                          League: {fetchedData.league} <br/>
                          Conference: {fetchedData.conference} <br/>
                          Division: {fetchedData.division} <br/>
                          City: {fetchedData.city} <br/>
                          Record: {fetchedData.totalWins}W / {fetchedData.totalLosses}L
                      </p>
                  </div>
                <br/>
                <br/>
                <br/>

                <hr style={{backgroundColor: 'white', width: "40%", margin: "auto"}}/> 

                <div style={{padding: '1%'}}>
                  <h2>Home Stadium</h2>
                  <iframe style={{height: '60vh', width: '45vw'}} src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAp-NjtN6McZptGFjlIYXwX_QDPjr3FVcE&q=${mapQuerry}`}></iframe>
                </div>

                <hr style={{backgroundColor: 'white', width: "40%", margin: "auto"}}/>
                
                <div style={{padding: '1%'}}>
                  <h2>Roster</h2>
                  <Row xs={2} md={3} lg={4}>
                    {
                    playerData.map((player) => {
                      return (
                        <Col className='d-flex align-self-stretch' style={{paddingTop: '4px'}}>
                          <PlayerCard playerData={player}/>                        
                        </Col>
                     )
                  })}
                  </Row>
                </div>

                <hr style={{backgroundColor: 'white', width: "40%", margin: "auto"}}/>

                <div style={{padding: '1%'}}>
                  <h2>Upcoming Events</h2>
                  {
                    eventData.map((event) => {
                      return <p><Link to={`/events/instance?id=${event.id}`}>{event.name}</Link></p>
                    })
                  }
                </div>
                
                <hr style={{backgroundColor: 'white', width: "60%", margin: "auto"}}/>
                <Link to='/teams'>Back to Teams</Link>
              </div>
            </div>
      )
  }
}

export default TeamsInstance