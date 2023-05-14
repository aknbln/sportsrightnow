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
import TestButton from "../components/Button";
import "../grid.scss";
import { Link } from "react-router-dom";

const quotes = [
	{
		quote:
			"I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
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

const Home = ({}) => {
	return (
		<div className="App">
			<div className="sections">
				<div className={"first"}>
					<h1 className="home-text">
						{" "}
						SPORTS
						<ReactPlayer
							url="https://www.youtube.com/watch?v=0lM-x1tBWOM"
							controls={true}
							playing={true}
							muted={true}
							width="700px"
							height="400px"
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
							}}
						>
							{quotes.map((quote, index) => (
								<Carousel.Item key={index}>
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

				<div style={{ backgroundColor: "darkgreen" }}></div>

				<div style={{ backgroundColor: "yellow" }}></div>
			</div>
		</div>
	);
};

export default Home;
