import React from "react";
import TeamCard from "../components/TeamCard";
import { Breadcrumb, Stack } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";

import axios from "axios";
import { filter } from "d3";

const ax = axios.create({
	baseURL: "https://api.sportsrightnow.me/",
});

const Teams = ({}) => {
	const [currentPageNum, setCurrentPageNum] = useState(1);

	const [allTeamData, setAllTeamData] = useState([]);
	const [teamData, setTeamData] = useState([]);

	const [loaded, setLoaded] = useState(false);
	const [filterParams, setFilterParams] = useState({});

	const filterValues = useRef({});

	const ITEMS_PER_PAGE = 12;
	const stateRef = useRef();
	stateRef.current = teamData;
	stateRef.page = currentPageNum;

	function createFilter(data) {
		let filter = {};
		if (data.name !== "") filter.name = data.name;
		if (data.city !== "") filter.city = data.city;
		if (data.minWins !== "" && data.minWins !== undefined)
			filter.win = data.minWins;
		if (data.maxLosses !== "" && data.maxLosses !== undefined)
			filter.loss = data.maxLosses;
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
			case "wins-asc":
				filter.sort = "totalWins";
				filter.asc = true;
				break;
			case "wins-dsc":
				filter.sort = "totalWins";
				break;
			case "loss-asc":
				filter.sort = "totalLosses";
				filter.asc = true;
				break;
			case "loss-dsc":
				filter.sort = "totalLosses";
				break;
		}
		setFilterParams(filter);
	}

	const fetchData = async (params) => {
		await ax.get("teams", { params }).then((response) => {
			if (JSON.stringify(filterValues.current) === "{}") {
				let names = [];
				let cities = [];
				let leagues = [];
				let conferences = [];

				response.data.data.forEach((team) => {
					if (!names.some((nm) => nm.value === team.name.split(" ")[1])) {
						names.push({
							value: team.name.split(" ")[1],
							label: team.name.split(" ")[1],
						});
					}

					if (!cities.some((ct) => ct.value === team.city)) {
						cities.push({ label: team.city, value: team.city });
					}
					if (!leagues.some((lg) => lg.value === team.league)) {
						leagues.push({ label: team.league, value: team.league });
					}

					if (!conferences.some((cf) => cf.value === team.conference)) {
						conferences.push({
							label: team.conference,
							value: team.conference,
						});
					}
				});

				filterValues.current = {
					names: names,
					cities: cities,
					leagues: leagues,
					conferences: conferences,
				};
			}
			setAllTeamData(response.data.data);
			changePage(1);
		});
	};

	useEffect(() => {
		setLoaded(false);

		fetchData(filterParams);
	}, [filterParams]);

	useEffect(() => {
		setTeamData(
			allTeamData.slice(
				(currentPageNum - 1) * ITEMS_PER_PAGE,
				currentPageNum * ITEMS_PER_PAGE
			)
		);
	}, [allTeamData]);

	function changePage(num) {
		let data = allTeamData.slice(
			(num - 1) * ITEMS_PER_PAGE,
			num * ITEMS_PER_PAGE
		);
		setTeamData(data);
		//set page number
		setCurrentPageNum(num);

		setLoaded(true);
	}

	if (!loaded) {
		return (
			<div className="Teams">
				<header className="App-header" style={{ padding: "2%" }}>
					<h1>Find more about your favorite teams!</h1>
				</header>

				<div className="App-body">
					<h2>Loading...</h2>
				</div>
			</div>
		);
	} else {
		return (
			<div className="Teams">
				<header className="App-header" style={{ padding: "2%" }}>
					<h1>Find more about your favorite teams!</h1>
					<br />
					<p>
						We have {allTeamData.length} professional athletes that fit the
						categories in our database!
					</p>
				</header>

				<div className="App-body">
					<Container style={{ padding: "3vh" }}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							{/* Team Name */}
							<CreatableSelect
								isClearable
								placeholder={
									filterParams.name === "" || !filterParams.name
										? "Team Name"
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

							{/* Conference */}
							<Select
								isClearable
								placeholder={
									filterParams.conference === "" || !filterParams.conference
										? "Conference"
										: filterParams.conference
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

								options={filterValues.current.conferences}
								onChange={(e, actType) => {
									if (actType.action === "clear") {
										createFilter({ ...filterParams, conference: "" });
									} else {
										createFilter({ ...filterParams, conference: e.value });
									}
								}}
							/>

							{/* City */}
							<Select
								isClearable
								placeholder={
									filterParams.city === "" || !filterParams.city
										? "City"
										: filterParams.city
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
								options={filterValues.current.cities}
								onChange={(e, actType) => {
									if (actType.action === "clear") {
										createFilter({ ...filterParams, city: "" });
									} else {
										createFilter({ ...filterParams, city: e.value });
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
								Reset Filters
							</button>
						</div>
						<hr style={{ backgroundColor: "white", height: "2px" }} />
						<PaginationControl
							page={currentPageNum}
							total={allTeamData.length}
							limit={ITEMS_PER_PAGE}
							between={5}
							changePage={(page) => {
								changePage(page);
								console.log(page);
							}}
							ellipsis={10}
						/>
            <br />

						{teamData.length !== 0 ? (
							<Row xs={2} md={3} lg={4}>
								{teamData.map((dat) => {
									return (
										<div>
											<Col>
												<TeamCard sportsTeamData={dat} />
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
									No available teams for the given filters! Try resetting your
									filters.
								</h2>
							</div>
						)}

					</Container>
					{/* <Pagination>{pages}</Pagination> */}
          <PaginationControl
						page={currentPageNum}
						total={allTeamData.length}
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

export default Teams;
