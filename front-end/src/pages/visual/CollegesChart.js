import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect } from "react";
import data from "../../dataviz/colleges.json"

const CollegesChart = ({}) => {

    useEffect(() => {
        
    }, [])

    return(
        <ResponsiveContainer width={"99%"} height={500}>
            <BarChart width={1000} height={500} data={data} barGap={10}>
                <XAxis dataKey={'Name'} angle={45} interval={0} textAnchor={"start"} height={120}/>
                <YAxis/>
                <Tooltip labelStyle={{color: "black"}}/>
                <Bar dataKey={'Players'} fill={'#4b8cc4'} bar/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default CollegesChart