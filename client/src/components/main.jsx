import React, {Component} from 'react';
import styled from 'styled-components';
import TabButton from './tab_button';
import SendButton from './send_button';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import '../react-tabs.css';

const axios = require('axios');

const CollectionsFrame = styled.section`
  position: absolute;
  width: 550px;
  height: 289px;
  left: 700px;
  top: -327px;

  background: #EEEAEA;
`;

const StyledCollectionsWrapper = styled.section`
  position: absolute;
  width: 90px;
  height: 21px;
  left: 56px;
  top: 347px;
`;

const StyledCollections = styled.h1`
  position: absolute;
  width: 90px;
  height: 21px;
  left: 930px;
  top: -355px;

  font-family: Roboto;
  font-style: italic;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;

  color: #000000;
`;

const StyledStatusBar = styled.div`
  position: absolute;
  width: 150px;
  height: 20px;
  left: 9px;
  top: 24px;

  background: white;
`;

const StyledRequest = styled.h1`
  position: absolute;
  width: 90px;
  height: 21px;
  left: -30px;
  top: -10px;
  font-family: Roboto;
  font-style: italic;
  font-weight: 500;
  font-size: 20px;
  line-height: 21px;
`;

const StyledMethod = styled.h1`
  position: absolute;
  width: 49px;
  height: 18px;
  left: 9px;
  top: calc(50% - 18px/2 - 170.5px);
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`;

const StyledUrl = styled.h1`
  position: absolute;
  width: 48px;
  height: 18px;
  left: 109px;
  top: calc(50% - 18px/2 - 170.5px);
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`;

const StyledUrlBar = styled.div`
  position: absolute;
  left: 110px;
  top: 23px;
`;

const StyledRequestBodyLabel = styled.h1`
  position: absolute;
  left: 320px;
  top: 60px;
  font-family: Roboto;
  font-style: normal;
  font-size: 18px;
  line-height: 16px;
  color: #000000;
`;

const StyledResponseBodyLabel = styled.h1`
  position: absolute;
  left: 320px;
  top: 45px;
  font-family: Roboto;
  font-style: normal;
  font-size: 18px;
  line-height: 16px;
  color: #000000;
`;

const StyledRequestHeaderLabel = styled.h1`
  position: absolute;
  left: 320px;
  top: 215px;
  font-family: Roboto;
  font-style: normal;
  font-size: 18px;
  line-height: 16px;
  color: #000000;
`;

const StyledResponseHeaderLabel = styled.h1`
  position: absolute;
  left: 320px;
  top: 205px;
  font-family: Roboto;
  font-style: normal;
  font-size: 18px;
  line-height: 16px;
  color: #000000;
`;

const StyledRequestWrapper = styled.section`
  position: absolute;
  width: 90px;
  height: 21px;
  left: 56px;
  top: 16px;
`;

const RequestFrame = styled.section`
  position: absolute;
  width: 730px;
  height: 370px;
  left: -30px;
  top: 20px;
  background: #EEEAEA;
`;

const StyledResponse = styled.h1`
  position: absolute;
  width: 90px;
  height: 21px;
  left: -30px;
  top: 70px;

  font-family: Roboto;
  font-style: italic;
  font-weight: 500;
  font-size: 20px;
  line-height: 21px;
`;

const ResponseFrame = styled.section`
  position: absolute;
  width: 730px;
  height: 360px;
  left: -30px;
  top: 100px;

  background: #EEEAEA;
`;

const StyledResponseWrapper = styled.section`
  position: absolute;
  width: 90px;
  height: 21px;
  left: 0px;
  top: 330px;
`;

const StyledStatus = styled.h1`
  position: absolute;
  width: 49px;
  height: 18px;
  left: 9px;
  top: calc(50% - 22px/2 - 165.5px);

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;

  color: #000000;
`;

const StyledResponseBody = styled.section`
  position: absolute;
  width: 640px;
  height: 130px;
  left: 30px;
  top: 70px;

  background: white
`;

const StyledResponseHeader = styled.section`
  position: absolute;
  width: 640px;
  height: 130px;
  left: 30px;
  top: 225px;

  background: white
`;

const StyledRequestBody = styled.section`
  position: absolute;
  width: 640px;
  height: 130px;
  left: 30px;
  top: 80px;

  background: white
`;

const StyledRequestHeader = styled.section`
  position: absolute;
  width: 640px;
  height: 130px;
  left: 30px;
  top: 235px;

  background: white
`;

const StyledMethodSelector = styled.div`
  position: absolute;
  width: 94px;
  height: 20px;
  left: 9px;
  top: 24px;
`;

const StyledTabs = styled.section`
  position: absolute;
  width: 38px;
  height: 25px;
  left: 50px;
  top: -15px;
  `;

class Main extends Component {
  constructor(props){
    super(props);
    // State vars
    this.state = {
    url: '',                        //proxyURL
    requestHeaders: '',             //proxyRequestHeaders
    requestBody: '',                //proxyRequestBody
    responseBody:'',                //ProxyResponseBody
    responseHeaders: '',            //ProxyResponseHeaders
    responseStatus: '',             //ProxyResponseStatus
    value: '',                      //drop-down
    tabIndex: 0
  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);

  console.log(`IN CTOR: ${this.state.requestBody}`);

  }; //end constructor

  handleSelect = (event) => {
    this.setState({value: event.target.value});
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`UI: proxybody: ${JSON.stringify(this.state.requestBody)}`); 
    // The inner object which will be user by the server
    const proxybody = {
      proxyurl: this.state.url, 
      proxyrequestheaders: JSON.parse(JSON.stringify(this.state.requestHeaders)), 
      proxyrequestbody: JSON.parse(this.state.requestBody),
      proxymethod: this.state.value
    }
    console.log(`UI: body: ${JSON.stringify(proxybody)}`);
    axios(
      {
        method: 'post',             // this will always be POST (wrapper call to the local node server)
        url: '/proxy',              // this will always be /proxy (local node/express endpoint)
        data: proxybody,           // this object will be unwrapped in the server.
        headers: null              // we dont need to set headers for the local /proxy endpoint.
      }
    ).then(response => {
      console.log('parsed json', response.data);
      console.log('responseStatus:', response.status, response.statusText); 
      console.log('Headers:', response.headers);
      console.log(response.config);
      this.setState({
        responseHeaders: JSON.stringify(response.headers, null, 2),
        responseBody: JSON.stringify(response.data, null, 2),
        responseStatus: JSON.stringify(response.status, null, 2),
      })
    }).catch(error => {
      console.log(error)
    })
  }

render(){
  return(
  <StyledRequestWrapper>
    <form onSubmit={this.handleSubmit}>
      <StyledRequest>
        Request
      </StyledRequest>
      <StyledTabs>
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({tabIndex})}>
          <TabList>
            <Tab>{this.state.url}</Tab>
          </TabList>
          <TabPanel></TabPanel>
        </Tabs>
      </StyledTabs>
      <TabButton/>
      <RequestFrame>
        <StyledMethod>
          Method
        </StyledMethod>
        <StyledUrl>
          URL
        </StyledUrl>
        <StyledUrlBar>
          <input
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
            type="text"
            style={{width: "330px"}}/>
        <SendButton type="submit" value="Submit"/>
        </StyledUrlBar>
        <StyledMethodSelector>
          <select onChange={this.handleSelect} value={this.state.value}>
            <option defaultValue="select">Select</option>
            <option value="get">GET</option>
            <option value="post">POST</option>
            <option value="put">PUT</option>
            <option value="delete">DELETE</option>
          </select>
        </StyledMethodSelector>
        <StyledRequestBodyLabel>
          Body
        </StyledRequestBodyLabel>
        <StyledRequestBody>
          <textarea 
            name="requestBody"
            value={this.state.requestBody}
            onChange={this.handleChange}
            type="text"
            rows={5}
            cols={78}/>
        </StyledRequestBody>
        <StyledRequestHeaderLabel>
          Headers
        </StyledRequestHeaderLabel>
        <StyledRequestHeader>
          <textarea
            name="requestHeaders"
            value={this.state.requestHeaders}
            onChange={this.handleChange}
            type="text"
            rows={5}
            cols={78}/>
        </StyledRequestHeader>
      </RequestFrame>
      <StyledResponseWrapper>
        <StyledResponse>
          Response
        </StyledResponse>
        <ResponseFrame>
          <StyledStatus>
            Status
          </StyledStatus>
          <StyledStatusBar>
            <textarea rows={1} cols={16} value={this.state.responseStatus} onChange={this.handleChange}/>
          </StyledStatusBar>
          <StyledResponseBodyLabel>
            Body
          </StyledResponseBodyLabel>
          <StyledResponseBody>
            <textarea rows={5} cols={78} value={this.state.responseBody} onChange={this.handleChange}/>
          </StyledResponseBody>
          <StyledResponseHeaderLabel>
            Headers
          </StyledResponseHeaderLabel>
          <StyledResponseHeader>
            <textarea rows={5} cols={78} value={this.state.responseHeaders} onChange={this.handleChange}/>
          </StyledResponseHeader>
        </ResponseFrame>
      </StyledResponseWrapper>
      <StyledCollectionsWrapper>
        <StyledCollections>
         Collections
       </StyledCollections>
       <CollectionsFrame>
       </CollectionsFrame>
      </StyledCollectionsWrapper>
    </form>
  </StyledRequestWrapper>
    );
  }
}

export default Main