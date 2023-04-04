import React, {useEffect, useState} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";

const ax = axios.create({
    baseURL: "https://api.closereading.me/"
})

const YearsChart = ({}) => {
    const [yearsData, setYearsData] = useState([])

    function ProcessYears(data){
        let decades = {}
        for(let i = 0; i<data.length;i++){
            let d = Math.floor(data[i].pub_year / 10) * 10
            
            if(d in decades){
                decades[d] += 1
            }
            else{
                decades[d] = 1
            }
        }

        let lst = []
        for(const key in decades){
            lst.push({"Decade": key, "Books": decades[key]})
        }

        return lst
    }

    useEffect(() =>{
        const fetchBooks = async() => {
            await ax
            .get("books")
            .then((response) => (
                setYearsData(ProcessYears(response.data.books))
            ))
        }

        fetchBooks()
    }, [])

    return(
        <ResponsiveContainer width={'99%'} height={450}>
            <LineChart width={400} height={400} data={yearsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Decade" />
                <YAxis />
                <Tooltip labelStyle={{color: "black"}}/>
                <Legend />
                <Line type="monotone" dataKey="Books" stroke="#4b8cc4" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default YearsChart