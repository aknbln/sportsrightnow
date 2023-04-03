import React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import TeamData  from "../../dataviz/league-teams.json"
import PlayerData  from "../../dataviz/league-players.json"

const LeagueChart = ({}) => {

    let renderName = function(entry){
        console.log(entry.name)
        return entry.name
    }

    const COLORS = ['#cf4c5b', '#4b8cc4', '#3c9e3e'];

    return(
        <div>
            <ResponsiveContainer width={'99%'} height={400}>
                <PieChart width={390} height={390}>
                    <Pie data={TeamData} dataKey={'count'} outerRadius={150} fill = {'#4b8cc4'} label={renderName}>
                        {TeamData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer width={'99%'} height={400}>
                <PieChart width={390} height={390}>
                    <Pie data={PlayerData} dataKey={'count'} outerRadius={150} fill = {'#cf4c5b'} label={renderName}>
                        {TeamData.map((entry, index) => (
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