# cs373-idb-18

Website Link: https://www.sportsrightnow.me/

Pipelines Link: https://gitlab.com/johannramirez07/cs373-idb-18/-/pipelines

# Team: 
Travis Aldrich - tga385 - tgaldr2

Akin Bilen - ab73797 - aknbln

Eric Li - el27249 - neepsy

Tommy Ly - thl526 - tommylySchool

Johann Ramirez - jsr3368 - johannramirez07

## Phase I:
Git SHA - dba29bd547fa7710c80d94bc0e4b5642dff57a97

Leader - Eric

### Hours Worked:
Travis Aldrich - Predicted: 8 Hrs - Actual: 8 Hrs

Akin Bilen - Predicted: 8 Hrs - Actual: 9 Hrs

Eric Li - Predicted: 8 Hrs - Actual: 11 Hrs

Tommy Ly - Predicted: 8 Hrs - Actual: 8 Hrs

Johann Ramirez - Predicted: 8 Hrs - Actual: 9 Hrs

### Comments:
I can't believe we finished with 2 minutes before midnight!!!!


## Phase II:
Git SHA - 07838822d28f2300deb62af2d7a896cd2390e4e7

Leader - Akin Bilen

### Hours Worked:
Travis Aldrich - Predicted: 8 Hrs - Actual: 8 Hrs

Akin Bilen - Predicted: 8 Hrs - Actual: 23 Hrs

Eric Li - Predicted: 8 Hrs - Actual: 25 Hrs

Tommy Ly - Predicted: 8 Hrs - Actual: 12 Hrs

Johann Ramirez - Predicted: 8 Hrs - Actual: 24 Hrs

### Comments:
We are probably going to have to resubmit D:





# Project Name: SportsRightNow

Description: A website that lets the users look up information about sport teams, players, and sporting events by city. The premise of the site will be to allow everyone to easily do things like filter players by teams and sporting events happening with them participating nearby, filtering teams by cities, and filtering events by their sport or even by the cities. The purpose of our site is to be a one-stop-shop to get information about events happening nearby along with providing informaion about players and the teams or organziations they are a apart of. Additionally, we want people to be able to discover local sports teams and support them at events.

# Data Sources:

Players: https://rapidapi.com/tipsters/api/sportscore1 

Organization/Team: https://rapidapi.com/theapiguy/api/thesportsdb 

Sporting event: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-attractions-v2



# Models:


# Sport teams:

Instances: ~400

Attributes: Sport played, win/loss, players, city, notable awards

Media: Logo, Map of home stadium, photo of the team together

Connection to other models: players in the team, cities they’re playing for



# Players:

Instances: ~10000

Attributes: Stats about their career, what teams they’ve played on, country, age

Media:  Photos of the players, link to their socials

Connection to other models:  Team (or country) they play for



# Sporting events by city:

Instances: ~1000

Attributes: sport type, city, date, ticket price, team, players coming

Media: Photo of place, link to place to buy tickets, map of place

Connection to other models: who is playing, and what team is playing

# Use Cases
I am traveling to Houston, what sporting events are happening nearby?

My favorite team is the Chicago Bulls, what is their complete roster?

I’m planning a trip to NYC, I wonder what teams are active there?

I’m getting into watching basketball, what teams are coming to cities near me?