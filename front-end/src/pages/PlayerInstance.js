import React, { useEffect, useState } from "react";
import { playerData } from "../assets/PlayerData";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GenerateMapQuerry } from "../Utils";
import EventCard from "../components/EventCard";
import { Timeline } from "react-twitter-widgets";
import Fade from "react-reveal/Fade";
import Rotate from "react-reveal/Rotate";
import Reveal from "react-reveal/Reveal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../grid.scss";
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

	const [fade, setFade] = useState(false);
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
					{
						//why is the grid not working: https://stackoverflow.com/questions/51114695/why-is-my-css-grid-not-working
					}

						<div className="layout">

							<Rotate top left>
							<div
								className="box"
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
										width: 350,
										height: 350,
										resize: "cover",
									}}
									alt="picture"
								/>
							</div>
							</Rotate>
							<Rotate top right duration = {2000} opposite = {true}>
							<div style={{ gridArea: "frame" }}>
								<iframe
									className="box"
									id="wiki"
									src={`https://en.wikipedia.org/wiki/${fetchedData.name
										.split(" ")
										.join("_")}`}
									style={{
										width: "500px",
										height: "100%",
									}}
								></iframe>
							</div>
							</Rotate>
							<Rotate top left>
							<div className="box" style={{ gridArea: "info" }}>
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
							</Rotate>
						</div>
					<br />

					<hr
						style={{ backgroundColor: "white", width: "40%", margin: "auto" }}
					/>

					<div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-around",
								alignContent: "space-around",
								flexDirection: "row",
							}}
						>
							<h2>Twitter</h2>
							<h2>Home Stadium</h2>
						</div>

						<div style={{ display: "flex" }}>
							<Fade fraction="0.8" left opposite = {true} ssrFadeout = {true}>
								<Timeline
									className="box"
									dataSource={{
										sourceType: "profile",
										screenName: fetchedData.team.split(" ").join(""),
									}}
									options={{
										height: "600",
										width: "25vw",
										gridArea: "i1",
									}}
								/>
							</Fade>
							<Fade fraction="0.8" right opposite>
								<iframe
									className="box"
									style={{
										height: "600px",
										width: "30vw",
										marginLeft: "2vw",
										gridArea: "i2",
									}}
									src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAp-NjtN6McZptGFjlIYXwX_QDPjr3FVcE&q=${mapQuerry}`}
								></iframe>
							</Fade>
						</div>
					</div>
					<hr
						style={{
							backgroundColor: "white",
							width: "40%",
							marginTop: "20px",
						}}
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
