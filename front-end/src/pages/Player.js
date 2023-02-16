import { useParams } from "react-router-dom";
import PlayerData from "../data/players";

const PlayerPage = () => {
    const playerID = (useParams()["id"]);
    const player = PlayerData.find((player) => player.id == playerID);
    
}