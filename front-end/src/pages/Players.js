import React from "react";
import PlayerCard from "../components/PlayerCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { PaginationControl } from "react-bootstrap-pagination-control";
import { useState, useEffect, useRef } from "react";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";

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

	const ITEMS_PER_PAGE = 12;
	const stateRef = useRef();
	stateRef.current = playerData;

	function createFilter(data) {
		console.log(data);
		let filter = {};
		if (data.name !== "") filter.name = data.name;
		if (data.team !== "") filter.team = data.team;

		//maybe add city to filter ---> ASK JOHANN
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
			//check if filterValues has been initialized
			if (JSON.stringify(filterValues.current) === "{}") {
				let uniqueNames = [];
				let teams = [];
				let cities = [];
				let colleges = [];
				//get all of the unique names
				response.data.data.forEach((data) => {
					let firstname = data.name.split(" ")[0];

					let team = data.team.split(" ");
					team = team[team.length - 1];

					let city = data.team.split(" ");
					city = city.slice(0, city.length - 1).join(" ");
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
							label: team,
							value: team,
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
			}
			setAllPlayerData(response.data.data);
			//load the first page
			changePage(1);
		});
	};

	//need it because useState is async and allPlayerData is not updated immediately
	useEffect(() => {
		let data = allPlayerData.slice(
			(currentPageNum - 1) * ITEMS_PER_PAGE,
			currentPageNum * ITEMS_PER_PAGE
		);
		setPlayerData(data);
	}, [allPlayerData]);

	//fetch new data every time filterParams changes
	useEffect(() => {
		setLoaded(false);
		fetchData(filterParams);
	}, [filterParams]);

	//how to call changePage and pass in params for fetcH?:

	function changePage(num) {
		console.log("changing page");
		let data = allPlayerData.slice(
			(num - 1) * ITEMS_PER_PAGE,
			num * ITEMS_PER_PAGE
		);
		setPlayerData(data);

		//set page number
		setCurrentPageNum(num);

		setLoaded(true);
	}

	if (!loaded) {
		return (
			<div className="Players">
				<header className="App-header" >
					<h1>Find more about your favorite players!</h1>
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
					<h1>Find more about your favorite players!</h1>
					<br />
					<p>
						We have {allPlayerData.length} professional athletes that fit the
						categories in our database!
					</p>
				</header>

				<div className="App-body">
					<Container style={{ padding: "3vh" }}>
						{/* Switch it to creatable select after successfull functionality for searches such as "Akin" https://www.youtube.com/watch?v=3u_ulMvTYZI  min: 13 */}

						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<CreatableSelect
								isClearable
								placeholder={
									filterParams.name === "" || !filterParams.name
										? "Player Name"
										: filterParams.name
								}
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
								onChange={(e, actType) => {
									if (actType.action === "clear") {
										createFilter({ ...filterParams, name: "" });
									} else {
										createFilter({ ...filterParams, name: e.value });
									}
								}}
							/>

							{/* Team Name */}
							<Select
								isClearable
								placeholder={
									filterParams.team === "" || !filterParams.team
										? "Team Name"
										: filterParams.team
								}
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
								onChange={(e, actType) => {
									if (actType.action === "clear") {
										createFilter({ ...filterParams, team: "" });
									} else {
										createFilter({ ...filterParams, team: e.value });
									}
								}}
							/>

							{/* City */}
							<Select
								isClearable
								placeholder={
									filterParams.team === "" || !filterParams.team
										? "City"
										: filterParams.team
								}
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
								onChange={(e, actType) => {
									if (actType.action === "clear") {
										createFilter({ ...filterParams, team: "" });
									} else {
										createFilter({ ...filterParams, team: e.value });
									}
								}}
							/>
							{/* League */}
							<Select
								isClearable
								placeholder={
									filterParams.league === "" || !filterParams.league
										? "League"
										: filterParams.league
								}
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
								onChange={(e, actType) => {
									if (actType.action === "clear") {
										createFilter({ ...filterParams, league: "" });
									} else {
										createFilter({ ...filterParams, league: e.value });
									}
								}}
							/>

							{/* College FIX*/}

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
						<br />
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<Select
								defaultValue="default"
								placeholder="Sort By"
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
								options={[
									{ label: "Name A-Z", value: "name-asc" },
									{ label: "Name Z-A", value: "name-dsc" },
									{ label: "Team A-Z", value: "team-asc" },
									{ label: "Team Z-A", value: "team-dsc" },
								]}
								onChange={(e) => {
									createFilter({ ...filterParams, sort: e.value });
								}}
							></Select>

							{/* create a reset button */}
							<button
								onClick={() => {
									setFilterParams({});
								}}
								style={{
									backgroundColor: "white",
									color: "gray",
									borderColor: "lightgray",
									borderRadius: "2%",
									borderStyle: "solid",
								}}
							>
								Reset
							</button>
						</div>

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

						{playerData.length !== 0 ? (
							<Row xs={2} md={3} lg={4}>
								{playerData.map((dat) => {
									return (
										<div>
											<Col>
												<PlayerCard playerData={dat} />
											</Col>
											<br />
										</div>
									);
								})}
							</Row>
						) : (
							<div>
								<br />
								<br />
								<h2
									style={{
										textAlign: "center",
										alignContent: "center",
										justifySelf: "center",
									}}
								>
									No available players for the given filters! Try resetting your
									filters.
								</h2>
							</div>
						)}

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
