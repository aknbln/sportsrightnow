import React, { useEffect, useState } from 'react'
import Lebron from "../../assets/images/Lebron.jpg"
import {Link, useSearchParams} from 'react-router-dom'


const Players1 = ({}) =>{

    const [searchParams, setSearchParams] = useSearchParams()
    const [playerId, setPlayerId] = useState(0)

    useEffect(() => {
      setPlayerId(searchParams.get("id"))
    }, [])

    return (
        <div className="App">
            <header className="App-header">
              <h1>Lebron James - {playerId}</h1>
            </header>
            <div className='App-body'>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <img src={Lebron} style={{float: 'left', width:'25%'}} alt="logo" />
                    <div style={{width: "10%"}}/>
                    <p style={{float: 'right'}}>
                        Team: Los Angeles Lakers <br/>
                        Age: 38 <br/>
                        Nationality: USA <br/>
                        Height: 6' 9"
                    </p>
                </div>
              <br/>
              <br/>
              <Link to='/players'>Back</Link>
            </div>
          </div>
    )
}

export default Players1