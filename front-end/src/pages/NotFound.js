import React from 'react'
import {Link} from 'react-router-dom'


const NotFound = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <h2>404</h2>
              <p>The page you are looking for was not found</p>
              <Link to='/'>Return Home</Link>
            </header>
          </div>
    )
}

export default NotFound