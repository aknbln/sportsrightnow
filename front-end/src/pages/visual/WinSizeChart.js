import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const ax = axios.create({
  baseURL: "https://api.sportsrightnow.me/",
});

const WinSizeChart = () => {
  const [nbaData, setNbaData] = useState([]);
  const [nflData, setNflData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await ax.get("teams");
        const teamsData = response.data.data;
        let tempNbaData = [];
        let tempNflData = [];
        teamsData.forEach((team) => {
          if (team.league === "NBA") {
            const playerCount = team.players.length;
            const winRate = team.wins / (team.wins + team.losses);
            tempNbaData.push({ playerCount, winRate });
          }

          if (team.league === "NFL") {
            const playerCount = team.players.length;
            const winRate = team.wins / (team.wins + team.losses);
            tempNflData.push({ playerCount, winRate });
          }
        });
        setNbaData(tempNbaData);
        setNflData(tempNflData);
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width={"99%"} height={400}>
      <ScatterChart margin={20}>
        <CartesianGrid />
        <XAxis
          type={"number"}
          dataKey={"playerCount"}
          name={"Team Size"}
          unit={" Players"}
        />
        <YAxis
          type={"number"}
          dataKey={"winRate"}
          name={"Win Rate"}
          unit={"%"}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter name="NFL" data={nflData} fill={"#4b8cc4"} />
        <Scatter name="NBA" data={nbaData} fill={"#cf4c5b"} />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default WinSizeChart;
