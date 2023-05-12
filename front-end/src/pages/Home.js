import React from "react";
import logo from "../assets/images/ball.svg";
import mj from "../athletes/mj.png";
import vincelom from "../athletes/vincelom.jpeg";
import Carousel from "react-bootstrap/Carousel";
import ronaldo from "../athletes/ronaldo.png";
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
		quote:
			"The dictionary is the only place that success comes before work. work is the key to success, and hard work can help you accomplish anything.",
		owner: "Vince Lombardi",
		photo: vincelom,
	},
	{
		quote: "We don't want to tell our dreams. We want to show them.",
		owner: "Cristiano Ronaldo",
		photo: ronaldo,
	},
];

const Home = ({}) => {
	return (
		<div className="App">
			<header className="App-header">
				<h2>Sports RightNow</h2>
				<h4>Sports information right here, right now!</h4>
			</header>
			<div className="App-body">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Welcome to the amazing Sports Now Database!</p>

				<Carousel
					style={{
						width: "60%",
						height: "60vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
          // nextIcon={}
				>
					{quotes.map((quote, index) => (
						<Carousel.Item
							key={index}
							style={{
								minHeight: "60vh",
							}}
						>
							<div className="carous">
								<img src={quote.photo} style={{}} />

								<Fade top opposite duration={1500}>
									<h2> {quote.quote}</h2>
									<h3> - {quote.owner}</h3>
								</Fade>
							</div>
						</Carousel.Item>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default Home;
