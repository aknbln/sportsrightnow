import React, { useState, useEffect } from 'react'
import { teamData } from '../assets/TeamData'
import { techData } from '../assets/TechData'
import { apiData } from '../assets/APIData'
import DeveloperCard from '../components/DeveloperCard'
import TechCard from '../components/TechCard'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";

import axios from 'axios'

const ax = axios.create({
  baseURL: "https://gitlab.com/api/v4/projects/43387145/",
  headers: {Authorization: "Bearer glpat-aJduU2GynJigL83TH_tS"}
});

const fetchGitlabStats = async () => {
  let totalCommits = 0, totalIssues = 0

  // Fetch commit stats
  await ax
  .get("/repository/contributors")
  .then((response) =>{
    console.log(response)
    response.data.forEach((element) =>{
      const{name, commits} = element

      teamData.forEach((member) => {
        if(member.name == name || member.gitlab_username == name || member.alias == name) {
          // Some team members count as multiple contributers due to different emails
          member.commits += commits
        }
      })
      totalCommits += commits
    })
  })

  // Fetch issue stats
  // Make sure the API key is right or this won't work!
  await ax
  .get("/issues")
  .then((response) => {
    response.data.forEach((element) => {
      const{ assignees } = element
      assignees.forEach((assignee) => {
        const{ name } = assignee
        teamData.forEach((member) => {
          if(member.name == name || member.gitlab_username == name || member.alias == name){
            member.issues += 1
          }
        })
      })
      totalIssues += 1
    })
  })

  // TODO: Unit tests aren't part of GitLab API. I guess we just hardcode them locally??

  return {
    totalCommits: totalCommits,
    totalIssues: totalIssues,
    teamData: teamData
  }
}

const About = ({}) =>{

  const [totalCommits, setTotalCommits] = useState(0);
  const [totalIssues, setTotalIssues] = useState(0);
  const [totalTests, setTotalTests] = useState(0);
  const [team, setTeam] = useState([])

   useEffect(() => {

    // Reset stats before loading
    teamData.forEach((member) => {
      member.commits = 0
      member.issues = 0
    })

    const fetchStats = async() => {
        const stats = await fetchGitlabStats();
        setTotalCommits(stats.totalCommits)
        setTotalIssues(stats.totalIssues)
        setTeam(stats.teamData)
    }

    console.log("useeffect triggered")

    fetchStats()
  }, []) 

  return (
      <div className="App">
          <header className="App-header">
            <h1>About</h1>
            <p>Sports Now is an next generation database for all your sports player, team, and event needs</p>
          </header>

          <div className="App-body">
            <Container>
              <h2>Our Team</h2>
              <hr style={{backgroundColor: 'white', height: "2px"}}/>
              <Row xs={2} md={3} lg={5}>
                {teamData.map((member) => {
                  return (
                    <Col className='d-flex align-self-stretch'>
                      <DeveloperCard data={member}/>
                    </Col>
                  )
                })}
              </Row>

              <br/>
              <h3>Repository Statistics</h3>
              <hr style={{backgroundColor: 'white', width: "30%", margin: "auto"}}/>
              <br/>
              <Row>
                <Col> <h4>Total Commits: {totalCommits}</h4></Col>
                <Col> <h4>Total Issues: {totalIssues}</h4></Col>
                <Col> <h4>Total Tests: {totalTests}</h4></Col>
              </Row>
              <br/>
              <Row>
                <h4><a href="https://gitlab.com/johannramirez07/cs373-idb-18">Repo Link</a></h4>
              </Row>
              <br/>
              <br/>
            </Container>

            <Container style={{padding: '3vh'}}>
              <h2>Technologies Utilized</h2>
              <hr style={{backgroundColor: 'white', height: "2px"}}/>
                <Row xs={2} md={3} lg={4}>
                  {techData.map((dat) => {
                    return (
                      <Col className='d-flex align-self-stretch' style={{paddingTop: '4px'}}>
                          <TechCard techData={dat}/>                        
                      </Col>
                    )
                  })}
                </Row>
                <br/>
                <br/>
            </Container>

            <Container style={{padding: '3vh'}}>
              <h2>APIs Utilized</h2>
              <hr style={{backgroundColor: 'white', height: "2px"}}/>
                <Row xs={2} md={3} lg={4}>
                  {apiData.map((dat) => {
                    return (
                      <Col className='d-flex align-self-stretch' style={{paddingTop: '4px'}}>
                          <TechCard techData={dat}/>                        
                      </Col>
                    )
                  })}
                </Row>
            </Container>
          </div>
            
            
        </div>
  )
}

export default About