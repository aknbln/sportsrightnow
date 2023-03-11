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

    useEffect(() => {
      let id = searchParams.get("id")
      setTeamId(id)
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
              <Link to='/players'>Back</Link>
            </div>
          </div>
    )
}

export default TeamsInstance