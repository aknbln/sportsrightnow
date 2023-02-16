import React from 'react'
import Kevin from "../../assets/images/Kevin.jpg"
import {Link} from 'react-router-dom'


const Players2 = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <h1>Kevin De Bruyne</h1>
            </header>
            <div className='App-body'>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <img src={Kevin} style={{float: 'left', width:'25%'}} alt="logo" />
                    <div style={{width: "10%"}}/>
                    <p style={{float: 'right'}}>
                        Team: Manchester City <br/>
                        Age: 31 <br/>
                        Nationality: Belgium <br/>
                        Height: 5' 11"
                    </p>
                </div>
              <br/>
              <br/>
              <Link to='/players'>Back</Link>
            </div>
          </div>
    )
}

export default Players2