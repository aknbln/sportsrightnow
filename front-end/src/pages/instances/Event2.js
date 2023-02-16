import React from 'react'
import Emirates from "../../assets/images/emirates.jpg"
import {Link} from 'react-router-dom'


const Event2 = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <h1>Arsenal vs Manchester City</h1>
            </header>
            <div className='App-body'>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <img src={Emirates} style={{float: 'left', width:'25%'}} alt="logo" />
                    <div style={{width: "10%"}}/>
                    <p style={{float: 'right'}}>
                        Date: February 15, 2023<br/>
                        Location: London <br/>
                        Venue: Emirates Stadium  <br/>
                        League: EPL
                    </p>
                </div>
              <br/>
              <br/>
              <Link to='/events'>Back</Link>
            </div>
          </div>
    )
}

export default Event2