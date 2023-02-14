import React from 'react'
import logo from '../logo.svg'
import TestButton from '../components/Button'
import {Link} from 'react-router-dom'

const Home = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <h2>Sports Now!</h2>
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Welcome to the amazing Sports Now Database!
              </p>
              <Link to="/About">About</Link>
              <TestButton color='gainsboro' text='Button One'/>
              <TestButton color='aqua' text='Button Two'/>
            </header>
          </div>
    )
}

export default Home