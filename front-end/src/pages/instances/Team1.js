import React from 'react'
import Lakers from "../../assets/images/logos/Lakers.png"
import {Link} from 'react-router-dom'


const Team1 = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <h1>Los Angeles Lakers</h1>
            </header>
            <div className='App-body'>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <img src={Lakers} style={{float: 'left', width:'25%'}} alt="logo" />
                    <div style={{width: "10%"}}/>
                    <p style={{float: 'right'}}>
                        League: NBA <br/>
                        Country: USA <br/>
                        Founded: 1947 <br/>
                        Win/Loss: 26-32
                    </p>
                </div>
              <br/>
              <br/>
              <Link to='/teams'>Back</Link>
            </div>
          </div>
    )
}

export default Team1