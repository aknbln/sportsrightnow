import Lakers from "./images/logos/Lakers.png"
import ManCity from "./images/logos/ManCity.png"
import MapleLeafs from "./images/logos/MapleLeafs.png"

const sportsTeamData = [
    {
        name: "Los Angeles Lakers",
        image: Lakers,
        league: "NBA",
        country: "USA",
        founded: "1947",
        record: "26-32",
        team_id: "1",
    },
    {
        name: "Manchester City",
        image: ManCity,
        league: "EPL",
        country: "UK",
        founded: "1894",
        record: "16-3-4",
        team_id: "2",      
    },
    {
        name: "Toronto Maple Leafs",
        image: MapleLeafs,
        league: "NHL",
        country: "Canada",
        founded: "1917",
        record: "32-14-8",
        team_id: "3",
    }
];

export { sportsTeamData };