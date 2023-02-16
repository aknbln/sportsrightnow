import React from 'react'
import Scotiabank from "../../assets/images/Scotiabank.jpg"
import {Link} from 'react-router-dom'


const Event3 = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <h1>Toronto Maple Leafs vs Chicago Blackhawks</h1>
            </header>
            <div className='App-body'>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <img src={Scotiabank} style={{float: 'left', width:'25%'}} alt="logo" />
                    <div style={{width: "10%"}}/>
                    <p style={{float: 'right'}}>
                        Date: February 15, 2023<br/>
                        Location: Toronto <br/>
                        Venue: Scotiabank Arena  <br/>
                        League: NHL
                    </p>
                </div>
              <br/>
              <br/>
              <Link to='/events'>Back</Link>
            </div>
          </div>
    )
}

export default Event3