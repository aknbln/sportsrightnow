import React from 'react'
import {Link} from 'react-router-dom'


const NotFound = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <h1>404</h1>
            </header>
            <body className='App-body'>
              <p>The page you are looking for was not found</p>
              <Link to='/'>Return Home</Link>
            </body>
          </div>
    )
}

export default NotFound