import React, { useEffect, useState } from 'react'
import {Link, useSearchParams} from 'react-router-dom'

import axios from 'axios'

const ax = axios.create({
  baseURL: "http://api.sportsrightnow.me/events/"
})

const EventsInstance = ({}) =>{

    const [searchParams, setSearchParams] = useSearchParams()
    const [eventId, setEventId] = useState(0)
    const [fetchedData, setFetchedData] = useState([])
    const [homePlayerData, setHomePlayerData] = useState([])
    const [awayPlayerData, setAwayPlayerData] = useState([])

    useEffect(() => {
      let id = searchParams.get("id")
      setEventId(id)
      const fetchData = async() => {
        await ax
        .get(id)
        .then((response) => (
          console.log(response.data.data), 
          setFetchedData(response.data.data),
          setHomePlayerData(response.data.data.home_players_info),
          setAwayPlayerData(response.data.data.away_players_info)))
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
                    <img src={fetchedData.home_team_image} style={{float: 'left', width:'25%'}} alt="picture" />
                    <div style={{width: "10%"}}/>
                    <p style={{float: 'right'}}>
                        Date: {fetchedData.local_date} <br/>
                        Home: <Link to={`/teams/instance?id=${fetchedData.home_team_id}`} >{fetchedData.home_team}</Link> <br/>
                        Away: <Link to={`/teams/instance?id=${fetchedData.away_team_id}`} >{fetchedData.away_team}</Link> <br/>
                        League: {fetchedData.birthdate} <br/>
                        Location: {fetchedData.city} <br/>
                        Venue: {fetchedData.venue} <br/>
                        <a href={fetchedData.url}>Purchase Tickets</a>
                    </p>
                </div>
              <br/>
              <br/>
              <br/>

              <hr style={{backgroundColor: 'white', width: "40%", margin: "auto"}}/>

              <div style={{padding: '1%'}}>
                <h2>Featured {fetchedData.home_team} Players</h2>
                {
                  homePlayerData.slice(0,4).map((player) => {
                    return <p><Link to={`/players/instance?id=${player.id}`}>{player.name}</Link></p>
                  })
                }
              </div>

              <hr style={{backgroundColor: 'white', width: "40%", margin: "auto"}}/>

              <div style={{padding: '1%'}}>
                <h2>Featured {fetchedData.away_team} Players</h2>
                {
                  awayPlayerData.slice(0,4).map((player) => {
                    return <p><Link to={`/players/instance?id=${player.id}`}>{player.name}</Link></p>
                  })
                }
              </div>

              <hr style={{backgroundColor: 'white', width: "60%", margin: "auto"}}/>

              <Link to='/events'>Back to Events</Link>
            </div>
          </div>
    )
}

export default EventsInstance