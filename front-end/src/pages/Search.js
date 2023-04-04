import React, { useEffect, useState } from 'react'
import logo from '../assets/images/ball.svg'
import TestButton from '../components/Button'
import { useSearchParams } from 'react-router-dom'

const Search = ({}) =>{

    const [searchParams, setSearchParams] = useSearchParams()
    const [querry, setQuerry] = useState("")

    useEffect(() => {
      let q = searchParams.get("q")
      setQuerry(q)
    })

    return (
        <div className="App">
            <header className="App-header">
              <h2>Search</h2>
              <h4>You searched for {querry}</h4>
            </header>
            <div className='App-body'>
              <p>
                Loading...
              </p>
            </div>
          </div>
    )
}

export default Search