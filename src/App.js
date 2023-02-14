import './App.css'
import TestButton from './components/Button'
import Home from './pages/Home'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blah" element={<TestButton color='white'/>}/>
      </Routes>

      
    </Router>
    
  );
}        
export default App;
