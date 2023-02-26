import React, { useEffect, useState }  from 'react'
import Mitch from "../../assets/images/Mitch.jpg"
import {Link, useSearchParams} from 'react-router-dom'


const Players3 = ({}) =>{
    const [searchParams, setSearchParams] = useSearchParams()
    const [playerId, setPlayerId] = useState(0)

    useEffect(() => {
      setPlayerId(searchParams.get("id"))
    })

    return (
        <div className="App">
            <header className="App-header">
              <h1>Mitch Marner - {playerId}</h1>
            </header>
            <div className='App-body'>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <img src={Mitch} style={{float: 'left', width:'25%'}} alt="logo" />
                    <div style={{width: "10%"}}/>
                    <p style={{float: 'right'}}>
                        Team: Toronto Maple Leafs <br/>
                        Age: 25 <br/>
                        Nationality: Canada <br/>
                        Height: 6' 0"
                    </p>
                </div>
              <br/>
              <br/>
              <Link to='/players'>Back</Link>
            </div>
          </div>
    )
}

export default Players3