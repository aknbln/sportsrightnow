import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './pages/Home'
import About from './pages/About'
import Players from './pages/Players'
import Teams from './pages/Teams'
import Events from './pages/Events'
import NotFound from './pages/NotFound'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import {LinkContainer} from 'react-router-bootstrap'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'

import Team1 from './pages/instances/Team1'

function App() {
  return (
    <div>
      <Router>

      <Navbar bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Container>
          <Navbar.Brand>Sports Now</Navbar.Brand>
            <Nav className='me-auto'>
              <LinkContainer to = "/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to = "/About">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>

              <NavDropdown title="Models" id="models-dropdown">
                <LinkContainer to = "/Players">
                  <NavDropdown.Item>Players</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to = "/Teams">
                  <NavDropdown.Item>Teams</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to = "/Events">
                  <NavDropdown.Item>Events</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
        </Container>
        </Navbar.Collapse>
      </Navbar>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/players" element={<Players />}/>
          <Route path="/teams" element={<Teams />}/>
          <Route path="/events" element={<Events />}/>
          
          <Route path="/teams/1" element={<Team1 />}/>
          <Route path="/teams/2" element={<Events />}/>
          <Route path="/teams/3" element={<Events />}/>

          <Route path="/players/1" element={<Events />}/>
          <Route path="/players/2" element={<Events />}/>
          <Route path="/players/3" element={<Events />}/>

          <Route path="/events/1" element={<Events />}/>
          <Route path="/events/2" element={<Events />}/>
          <Route path="/events/3" element={<Events />}/>

        </Routes>
      </Router>
    </div>
  );
}        
export default App;
