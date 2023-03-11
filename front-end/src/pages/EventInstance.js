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

    useEffect(() => {
      let id = searchParams.get("id")
      setEventId(id)
      const fetchData = async() => {
        await ax
        .get(id)
        .then((response) => (console.log(response.data.data), setFetchedData(response.data.data)))
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
                        Home: {fetchedData.home_team} <br/>
                        Away: {fetchedData.away_team} <br/>
                        League: {fetchedData.birthdate} <br/>
                        Location: {fetchedData.city} <br/>
                        Venue: {fetchedData.venue} <br/>
                        <a href={fetchedData.url}>Purchase Tickets</a>
                    </p>
                </div>
              <br/>
              <br/>
              <Link to='/players'>Back</Link>
            </div>
          </div>
    )
}

export default EventsInstance