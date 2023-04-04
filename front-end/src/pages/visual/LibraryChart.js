import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import axios from "axios";

const ax = axios.create({
    baseURL: "https://api.closereading.me/"
})

const LibraryChart = ({}) => {
    const [libraryData, setLibraryData] = useState([])

    function processData(data){
        let temp = [
            {"name": "TX", "count": 0}, 
            {"name": "GA", "count": 0}, 
            {"name": "NY", "count": 0},
            {"name": "IL", "count": 0},
            {"name": "MA", "count": 0},
            {"name": "WA", "count": 0},
            {"name": "CA", "count": 0}]

        for(let i = 0; i < data.length; i++){
            let st = data[i].state
            switch(st){
                case "TX":
                    temp[0].count += 1;
                    break;
                case "GA":
                    temp[1].count += 1;
                    break;
                case "NY":
                    temp[2].count += 1;
                    break;
                case "IL":
                    temp[3].count += 1;
                    break;
                case "MA":
                    temp[4].count += 1;
                    break;
                case "WA":
                    temp[5].count += 1;
                    break;
                case "CA":
                    temp[6].count += 1;
                    break;
            }
        }
        return temp
    }

    useEffect(() => {
        const fetchLibrary = async() => {
            await ax
            .get("libraries")
            .then((response) => (
                setLibraryData(processData(response.data.libraries))
            ))
        }

        fetchLibrary()
    }, [])

    return (
        <ResponsiveContainer width={"99%"} height={500}>
            <BarChart width={1000} height={500} data={libraryData} barGap={10}>
                <XAxis dataKey={'name'} interval={0} textAnchor={"start"}/>
                <YAxis/>
                <Tooltip labelStyle={{color: "black"}}/>
                <Bar dataKey={'count'} fill={'#4b8cc4'} bar/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default LibraryChart