import React from 'react'
import TestButton from '../components/Button'
import {Link} from 'react-router-dom'
import { useEffect, useRef } from 'react'
import YearsChart from './visual/YearsChart'
import GenresChart from './visual/GenresChart'
import LibraryChart from './visual/LibraryChart' 

const ProviderVisuals = ({}) =>{

    useEffect(() => {
        
    }, []) 

    return (
        <div className="App">
            <header className="App-header">
              <h2>Provider Visualizations</h2>
              <h4>Now that's a cool graphic!</h4>
            </header>
            <div className='App-body'>
                <h2>
                    Close Reading Visualizations
                </h2>
                
                <div style={{width: "95%", marginBottom: "10vh", marginTop: "10vh"}}>
                    <h3>Major Genres</h3>
                    <GenresChart/>
                    <p>
                        The vast majority of books under the Close Reading collection were fiction.
                        Biographies and poetry collections made up a distant second and third respectively.
                        After "Literary Criticism", there are many genres with just a couple books, so they
                        were not included in the pie chart.
                    </p>  
                </div>

                <hr style={{backgroundColor: 'white', width: "30%", margin: "auto"}}/>

                <div style={{width: "95%", marginBottom: "10vh", marginTop: "10vh"}}>
                    <h3>Libraries Per State</h3>
                    <LibraryChart/>
                    <br/>
                    <p>
                        The seven states represented in the Close Reading library database have
                        a relatively even distribution. There is a bit of a homefield advantage as
                        Texas has twice the number of libraries compared to the other states.
                        (I swear this data is not made up!)
                    </p> 
                </div>
                
                <hr style={{backgroundColor: 'white', width: "30%", margin: "auto"}}/>

                <div style={{width: "95%", marginBottom: "10vh", marginTop: "10vh"}}>
                    <h3>Books Published per Decade</h3>
                    <YearsChart/>
                    <p>
                        The Close Reading collection mainly features books that have been published in
                        the past 20 or so years. There are a few outliers that were published in the 1950s
                        or earlier.
                    </p>  
                </div>
                
            </div>
          </div>
    )
}

export default ProviderVisuals