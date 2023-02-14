import React, { Component } from 'react'

export class FetchTest extends Component {
  render() {
    return (
      <div>
        <hr style={{color: 'white', width: "90%", margin: "auto"}}></hr>
        <h2>
          {this.state.title}
        </h2>
        <p>
          {this.state.text}
        </p>
      </div>
    )
  }

  componentDidMount(){
    console.log("Hello from FT");
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(data => this.setState({title: data.title, text: data.body}))
  }

  constructor(props){
    super(props)

    this.state = {
        title: "Default",
        text: "Some random words here"
    }
  }
}

export default FetchTest