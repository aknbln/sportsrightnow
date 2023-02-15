import React from 'react'
import { teamData } from '../assets/TeamData'
import { techData } from '../assets/TechData'
import { apiData } from '../assets/APIData'
import DeveloperCard from '../components/DeveloperCard'
import TechCard from '../components/TechCard'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";

const About = ({}) =>{
    return (
        <div className="App">
            <header className="App-header">
              <h1>About</h1>
              <p>Sports Now is an next generation database for all your sports player, team, and event needs</p>
            </header>

            <body className="App-body">
              <Container>
                <h2>Our Team</h2>
                <hr style={{backgroundColor: 'white'}}/>
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
                <br/>
              </Container>

              <Container>
                <h2>Technologies Utilized</h2>
                <hr style={{backgroundColor: 'white'}}/>
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

              <Container>
                <h2>API Info</h2>
                <hr style={{backgroundColor: 'white'}}/>
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
            </body>
              
              
          </div>
    )
}

export default About