import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import axios from "axios";

const ax = axios.create({
    baseURL: "https://api.sportsrightnow.me/"
})

const CollegesChart = ({}) => {

    const [collegeData, setCollegeData] = useState([])

    function ProcessData(data){
        let container = {}
        for(let i = 0; i < data.length; i++){
            let c = data[i].college

            if(c in container){
                container[c] += 1
            }
            else{
                container[c] = 1
            }
        }

        let lst = []

        for(const key in container){
            if(key != "null" && key != "—")
                lst.push({"Name": key, "Players": container[key]})
        }
        
        lst.sort(function(a,b) {
            if(a.Players > b.Players) return -1
            if(a.Players < b.Players) return 1
            return 0
        })

        lst = lst.slice(0,20)
        return lst
    }

    useEffect(() => {
        const fetchPlayers = async() => {
            await ax
            .get("players")
            .then((response) => (
                setCollegeData(ProcessData(response.data.data))
            ))
        }

        fetchPlayers()
    }, [])

    return(
        <ResponsiveContainer width={"99%"} height={500}>
            <BarChart width={1000} height={500} data={collegeData} barGap={10}>
                <XAxis dataKey={'Name'} angle={45} interval={0} textAnchor={"start"} height={120}/>
                <YAxis/>
                <Tooltip labelStyle={{color: "black"}}/>
                <Bar dataKey={'Players'} fill={'#4b8cc4'} bar/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default CollegesChart