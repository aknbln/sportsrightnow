// Replace useNavigates with a dummy function as it doesn't work without a <Router>

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

import renderer from 'react-test-renderer'
import PlayerCard from '../components/PlayerCard'
import img from '../assets/images/question.png'
import { inchToFeet } from '../Utils'

const Player = 
{
    name: "Bobby Basketball",
    image: img,
    team: "Buffalo Ballers",
    league: "NBA",
    age: "100",
    country: "USA",
    height: "12' 3\"",
    player_id: "999",

}

it('PlayerCard data correct', () => {
    const component = renderer.create(<PlayerCard playerData={Player}/>)
    expect(component.age = 100)
})

it('PlayerCard renders correctly', () => {
    const component = renderer.create(<PlayerCard playerData={Player}/>)
    let json = component.toJSON()
    expect(json).toMatchSnapshot()
})

it('Inch to feet conversion correct', () => {
    const inches = 75
    let feet = inchToFeet(inches)
    expect(feet = "7' 3\"")
})