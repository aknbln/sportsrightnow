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
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from 'react-router-bootstrap'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Visualizations from './pages/Visualization';
import ProviderVisuals from './pages/ProviderVisuals';

import PlayersInstance from './pages/PlayerInstance';
import TeamsInstance from './pages/TeamInstance'
import EventsInstance from './pages/EventInstance';
import Search from './pages/Search';


function App() {

  const navigate = useNavigate()

  const onSearch = e => {
    e.preventDefault()
    const formData = new FormData(e.target), formDataObj = Object.fromEntries(formData.entries())
    navigate("/search?q=" + formDataObj.text)
  }

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
              <LinkContainer to = "/Visualizations">
                <Nav.Link>Visualizations</Nav.Link>
              </LinkContainer>
              <LinkContainer to = "/ProviderVisualizations">
                <Nav.Link>Provider Visualizations</Nav.Link>
              </LinkContainer>

              <div style={{width:"30%"}}/>

              <Form className="d-flex" style={{width:"20%", float:"right"}} onSubmit={onSearch}>
                <Form.Control
                  type="search"
                  name="text"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button type="submit">Search</Button>
              </Form>
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

          <Route path="/visualizations" element={<Visualizations/>}/>

          <Route path="/ProviderVisualizations" element={<ProviderVisuals/>}/>

          <Route path="/Search" element={<Search/>}/>

        </Routes>
    </div>
  );
}        
export default App;
