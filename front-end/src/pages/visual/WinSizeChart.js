import React from "react";
import { useEffect } from "react";
import data from "../../dataviz/teamsize.json"
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';

import axios from "axios";


const ax = axios.create({
    baseURL: "https://api.sportsrightnow.me/"
})

  const WinSizeChart = ({}) => {

    let nbaData = []
    let nflData = []

    function MapData(team){
        if(team.league == "NBA"){
            nbaData.push(team)
        }

        if(team.league == "NFL"){
            nflData.push(team)
        }
    }
    useEffect(() => {
        const fetchTeams = async() => {
            await ax
            .get("players")
            .then((response) => (
                console.log(response.data.data)
            ))
        }

        data.forEach(team => MapData(team))
    }, [])

    return (
        <ResponsiveContainer width={'99%'} height={400}>
            <ScatterChart margin={20}>
                <CartesianGrid/>
                <XAxis type={'number'} dataKey={'playerCount'} name={'Team Size'} unit={" Players"}/>
                <YAxis type={'number'} dataKey={'winRate'} name={'Win Rate'} unit={'%'}/>
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="NFL" data={nflData} fill={"#4b8cc4"}/>
                <Scatter name="NBA" data={nbaData} fill={"#cf4c5b"}/>
            </ScatterChart>
        </ResponsiveContainer>
    )
  }

export default WinSizeChart
