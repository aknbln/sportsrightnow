import React from "react";
import PlayerCard from "../components/PlayerCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { PaginationControl } from "react-bootstrap-pagination-control";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

import "../grid.scss";
import axios from "axios";

const ax = axios.create({
	baseURL: "https://api.sportsrightnow.me/",
});

const Players = ({}) => {
	const [currentPageNum, setCurrentPageNum] = useState(1);
	const [playerData, setPlayerData] = useState([]);

	// const [allNames, setAllNames] = useState([]);
	const [allPlayerData, setAllPlayerData] = useState([]);
	//total number of data entries
	// const [dataLength, setDataLength] = useState(0);
	const filterValues = useRef({});

	const [loaded, setLoaded] = useState(false);
	const [filterParams, setFilterParams] = useState({});

	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => createFilter(data);

	const ITEMS_PER_PAGE = 12;
	const stateRef = useRef();
	stateRef.current = playerData;

	function createFilter(data) {
		console.log(data);
		let filter = {};
		if (data.playerName !== "") filter.name = data.playerName;
		if (data.team !== "") filter.team = data.team;
		if (data.city !== "") filter.city = data.city;
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


			//check if filte

			if (JSON.stringify(filterValues.current) === "{}") {
				let uniqueNames = [];
				let teams = [];
				let cities = [];
				let colleges = [];
				//get all of the unique names
				response.data.data.forEach((data) => {
					let firstname = data.name.split(" ")[0];
					let team = data.team.split(" ")[1];
					let city = data.team.split(" ")[0];
					let college = data.college;
					//get unique names
					if (!uniqueNames.some((fn) => fn.value === firstname)) {
						uniqueNames.push({
							label: data.name.split(" ")[0],
							value: data.name.split(" ")[0],
						});
					}

					//get unique teams
					if (!teams.some((t) => t.value === team)) {
						teams.push({
							label: data.team.split(" ")[1],
							value: data.team.split(" ")[1],
						});
					}

					//get unique cities
					if (!cities.some((c) => c.value === city)) {
						cities.push({
							label: city,
							value: city,
						});
					}
					//get unique colleges
					if (!colleges.some((cl) => cl.value === college)) {
						colleges.push({
							label: college,
							value: college,
						});
					}
				});

				filterValues.current = {
					names: uniqueNames,
					teams: teams,
					cities: cities,
					colleges: colleges,
				};

				// setAllNames(response.data.data.map((dat) => dat.name));
			}
			setAllPlayerData(response.data.data);
			console.log(allPlayerData);
			console.log(response.data.data);
			//load the first page
			changePage(1);
		});
	};

	useEffect(() => {

		let data = allPlayerData.slice(
			(currentPageNum - 1) * ITEMS_PER_PAGE,
			currentPageNum * ITEMS_PER_PAGE
		);
		setPlayerData(data);
		
	}, [allPlayerData]);

	//fetch new data every time filterParams changes
	useEffect(() => {
		console.log("fetching data");

		setLoaded(false);
		fetchData(filterParams);
	}, [filterParams, ]);

//how to call changePage and pass in params for fetcH?:


	function changePage(num) {
		console.log("changing page");
		let data = allPlayerData.slice(
			(num - 1) * ITEMS_PER_PAGE,
			num * ITEMS_PER_PAGE
		);
		setPlayerData(data);
		console.log(data);
		//set page number
		setCurrentPageNum(num);
		
		setLoaded(true);

	}

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

						{/* Switch it to creatable select after successfull functionality for searches such as "Akin" https://www.youtube.com/watch?v=3u_ulMvTYZI  min: 13 */}

						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<Select
								placeholder="Player Name"
								styles={{
									control: (provided, state) => ({
										...provided,
										minWidth: "15vw",
										maxWidth: "15vw",
									}),

									option: (provided, state) => {
										return { ...provided, color: "black" };
									},
								}}
								options={filterValues.current.names.sort((a, b) =>
									a.value.localeCompare(b.value)
								)}
								onChange={(e) => {
									createFilter({playerName: e.value})
									
								}}
							/>

							{/* Team Name */}
							<Select
								placeholder="Team Name"
								styles={{
									control: (provided, state) => ({
										...provided,
										minWidth: "15vw",
										maxWidth: "15vw",
									}),

									option: (provided, state) => {
										return { ...provided, color: "black" };
									},
								}}
								//write options with map that there is no duplicate team names:
								//https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates

								options={filterValues.current.teams.sort((a, b) =>
									a.value.localeCompare(b.value)
								)}

								onChange={(e) => {
									createFilter({team: e.value})
									
								}}
							/>

							{/* City */}
							<Select
								placeholder="City"
								styles={{
									control: (provided, state) => ({
										...provided,
										minWidth: "12vw",
										maxWidth: "12vw",
									}),
									option: (provided, state) => {
										return { ...provided, color: "black" };
									},
								}}
								options={filterValues.current.cities.sort((a, b) =>
									a.value.localeCompare(b.value)
								)}
								onChange={(e) => {
									createFilter({city: e.value})
									
								}}
							/>
							{/* League */}
							<Select
								placeholder="League"
								styles={{
									option: (provided, state) => {
										return { ...provided, color: "black" };
									},
								}}
								options={[
									{ label: "NBA", value: "NBA" },
									{ label: "NFL", value: "NFL" },
									{ label: "MLB", value: "MLB" },
								]}
								onChange={register("league")}
							/>

							{/* College */}

							<Select
								placeholder="College"
								option={filterValues.current.colleges}
								styles={{
									option: (provided, state) => {
										return { ...provided, color: "black" };
									},
								}}
								onChange={(e) => {
									let filter = {};
									filter.name = e.value;
									setFilterParams((filterParams) => ({
										...filterParams,
										filter,
									}));
								}}
							/>
						</div>
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
								<link
									href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
									rel="stylesheet"
								/>
								<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
								<label for="player-names">Name</label>
								<select
									id="player-names"
									name="player-names"
									{...register("playerName")}
								>
									<input type="text" name="name" {...register("team")} />

									<option value="" selected>
										Any
									</option>
								</select>
							</div>

							{/* <div className="Form-element">
								<label>Team</label>
								<br />
								<input type="text" name="team" {...register("team")} />
							</div> */}

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
