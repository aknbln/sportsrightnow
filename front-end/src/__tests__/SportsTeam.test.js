// Replace useNavigates with a dummy function as it doesn't work without a <Router>

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

import renderer from 'react-test-renderer'
import TeamCard from '../components/TeamCard'
import img from '../assets/images/question.png'

const Team = 
{
    name: "Buffalo Ballers",
    logo: img,
    league: "NBA",
    totalWins: "999",
    totalLosses: "-1",
    city: "Buffalo",
    team_id: "999", 
}

it('TeamCard data correct', () => {
    const component = renderer.create(<TeamCard sportsTeamData={Team}/>)
    expect(component.country = "USA")
})

it('TeamCard renders correctly', () => {
    const component = renderer.create(<TeamCard sportsTeamData={Team}/>)
    let json = component.toJSON()
    expect(json).toMatchSnapshot()
})