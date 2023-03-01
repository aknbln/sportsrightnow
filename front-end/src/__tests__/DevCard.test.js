import renderer from 'react-test-renderer'
import DeveloperCard from '../components/DeveloperCard'
import img from '../assets/images/question.png'
import { sumTests } from '../Utils'


const DummyDev = {
    name: "Devy Dev",
    gitlab_username: "dev",
    alias: "",
    email: "dev@dev.com",
    image: img,
    role: "Morale Support",
    bio: "I'm a dev!",
    commits: 0,
    issues: 0,
    unit_tests: 0,
}

it('DevCard reads data correctly', () => {
    const component = renderer.create(<DeveloperCard data={DummyDev}/>)
    expect(component.name = "Devy Dev")
    expect(component.name = "dev@dev.com")
})

it('DevCard renders correctly', () => {
    const component = renderer.create(<DeveloperCard data={DummyDev}/>)
    let json = component.toJSON()
    expect(json).toMatchSnapshot()
})

it('Unit tests summed correctly', () => {
    const dummyData = [
        {
            name: "Bob",
            unit_tests: 1
        },
        {
            name: "Alice",
            unit_tests: 2
        },
        {
            name: "Joe",
            unit_tests: -1
        }
    ]

    let sum = sumTests(dummyData)
    expect(sum = 2)
})