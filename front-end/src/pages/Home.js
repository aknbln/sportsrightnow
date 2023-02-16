import React from 'react'
import logo from '../assets/images/ball.svg'
import TestButton from '../components/Button'
import {Link} from 'react-router-dom'

const Home = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <h2>Sports Now</h2>
              <h4>Sports information right here, right now!</h4>
            </header>
            <div className='App-body'>
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Welcome to the amazing Sports Now Database!
              </p>
            </div>
          </div>
    )
}

export default Home