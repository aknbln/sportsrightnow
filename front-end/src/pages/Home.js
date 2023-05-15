import React from "react";
import logo from "../assets/images/ball.svg";
import mj from "../athletes/mj.png";
import vincelom from "../athletes/vincelom.jpeg";
import Carousel from "react-bootstrap/Carousel";
import ronaldo from "../athletes/ronaldo.png";
import kobe from "../athletes/kobe.png";
import ReactPlayer from "react-player";
import Fade from "react-reveal/Fade";
import Reveal from "react-reveal/Reveal";
import Tada from "react-reveal/Tada";
import TestButton from "../components/Button";
import "../grid.scss";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import nbateams from "../athletes/nbateams.jpeg";
import teams from "../athletes/teams.jpeg";
import events from "../athletes/events.jpg";

const quotes = [
	{
		quote:
			"I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. And that is why I succeed.",
		owner: "Michael Jordan",
		photo: mj,
	},
	{
		quote: "We don't want to tell our dreams. We want to show them.",
		owner: "Cristiano Ronaldo",
		photo: ronaldo,
	},
	{
		quote:
			"I'll do whatever it takes to win games, whether it's sitting on a bench waving a towel, handing a cup of water to a teammate, or hitting the game-winning shot.",
		owner: "Kobe Bryant",
		photo: kobe,
	},
];

function ModelCard(props) {
	return (
		<Card
			style={{
				width: "25%",
				maxHeight: "70%",
				position: "relative",
			}}
		>
			<Card.Img variant="top" src={props.src} className="card-img" />

			<Card.Body
				style={{
					maxHeight: "100%",
					backgroundColor: "lightgray",
				}}
			>
				<Card.Text
					style={{ fontSize: "2vw", color: "#404040", fontWeight: "10" }}
				>
					{props.txt}
				</Card.Text>

				<Link to={props.linkURL}>
					<Button
						style={{
							position: "relative",
							top: "5%",
							backgroundColor: "#3d405b",
						}}
					>
						Go to {props.name}
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);
}

const Home = ({}) => {
	return (
		<div className="App">
			<div className="sections">
				<div className={"first"}>
					<h1 className="sports-text">
						SPORTS
						<ReactPlayer
							url="https://www.youtube.com/watch?v=0lM-x1tBWOM"
							controls={true}
							playing={true}
							muted={true}
							width="1090px"
							height="600px"
							className="video"
						/>
					</h1>
				</div>

				<div className="second">
					<h1 className="home-text">
						RIGHT
						<Carousel
							indicators={false}
							style={{
								width: "60vw",
								height: "100%",
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								pointerEvents: "visible",
							}}
						>
							{quotes.map((quote, index) => (
								<Carousel.Item
									key={index}
									style={{
										position: "relative",
									}}
								>
									<div className="carousel-items">
										<img src={quote.photo} style={{}} />

										<Fade top opposite duration={1500}>
											<h2> {quote.quote}</h2>
											<h3> - {quote.owner}</h3>
										</Fade>
									</div>
								</Carousel.Item>
							))}
						</Carousel>
					</h1>
				</div>

				<div className="third">
					<Tada fraction={0.9}>
						<h1 className="now-text">NOW</h1>
					</Tada>
				</div>

				<div className="forth">
					<h1
						style={{
							top: "10%",
							position: "relative",
							left: "10%",
							width: "80%",
							textAlign: "justify",
							textJustify: "auto",
							color: "white",
						}}
					>
						SportsRightNow is the place to find more about your favorite teams,
						players and events across <strong>NBA, NFL and MLB</strong>. There
						are more than 4000+ players, 90+ teams, and 100+ events to choose
						from.
					</h1>
					<Fade fraction={0.6}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-around",
								alignItems: "center",
								maxHeight: "80%",
								position: "relative",
							}}
						>
							<ModelCard
								name="Players"
								src={teams}
								txt="Learn more about your favorite players"
								linkURL="/players"
							/>
							<ModelCard
								name="Teams"
								src={nbateams}
								txt="Learn more about your favorite teams"
								linkURL="/teams"
							/>

							<ModelCard
								name="Events"
								src={events}
								txt="Find events about your favorite teams"
								linkURL="/events"
							/>
						</div>
					</Fade>
				</div>
			</div>
		</div>
	);
};

export default Home;
