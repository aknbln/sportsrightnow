import React from 'react'
import TestButton from '../components/Button'
import {Link} from 'react-router-dom'
import { useEffect, useRef } from 'react'
import CollegesChart from './visual/CollegesChart'
import WinSizeChart from './visual/WinSizeChart'
import LeagueChart from './visual/LeagueChart'
import * as d3 from 'd3'

const Visualizations = ({}) =>{

    const winGraphRef = useRef();
    function drawTeamSize(){
        
    }

    useEffect(() => {
        
    }, []) 

    return (
        <div className="App">
            <header className="App-header">
              <h2>Visualization</h2>
              {/* <h4>Now that's a cool graphic!</h4> */}
            </header>
            <div className='App-body'>
                <h2>
                    Sports Right Now Visualizations
                </h2>
                
                <div style={{width: "95%", marginBottom: "10vh", marginTop: "10vh"}}>
                    <h3>Players and teams from each league</h3>
                    <LeagueChart/>
                    <p>
                        Why we have a roughly equal number of teams in our database from each league,
                        the average size of teams in each league differs greatly. For example since basketball teams
                        are much smaller, we have much fewer NBA players compared to those from other leagues.
                    </p>  
                </div>

                <hr style={{backgroundColor: 'white', width: "30%", margin: "auto"}}/>

                <div style={{width: "95%", marginBottom: "10vh", marginTop: "10vh"}}>
                    <h3>Colleges with most pro players (Top 20)</h3>
                    <CollegesChart/>
                    <br/>
                    <p>
                        Alabama State Univeristy, a middle size school with less 
                        than 4000 students, produces a very large porportion of pro athletes!
                    </p> 
                </div>
                
                <hr style={{backgroundColor: 'white', width: "30%", margin: "auto"}}/>

                <div style={{width: "95%", marginBottom: "10vh", marginTop: "10vh"}}>
                    <h3>Team Size vs Win Rate</h3>
                    <WinSizeChart/>
                    <p>
                        We theorized that team size might correlate positively with win rate. More successful
                        teams could afford to recruit more players. Or larger teams would have more talent to help
                        win more games. However, as it turns out the opposite is true. There is  slight negative correlation
                        between win rate and team size, at least for NFL teams.
                    </p>  
                </div>
                
            </div>
          </div>
    )
}

export default Visualizations