import React, { useEffect, useState } from 'react'
import { playerData } from '../assets/PlayerData'
import {Link, useSearchParams} from 'react-router-dom'

import axios from 'axios'

const ax = axios.create({
  baseURL: "http://api.sportsrightnow.me/teams/"
})

const TeamsInstance = ({}) =>{

    const [searchParams, setSearchParams] = useSearchParams()
    const [teamId, setTeamId] = useState(0)
    const [currentData, setCurrentData] = useState([])
    const [fetchedData, setFetchedData] = useState([])
    const [playerData, setPlayerData] = useState([])
    const [eventData, setEventData] = useState([])

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
          setEventData(response.data.data.events)))
      }

      fetchData();
    }, [])

    

    return (
        <div className="App">
            <header className="App-header">
              <h1>{fetchedData.name}</h1>
            </header>
            <div className='App-body'>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
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
                <h2>Notable Players</h2>
                {
                  playerData.slice(0,4).map((player) => {
                    return <p><Link to={`/players/instance?id=${player.id}`}>{player.name}</Link></p>
                  })
                }
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

export default TeamsInstance