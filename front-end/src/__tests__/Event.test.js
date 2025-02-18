// Replace useNavigates with a dummy function as it doesn't work without a <Router>

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

import renderer from 'react-test-renderer'
import EventCard from '../components/EventCard'

const Event = 
{
    name: "Buffalo Ballers vs Jovian Jabbers",
    local_date: "1/01/1984",
    local_time: "00:00",
    city: "Jupiter",
    venue: "Europa Gigadome",
    id: "999",
}

it('EventCard data correct', () => {
    const component = renderer.create(<EventCard eventData={Event}/>)
    expect(component.location = "Jupiter")
})

it('EventCard renders correctly', () => {
    const component = renderer.create(<EventCard eventData={Event}/>)
    let json = component.toJSON()
    expect(json).toMatchSnapshot()
})