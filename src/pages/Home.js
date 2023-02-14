import React from 'react'
import logo from '../logo.svg'
import TestButton from '../components/Button'

const Home = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Welcome to the amazing Sports Now Database!
              </p>
              <TestButton color='gainsboro' text='Button One'/>
              <TestButton color='aqua' text='Button Two'/>
            </header>
          </div>
    )
}

export default Home