import renderer from 'react-test-renderer'
import TechCard from '../components/TechCard'
import img from '../assets/images/question.png'

const Jest = 
{
    title: "Jest",
    image: img,
    text: "Javascript unit test library",
    url: "https://jestjs.io/",
}

it('Tech Card link correct', () => {
    const component = renderer.create(<TechCard techData={Jest}/>)
    expect(component.url = "https://jestjs.io/")
})

it('DevCard renders correctly', () => {
    const component = renderer.create(<TechCard techData={Jest}/>)
    let json = component.toJSON()
    expect(json).toMatchSnapshot()
})