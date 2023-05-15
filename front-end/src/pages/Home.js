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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CategoryCard from "../components/CategoryCard";

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

				<div className="second">
					<div >
						<Container
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Row>
								<Col >
									<CategoryCard
										title="Artists"
										subtitle=""
										text="Discover your favorite artists!"
										linkURL="/artists"
									/>
								</Col>

								<Col>
									<CategoryCard
										title="Concerts"
										subtitle=""
										text="Find the hottest events near you!"
										linkURL="/concerts"
									/>
								</Col>
								<Col>
									<CategoryCard
										title="Cities"
										subtitle=""
										text="Venture to new places!"
										linkURL="/cities"
									/>
								</Col>
							</Row>
						</Container>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
