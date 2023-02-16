import React from 'react'
import Crypto from "../../assets/images/Crypto.jpg"
import {Link} from 'react-router-dom'


const Event1 = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <h1>Los Angeles Lakers vs New Orleans Pelicans</h1>
            </header>
            <div className='App-body'>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <img src={Crypto} style={{float: 'left', width:'25%'}} alt="logo" />
                    <div style={{width: "10%"}}/>
                    <p style={{float: 'right'}}>
                        Date: February 15, 2023<br/>
                        Location: Los Angeles <br/>
                        Venue: Crypto.com Arena  <br/>
                        League: NBA
                    </p>
                </div>
              <br/>
              <br/>
              <Link to='/events'>Back</Link>
            </div>
          </div>
    )
}

export default Event1