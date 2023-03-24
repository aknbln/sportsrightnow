import React, { useEffect, useState } from 'react'
import { playerData } from '../assets/PlayerData'
import {Link, useSearchParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


import axios from 'axios'

const ax = axios.create({
  baseURL: "https://api.sportsrightnow.me/players/"
})

const PlayersInstance = ({}) =>{

    const [searchParams, setSearchParams] = useSearchParams()
    const [playerId, setPlayerId] = useState(0)
    const [fetchedData, setFetchedData] = useState([])
    const [teamData, setTeamData] = useState([])
    const [eventData, setEventData] = useState([])

    const navigate = useNavigate()

    function NavigateTeam(id){
      navigate("/teams/instance?id=" + id)
    }

    function NavigateEvent(id){
      navigate("/events/instance?id=" + id)
    }

    useEffect(() => {
      let id = searchParams.get("id")
      setPlayerId(id)
      const fetchData = async() => {
        await ax
        .get(id)
        .then((response) => (
          console.log(response.data.data), 
          setFetchedData(response.data.data), 
          setTeamData(response.data.data.team_info),
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
                    <img src={fetchedData.headshot} style={{float: 'left', width:'25%'}} alt="picture" />
                    <div style={{width: "10%"}}/>
                    <p style={{float: 'right'}}>
                        Team: <Link to={`/teams/instance?id=${teamData.id}`} >{teamData.name}</Link><br/>
                        League: {fetchedData.league} <br/>
                        Birthday: {fetchedData.birthdate} <br/>
                        Height: {fetchedData.height} <br/>
                        Weight: {fetchedData.weight} <br/>
                        College: {fetchedData.college}
                    </p>
                </div>
              <br/>
              <br/>
              <br/>
              <hr style={{backgroundColor: 'white', width: "40%", margin: "auto"}}/>
              <h2>Upcoming Events</h2>
              {
                eventData.map((event) => {
                  return <p><Link to={`/events/instance?id=${event.id}`}>{event.name}</Link></p>
                })
              }
              <hr style={{backgroundColor: 'white', width: "40%", margin: "auto"}}/>
              <Link to='/players'>Back to Players</Link>
            </div>
          </div>
    )
}

export default PlayersInstance