import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
const axios = require('axios')


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {url: '', requestHeaders:'', requestBody:'', responseBody: '', responseHeaders:''};

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

    const requestHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-TEST-HEADER': 'XXXXX'
     };

     axios({
     method: 'post',
     url: '/proxy',
     data: postbody,
     headers: requestHeaders
    }).then(response => {
      console.log('parsed json', response.data); // access json.body here
      this.setState({
        requestHeaders: JSON.stringify(requestHeaders, null, 2),
        responseHeaders: JSON.stringify(response.headers, null, 2), 
        responseBody: JSON.stringify(response.data,null, 2)});
      });
      
}

  render() {
    return (
      <div className="App">
      <header className="App-header"> URL proxy tester</header>
      <br/>
      <form onSubmit={this.handleSubmit}>
        <label> URL  </label><br/>
        <input  size="60" type="text" value={this.state.url} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
        <br/>
        <br/>
        <label>Request Headers </label><br/>
        <textarea rows={8} cols={80} value={this.state.requestHeaders} onChange={this.handleChange}/>
        <br/>
        <br/>
        <label>Request Body </label><br/>
        <textarea rows={8} cols={80} value={this.state.requestBody} onChange={this.handleChange}/>
        <br/>
        <br/>
        <label>Response Headers </label><br/>
        <textarea rows={8} cols={80} value={this.state.responseHeaders} onChange={this.handleChange}/>
        <br/>
        <br/>
        <label>Response Body </label><br/>
        <textarea rows={8} cols={80} value={this.state.responseBody} onChange={this.handleChange}/>
      </form>
      </div>
    );
  }
}

export default App;
