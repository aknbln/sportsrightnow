import DefaultImage from "./images/question.png"
import Tipscore from "./images/logos/tipsscore.png"
import SportsDB from "./images/logos/sportsdb.png"
import Ticketmaster from "./images/logos/t_logo.png"
import Gitlab from "./images/logos/gitlab.png"

const apiData = [
  {
    title: "TipsScore API",
    image: Tipscore,
    text:
      "TipsScore provides data on teams, players, match results and more. It even provides real time info on game scores, fouls, and other events.",
    url: "https://tipsscore.com/",
  },
  {
    title: "TheSportsDB",
    image: SportsDB,
    text:
      "The SportsDB is a crowdsourced database of sports information. It provides information on players such as their biography, staticstics, and career history.",
    url: "https://www.thesportsdb.com/",
  },
  {
    title: "Ticketmaster API",
    image: Ticketmaster,
    text:
      "Ticketmaster is a global service that sells tickets to music, sporting, and other events. Their API provides information on many live events that are occuring worldwide.",
    url: "https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/",
  },
  {
    title: "GitLab API",
    image: Gitlab,
    text:
      "GitLab is a Git based version control and Continous Integration service. Their API provides information on repositories hosted there including contributers, commits, and issues.",
    url: "https://docs.gitlab.com/ee/api/",
  }
];

export { apiData };
