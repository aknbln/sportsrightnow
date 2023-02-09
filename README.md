# cs373-idb-18


CS 373 IDB
Group: IDB-18
Team: Travis Aldrich, Akin Bilen, Eric Li, Tommy Ly, Johann Ramirez
Project Name: Sports
Description: A website that lets the users look up information about sport teams, players, and sporting events by city. The premise of the site will be to allow everyone to easily do things like filter players by teams and sporting events happening with them participating nearby, filtering teams by cities, and filtering events by their sport or even by the cities. The purpose of our site is to be a one-stop-shop to get information about events happening nearby along with providing informaion about players and the teams or organziations they are a apart of. Additionally, we want people to be able to discover local sports teams and support them at events.

Data Sources:

Players: https://rapidapi.com/tipsters/api/sportscore1 

Organization/Team: https://rapidapi.com/theapiguy/api/thesportsdb 

Sporting event(by city): https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-attractions-v2


Models:

Sport teams:

Instances: ~400
Attributes: Sport played, win/loss, 
Media: Logo, Map (of home stadium?), photo of the team together
Connection to other models: players in the team, cities they’re playing for

Players:

Instances: ~10000
API:
Attributes: Stats about their career, what teams they’ve played on, country, age
Media:  Photos of the players, link to their socials
Connection to other models:  Team (or country) they play for

Sporting events by city:

Instances: ~1000
API: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-attractions-v2
Attributes: sport type, city, date, ticket price
Media: Photo of place, link to place to buy tickets, map of place
Connection to other models: who is playing, and what team is playing


I am traveling to Houston, what sporting events are happening nearby?
My favorite team is the Chicago Bulls, what is their complete roster?
I’m planning a trip to NYC, I wonder what teams are active there?
I’m getting into watching basketball, what teams are coming to cities near me?