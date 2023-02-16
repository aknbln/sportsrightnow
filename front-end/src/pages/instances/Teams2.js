import React from 'react'
import ManCity from "../../assets/images/logos/ManCity.png"
import {Link} from 'react-router-dom'


const Teams2 = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <h1>Manchester City FC</h1>
            </header>
            <div className='App-body'>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <img src={ManCity} style={{float: 'left', width:'25%'}} alt="logo" />
                    <div style={{width: "10%"}}/>
                    <p style={{float: 'right', width:"25%"}}>
                        League: EPL <br/>
                        Country: United Kingdom <br/>
                        Founded: 1894 <br/>
                        Win/Loss: 16-3-4
                    </p>
                </div>
              <br/>
              <br/>
              <Link to='/teams'>Back</Link>
            </div>
          </div>
    )
}

export default Teams2