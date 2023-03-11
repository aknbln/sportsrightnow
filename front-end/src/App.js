import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './pages/Home'
import About from './pages/About'
import Players from './pages/Players'
import Teams1 from './pages/instances/Teams1'
import Teams2 from './pages/instances/Teams2'
import Teams3 from './pages/instances/Teams3'
import Event1 from './pages/instances/Event1'
import Event2 from './pages/instances/Event2'
import Event3 from './pages/instances/Event3'
import Teams from './pages/Teams'
import Events from './pages/Events'
import NotFound from './pages/NotFound'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import {LinkContainer} from 'react-router-bootstrap'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'

import PlayersInstance from './pages/PlayerInstance';
import TeamsInstance from './pages/TeamInstance'
import EventsInstance from './pages/EventInstance';


function App() {
  return (
    <div>
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

              <LinkContainer to = "/Players">
                <Nav.Link>Players</Nav.Link>
              </LinkContainer>
              <LinkContainer to = "/Teams">
                <Nav.Link>Teams</Nav.Link>
              </LinkContainer>
              <LinkContainer to = "/Events">
                <Nav.Link>Events</Nav.Link>
              </LinkContainer>
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
          
          <Route path="/teams/instance" element={<TeamsInstance />}/>

          <Route path="/players/instance" element={<PlayersInstance />}/>

          <Route path="/events/instance" element={<EventsInstance />}/>

        </Routes>
    </div>
  );
}        
export default App;
