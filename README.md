# 🏆 SportsRightNow: Sports Data & Event Explorer

## 📌 Project Overview  
SportsRightNow is a web platform designed to help users explore information about sports teams, players, and events based on location. Users can filter players by teams, discover sporting events in nearby cities, and find local sports organizations. The goal is to create a one-stop-shop for sports enthusiasts to access relevant data and support local teams.  

## 🛠️ Used Technologies  
- **Backend & Hosting:** AWS EC2, AWS Elastic Beanstalk  
- **Frontend:** React, TypeScript  
- **Database:** Hosted on AWS  

## 🎯 Objectives  
### Comprehensive Sports Data Access (REST)  
- Enable users to search and filter:
  - **Teams** by city and sport.
  - **Players** by team and career stats.
  - **Sporting events** by location and date.
- Provide interactive visualizations for enhanced user experience.

## 👥 Team Members  
- **Travis Aldrich** (tga385 - tgaldr2)  
- **Akin Bilen** (ab73797 - aknbln)  
- **Eric Li** (el27249 - neepsy)  
- **Tommy Ly** (thl526 - tommylySchool)  
- **Johann Ramirez** (jsr3368 - johannramirez07)  

## 📂 Data Sources  
- **Players:** [SportScore API](https://rapidapi.com/tipsters/api/sportscore1)  
- **Organizations/Teams:** [TheSportsDB API](https://rapidapi.com/theapiguy/api/thesportsdb)  
- **Sporting Events:** [Ticketmaster API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-attractions-v2)  

## 🏅 Models & Data Structure  
### **Sport Teams**  
- **Instances:** ~400  
- **Attributes:** Sport played, win/loss record, players, city, notable awards  
- **Media:** Logo, home stadium map, team photos  
- **Connections:** Players in the team, city they represent  

### **Players**  
- **Instances:** ~10,000  
- **Attributes:** Career stats, past teams, country, age  
- **Media:** Player photos, social media links  
- **Connections:** Associated team(s) or national team  

### **Sporting Events by City**  
- **Instances:** ~1,000  
- **Attributes:** Sport type, city, date, ticket price, teams, participating players  
- **Media:** Venue photos, ticket purchase links, location map  
- **Connections:** Teams and players involved  

## 🔍 Use Cases  
✅ Traveling to **Houston**? Find out which sporting events are happening nearby.  
✅ Want to see the **Chicago Bulls** roster? Get a full team breakdown.  
✅ Visiting **NYC**? Explore teams active in the city.  
✅ New to **basketball**? Find out which teams are playing near you.  

---  
### 📜 License  
This project is for educational and research purposes. Contributions and feedback are welcome!
