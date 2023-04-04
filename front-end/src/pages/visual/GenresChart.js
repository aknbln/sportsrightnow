import React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useEffect, useState } from "react";
import axios from "axios";

const ax = axios.create({
    baseURL: "https://api.closereading.me/"
})

const GenresChart = ({}) => {
    const [genreData, setGenreData] = useState([])


    function ProcessGenres(data){
        let genres = {}
        for(let i = 0; i <data.length; i++){
            let g = data[i].genre

            if(g in genres){
                genres[g] += 1
            }
            else{
                genres[g] = 1
            }
        }

        let lst = []

        for(const key in genres){
            if(key != "n/a")
                lst.push({"name": key, "Count": genres[key]})
        }

        lst.sort(function(a,b) {
            if(a.Count > b.Count) return -1
            if(a.Count < b.Count) return 1
            return 0
        })

        lst = lst.slice(0,5)
        return lst
    }

    useEffect(() => {
        const fetchBooks = async() => {
            await ax
            .get("books")
            .then((response) => (
                setGenreData(ProcessGenres(response.data.books))
            ))
        }

        fetchBooks()
    }, [])

    function renderName(entry){
        return entry.name
    }
    
    const COLORS = ['#cf4c5b', '#4b8cc4', '#3c9e3e', '#e8af76', '#a04aba'];

    return (
        <ResponsiveContainer width={'99%'} height={400}>
            <PieChart width={390} height={390}>
                <Pie data={genreData} dataKey={'Count'} outerRadius={150} fill = {'#4b8cc4'} label={renderName}>
                    {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip/>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default GenresChart