import React from 'react'
import Leafs from "../../assets/images/logos/MapleLeafs.png"
import {Link} from 'react-router-dom'


const Teams3 = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <h1>Toronto Maple Leafs</h1>
            </header>
            <div className='App-body'>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <img src={Leafs} style={{float: 'left', width:'25%'}} alt="logo" />
                    <div style={{width: "10%"}}/>
                    <p style={{float: 'right', width:"25%"}}>
                        League: NHL <br/>
                        Country: Canada <br/>
                        Founded: 1917 <br/>
                        Win/Loss: 32-14-8
                    </p>
                </div>
              <br/>
              <br/>
              <Link to='/teams'>Back</Link>
            </div>
          </div>
    )
}

export default Teams3