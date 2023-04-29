import React, { useEffect, useState } from "react";
import { playerData } from "../assets/PlayerData";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GenerateMapQuerry } from "../Utils";
import EventCard from "../components/EventCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../grid.css'
import axios from "axios";

const ax = axios.create({
	baseURL: "https://api.sportsrightnow.me/players/",
});

const PlayersInstance = ({}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [playerId, setPlayerId] = useState(0);
	const [fetchedData, setFetchedData] = useState([]);
	const [teamData, setTeamData] = useState([]);
	const [eventData, setEventData] = useState([]);
	const [mapQuerry, setMapQuerry] = useState("");
	const [ready, setReady] = useState(false);

	const navigate = useNavigate();

	function NavigateTeam(id) {
		navigate("/teams/instance?id=" + id);
	}

	function NavigateEvent(id) {
		navigate("/events/instance?id=" + id);
	}

	useEffect(() => {
		let id = searchParams.get("id");
		setPlayerId(id);
		const fetchData = async () => {
			await ax
				.get(id)
				.then(
					(response) => (
						console.log(response.data.data),
						setFetchedData(response.data.data),
						setTeamData(response.data.data.team_info),
						setEventData(response.data.data.events),
						setMapQuerry(GenerateMapQuerry(response.data.data.team_info.name)),
						setReady(true)
					)
				);
		};

		fetchData();
	}, []);

	let element = <a href={fetchedData.espnLink}>Season Stats on ESPN</a>;
	if (!fetchedData.espnLink) {
		element = <p>No ESPN Link for {fetchedData.name}</p>;
	}
	if (!ready) {
		return (
			<div className="App">
				<header className="App-header">
					<h1>Loading Player...</h1>
				</header>
				<div className="App-body"></div>
			</div>
		);
	} else {
		return (
			<div className="App">
				<header className="App-header">
					<h1>{fetchedData.name}</h1>
				</header>
				<div className="App-body">
          {//why is the grid not working: https://stackoverflow.com/questions/51114695/why-is-my-css-grid-not-working

      } 

					<div className="layout"
					>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								padding: "1%",
                gridArea: "img",
							}}
						>
							<img
								src={fetchedData.headshot}
								style={{
									float: "left",
									width: 350,
									height: 350,
									resize: "cover",
								}}
								alt="picture"
							/>
							<div style={{ width: "10%" }} />
						</div>

						<div style={{gridArea: "frame",}}>
							<iframe
								id="wiki"
								src={`https://en.wikipedia.org/wiki/${fetchedData.name
									.split(" ")
									.join("_")}`}
								style={{
									width: "500px",
									height: "100%",
									borderRadius: "5%",


								}}
							></iframe>
						</div>

						<div style={{gridArea: "info",}}>
							<p
								style={{
									textAlign: "center",
                  verticalAlign: "center",
								}}
							>
								Team:{" "}
								<Link to={`/teams/instance?id=${teamData.id}`}>
									{teamData.name}
								</Link>
								<br />
								League: {fetchedData.league} <br />
								Birthday: {fetchedData.birthdate} <br />
								Height: {fetchedData.height} <br />
								Weight: {fetchedData.weight} <br />
								College: {fetchedData.college}
								<br />
								{element}
							</p>
						</div>
					</div>
					<br />
					<br />
					<br />

					<hr
						style={{ backgroundColor: "white", width: "40%", margin: "auto" }}
					/>

					<div style={{ padding: "1%" }}>
						<h2>Home Stadium</h2>
						<iframe
							style={{ height: "60vh", width: "45vw" }}
							src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAp-NjtN6McZptGFjlIYXwX_QDPjr3FVcE&q=${mapQuerry}`}
						></iframe>
					</div>

					<iframe
						style={{ border: 0, frameborder: 0, height: 250, width: 550 }}
						src="https://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2Fcaleb%2Fhoustan%2F20"
					></iframe>

					<hr
						style={{ backgroundColor: "white", width: "40%", margin: "auto" }}
					/>
					<h2>Upcoming Events</h2>
					<Row>
						{eventData.map((event) => {
							return (
								<Col
									className="d-flex align-self-stretch"
									style={{ paddingTop: "4px" }}
								>
									<EventCard eventData={event} />
								</Col>
							);
						})}
					</Row>
					<hr
						style={{ backgroundColor: "white", width: "40%", margin: "auto" }}
					/>
					<Link to="/players">Back to Players</Link>
				</div>
			</div>
		);
	}
};

export default PlayersInstance;
