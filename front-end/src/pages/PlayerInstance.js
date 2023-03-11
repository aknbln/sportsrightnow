import React, { useEffect, useState } from 'react'
import { playerData } from '../assets/PlayerData'
import {Link, useSearchParams} from 'react-router-dom'

import axios from 'axios'

const ax = axios.create({
  baseURL: "http://api.sportsrightnow.me/players/"
})

const PlayersInstance = ({}) =>{

    const [searchParams, setSearchParams] = useSearchParams()
    const [playerId, setPlayerId] = useState(0)
    const [fetchedData, setFetchedData] = useState([])

    useEffect(() => {
      let id = searchParams.get("id")
      setPlayerId(id)
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
                    <img src={fetchedData.headshot} style={{float: 'left', width:'25%'}} alt="picture" />
                    <div style={{width: "10%"}}/>
                    <p style={{float: 'right'}}>
                        Team: {fetchedData.team} <br/>
                        League: {fetchedData.league} <br/>
                        Birthday: {fetchedData.birthdate} <br/>
                        Height: {fetchedData.height} <br/>
                        Weight: {fetchedData.weight} <br/>
                        College: {fetchedData.college}
                    </p>
                </div>
              <br/>
              <br/>
              <Link to='/players'>Back</Link>
            </div>
          </div>
    )
}

export default PlayersInstance