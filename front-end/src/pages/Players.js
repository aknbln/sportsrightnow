import React from "react";
import PlayerCard from "../components/PlayerCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Pagination } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { useForm } from "react-hook-form";
import axios from "axios";

const ax = axios.create({
	baseURL: "https://api.sportsrightnow.me/",
});

const Players = ({}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [playerData, setPlayerData] = useState([]);

	const [allNames, setAllNames] = useState([]);
	//total number of data entries
	const [dataLength, setDataLength] = useState(0);

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

	useEffect(() => {
		const fetchData = async (params) => {
			await ax.get("players", { params }).then((response) => {
				setDataLength(response.data.data.length);
				setPageCount(dataLength / ITEMS_PER_PAGE);
				//CreatePages(Math.min( Math.ceil(response.data.data.length / ITEMS_PER_PAGE), 32)),
				//setDataSlice(response.data.data.slice(1, ITEMS_PER_PAGE + 1)),
				// IF STATEMENT HERE TO CHECK IF FILTERDATA IS NULL
        		setPlayerData(response.data.data);
				if(allNames.length === 0){
					setAllNames(response.data.data.map((dat) => dat.name));
				}
				setLoaded(true);
				changePage(1);
			});
		};

		setLoaded(false);
		const params = new URLSearchParams(filterParams);
		fetchData(params);
	}, [filterParams]);  
	
	// useEffect(() => {
	// 	  CreatePages(pageCount)
	// 	}, [currentPage])

	function changePage(num) {
		const fetch = async (params) => {
			await ax.get("players", { params }).then((response) => {
				setPlayerData(response.data.data);
			});
		};
    //what's the point of this?:
    //what is structuredClone?: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm

		let p = structuredClone(filterParams);
		p.page = num;
		p.perPage = ITEMS_PER_PAGE;
    //what does this do?: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
		const params = new URLSearchParams(p);
		setCurrentPage(num);
    //what does fetch do?: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
		fetch(params);
	}

  const handleOnClick = (props) => {

    //add the f name to the filter params and set it to the value of e
    createFilter(filterParams + props);
    
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
					<p>Total Players: {dataLength}</p>
				</header>

				<div className="App-body">
					<Container style={{ padding: "3vh" }}>
						<h1>Players</h1>

						<hr style={{ backgroundColor: "white", height: "2px" }} />
						<h2>Filter / Sort</h2>
						<form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexWrap:"wrap", gap: "1%", rowGap:"1vh"}}>
            <div className='Form-element'>
              <label>Name</label>
              <br/>
              <input type="text" name="playerName" {...register("playerName")}/>
            </div>
            
            <div className='Form-element'>
              <label>Team</label>
              <br/>
              <input type="text" name="team" {...register("team")}/>
            </div>

            <div className='Form-element'>
              <label>League</label>
              <br/>
              <select {...register("league")}>
                <option value="any">Any</option>
                <option value="nba">NBA</option>
                <option value="nfl">NFL</option>
                <option value="mlb">MLB</option>
              </select>
            </div>

            <div style={{width: "100%"}}/>

            <div className='Form-element'>
              <label>College</label>
              <br/>
              <input min="0" type="text" name="college" {...register("college")}/>
            </div>

            <div className='Form-element'>
              <label>Jersey number</label>
              <br/>
              <input min="0" type="number" name="jerseyNum" {...register("jerseyNum")}/>
            </div>

            <div style={{width: "100%"}}/>

            <div className='Form-element'>
              <label>Sort By</label>
              <br/>
              <select {...register("sort")}>
                <option value="default">Default</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-dsc">Name Z-A</option>
                <option value="team-asc">Team A-Z</option>
                <option value="team-dsc">Team Z-A</option>
              </select>
            </div>

            <div style={{width: "100%"}}/>

            <input type="submit" value="Filter" style={{width: '15%', marginTop:"3vh"}}/> 
          </form>

						{/* <Select
							options={{
								label: JSON.parse(playerData).map((dat) => dat.name),
								value: JSON.parse(playerData).map((dat) => dat.name),
							}}
						/> */}

						<DropdownButton title= {filterParams.name ? filterParams.name : "Name"}>
							<Container
								style={ { height: "20rem", overflowY: "scroll" }}
							>
                <Dropdown.Item onClick = {() => handleOnClick({name: ""})}>
                  Any
                </Dropdown.Item>
								{allNames.map((item) => {
									return (
										<Dropdown.Item  onClick = {() => handleOnClick({name: item.split(" ")[0]})}>
											{item.split(" ")[0]}
										</Dropdown.Item>
									);
								})}
							</Container>
						</DropdownButton>

						<hr style={{ backgroundColor: "white", height: "2px" }} />
						<PaginationControl
							page={currentPage}
							total={pageCount}
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
						page={currentPage}
						total={pageCount}
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
