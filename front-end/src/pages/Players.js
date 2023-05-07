import React from "react";
import PlayerCard from "../components/PlayerCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { PaginationControl } from "react-bootstrap-pagination-control";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import "../grid.scss";
import axios from "axios";

const ax = axios.create({
	baseURL: "https://api.sportsrightnow.me/",
});

const Players = ({}) => {
	const [currentPageNum, setCurrentPageNum] = useState(1);
	const [playerData, setPlayerData] = useState([]);

	const [allNames, setAllNames] = useState([]);
	const [allPlayerData, setAllPlayerData] = useState([]);
	//total number of data entries
	// const [dataLength, setDataLength] = useState(0);

	//total number of pages
	const [pageCount, setPageCount] = useState(0);

	const [loaded, setLoaded] = useState(false);
	const [filterParams, setFilterParams] = useState({});

	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => createFilter(data);

	const ITEMS_PER_PAGE = 12;
	const stateRef = useRef();
	stateRef.current = playerData;

	function createFilter(data) {
		let filter = {};
		if (data.playerName !== "") filter.name = data.playerName;
		if (data.team !== "") filter.team = data.team;
		if (data.college !== "") filter.college = data.college;
		if (data.jerseyNum !== "" && data.jerseyNum !== undefined)
			filter.jerseyNum = data.jerseyNum;
		if (data.league !== "any") filter.league = data.league;

		switch (data.sort) {
			case "default":
				break;
			case "name-asc":
				filter.sort = "name";
				filter.asc = true;
				break;
			case "name-dsc":
				filter.sort = "name";
				break;
			case "team-asc":
				filter.sort = "team";
				filter.asc = true;
				break;
			case "team-dsc":
				filter.sort = "team";
				break;
		}
		setFilterParams(filter);
	}

	const fetchData = async (params) => {
		await ax.get("players", { params }).then((response) => {
			//get all of the players that fit the filter
			setAllPlayerData(response.data.data);
			if (allNames.length === 0) {
				setAllNames(response.data.data.map((dat) => dat.name));
			}

			//load the first page
			changePage(1);
		});
	};

	//fetch new data every time filterParams changes
	useEffect(() => {
		setLoaded(false);
		fetchData(filterParams);
	}, [filterParams]);

	function changePage(num) {
		const fetch = async (params) => {
			await ax.get("players", { params }).then((response) => {
				//get the players data for the current page
				setPlayerData(response.data.data);
				setLoaded(true);
			});
		};

		let p = structuredClone(filterParams);
		p.page = num;
		p.perPage = ITEMS_PER_PAGE;
		const params = new URLSearchParams(p);
		//set page number
		setCurrentPageNum(num);
		fetch(params);
	}

	//   const handleOnClick = (props) => {

	//     add the f name to the filter params and set it to the value of e
	//     createFilter(filterParams + props);

	//   }

	if (!loaded) {
		return (
			<div className="Players">
				<header className="App-header" style={{ padding: "2%" }}>
					<h1>Players</h1>
					<p>Find your favorite players!</p>
				</header>

				<div className="App-body">
					<h2>Loading...</h2>
				</div>
			</div>
		);
	} else {
		return (
			<div className="Players">
				<header className="App-header" style={{ padding: "2%" }}>
					<h1>Players</h1>
					<p>Find your favorite players!</p>
					<p>Total Players: {allPlayerData.length}</p>
				</header>

				<div className="App-body">
					<Container style={{ padding: "3vh" }}>
						<h1>Players</h1>

						<hr style={{ backgroundColor: "white", height: "2px" }} />
						<h2>Filter / Sort</h2>
						<form
							onSubmit={handleSubmit(onSubmit)}
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: "1%",
								rowGap: "1vh",
							}}
						>
							{/* <input type="text" name="playerName" placeholder="Player Name.."{...register("playerName")}/>  setFilterparams to filterparams + playername equals to the value:
							 */}
							<div className="dropdown">
								<label for="player-names">Name</label>
								<select id="player-names" name="player-names" style={{}} {...register("playerName")}>
									<option value="" selected>
										Any
									</option>
									{allNames.map((name) => {
										return (
											<option value={name.split(" ")[0]}>
												{name.split(" ")[0]}
											</option>
										);
									})}
								</select>
							</div>
							<div className="Form-element">
								<label>Team</label>
								<br />
								<input type="text" name="team" {...register("team")} />
							</div>

							<div className="Form-element">
								<label>League</label>
								<br />
								<select {...register("league")}>
									<option value="any">Any</option>
									<option value="nba">NBA</option>
									<option value="nfl">NFL</option>
									<option value="mlb">MLB</option>
								</select>
							</div>

							<div style={{ width: "100%" }} />

							<div className="Form-element">
								<label>College</label>
								<br />
								<input
									min="0"
									type="text"
									name="college"
									{...register("college")}
								/>
							</div>

							<div className="Form-element">
								<label>Jersey number</label>
								<br />
								<input
									min="0"
									type="number"
									name="jerseyNum"
									{...register("jerseyNum")}
								/>
							</div>

							<div style={{ width: "100%" }} />

							<div className="Form-element">
								<label>Sort By</label>
								<br />
								<select {...register("sort")}>
									<option value="default">Default</option>
									<option value="name-asc">Name A-Z</option>
									<option value="name-dsc">Name Z-A</option>
									<option value="team-asc">Team A-Z</option>
									<option value="team-dsc">Team Z-A</option>
								</select>
							</div>

							<div style={{ width: "100%" }} />

							<input
								type="submit"
								value="Filter"
								style={{ width: "15%", marginTop: "3vh" }}
							/>
						</form>

						<hr style={{ backgroundColor: "white", height: "2px" }} />
						<PaginationControl
							page={currentPageNum}
							total={allPlayerData.length}
							limit={ITEMS_PER_PAGE}
							between={5}
							changePage={(page) => {
								changePage(page);
								console.log(page);
							}}
							ellipsis={10}
						/>
						<br />
						<Row xs={2} md={3} lg={4}>
							{playerData.map((dat) => {
								return (
									<Col
										className="d-flex align-self-stretch"
										style={{ paddingTop: "4px" }}
									>
										<PlayerCard playerData={dat} />
									</Col>
								);
							})}
						</Row>
						<br />
						<br />
					</Container>

					<PaginationControl
						page={currentPageNum}
						total={allPlayerData.length}
						limit={ITEMS_PER_PAGE}
						between={5}
						changePage={(page) => {
							changePage(page);
							console.log(page);
						}}
						ellipsis={10}
					/>
				</div>
			</div>
		);
	}
};

export default Players;
