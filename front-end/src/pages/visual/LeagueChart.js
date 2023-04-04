import React, { useEffect, useState } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import axios from "axios";


const ax = axios.create({
    baseURL: "https://api.sportsrightnow.me/"
})

const LeagueChart = ({}) => {

    const [pData, setPData] = useState([])
    const [tData, setTData] = useState([])

    function renderName(entry){
        return entry.name
    }

    function ProcessData(data){
        let temp = [{"name": "NBA", "count": 0}, {"name": "NFL", "count": 0}, {"name": "MLB", "count": 0}]
        for(let i = 0; i < data.length; i++) {
            if(data[i].league == "NBA")
                temp[0].count += 1
            if(data[i].league == "NFL")
                temp[1].count += 1
            if(data[i].league == "MLB")
                temp[2].count += 1
        }

        return temp
    }

    useEffect(() => {
        const fetchPlayers = async() => {
            await ax
            .get("players")
            .then((response) => (
                setPData(ProcessData(response.data.data))
            ))
        }

        const fetchTeams = async() => {
            await ax
            .get("teams")
            .then((response) => (
                setTData(ProcessData(response.data.data))
            ))
        }

        fetchPlayers()
        fetchTeams()
    }, [])


    const COLORS = ['#cf4c5b', '#4b8cc4', '#3c9e3e'];

    return(
        <div>
            <ResponsiveContainer width={'99%'} height={400}>
                <PieChart width={390} height={390}>
                    <Pie data={tData} dataKey={'count'} outerRadius={150} fill = {'#4b8cc4'} label={renderName}>
                        {tData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer width={'99%'} height={400}>
                <PieChart width={390} height={390}>
                    <Pie data={pData} dataKey={'count'} outerRadius={150} fill = {'#cf4c5b'} label={renderName}>
                        {pData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LeagueChart