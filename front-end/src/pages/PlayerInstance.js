import React, { useEffect, useState } from 'react'
import { playerData } from '../assets/PlayerData'
import {Link, useSearchParams} from 'react-router-dom'


const PlayersInstance = ({}) =>{

    const [searchParams, setSearchParams] = useSearchParams()
    const [playerId, setPlayerId] = useState(0)
    const [currentData, setCurrentData] = useState([])

    useEffect(() => {
      let id = searchParams.get("id")
      setPlayerId(id)
      setCurrentData(playerData[id - 1])
    }, [])

    return (
        <div className="App">
            <header className="App-header">
              <h1>{currentData.name}</h1>
            </header>
            <div className='App-body'>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <img src={currentData.image} style={{float: 'left', width:'25%'}} alt="logo" />
                    <div style={{width: "10%"}}/>
                    <p style={{float: 'right'}}>
                        Team: {currentData.team}<br/>
                        Age: {currentData.age} <br/>
                        Nationality: {currentData.country} <br/>
                        Height: {currentData.height}
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