import React from 'react'
import {Link} from 'react-router-dom'

const PastEvent = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <h1>Whoops!</h1>
            </header>
            <body className='App-body'>
              <p>This event happened in the past, and as such tickets to this event
                are not available for purchase.
                Try looking for an event happening soon instead!
              </p>
              <Link to='/'>Return Home</Link>
            </body>
          </div>
    )
}

export default PastEvent