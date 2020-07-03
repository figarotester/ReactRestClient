import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {url: '', response: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({url: event.target.value});
  }

   handleSubmit = async (event) => {
     event.preventDefault();

    const postbody = {proxyurl: this.state.url, proxymethod: 'get'};
    console.log(JSON.stringify(postbody));

    fetch('/proxy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postbody)
      }).then(response => response.json())
      .then(json => {
        console.log('parsed json', json) // access json.body here
        this.setState({response: JSON.stringify(json,null, 2)});
      });

  }

  render() {
    return (
      <div className="App">
      <header className="App-header"> URL proxy tester</header>
      <br/>
      <form onSubmit={this.handleSubmit}>
        <label> URL:</label>
          <input  type="text" value={this.state.url} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
          <br/>
          <br/>
          <textarea rows={8} cols={80} value={this.state.response} onChange={this.handleChange}/>
        
        
      </form>
      </div>
    );
  }
}

export default App;
