import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import SendButton from './send_button';
import Collections from './collections';
import '../react-tabs.css';
import Dropdown from 'react-dropdown';
import '../react-dropdown.css';
import spectrum from '../static/spectrumbg.png';
import '../spectrum.css'
import Tabs from './tabs';

const axios = require('axios');

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

  color: white;
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

  color: white;
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

  color: white;
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

  color: white;
`;

const StyledResponseBodyLabel = styled.h1`
  position: absolute;
  left: 320px;
  top: 45px;
  font-family: Roboto;
  font-style: normal;
  font-size: 18px;
  line-height: 16px;

  color: white;
`;

const StyledRequestHeaderLabel = styled.h1`
  position: absolute;
  left: 320px;
  top: 215px;
  font-family: Roboto;
  font-style: normal;
  font-size: 18px;
  line-height: 16px;

  color: white;
`;

const StyledResponseHeaderLabel = styled.h1`
  position: absolute;
  left: 320px;
  top: 205px;
  font-family: Roboto;
  font-style: normal;
  font-size: 18px;
  line-height: 16px;

  color: white;
`;

const StyledMainWrapper = styled.section`
  position: absolute;
  width: 90px;
  height: 21px;
  left: 40px;
  top: 190px;
`;

const StyledRequestWrapper = styled.section`
  position: absolute;
  width: 90px;
  height: 21px;
  left: 0px;
  top: 25px;
`;

const StyledRequestFrame = styled.section`
  position: absolute;
  width: 805px;
  height: 370px;
  left: -30px;
  top: 20px;
  background: rgba(0, 0, 0, 0.50);
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

  color: white;
`;

const StyledResponseFrame = styled.section`
  position: absolute;
  width: 805px;
  height: 360px;
  left: -30px;
  top: 100px;

  background: rgba(0, 0, 0, 0.50);
`;

const StyledResponseWrapper = styled.section`
  position: absolute;
  width: 90px;
  height: 21px;
  left: 0px;
  top: 360px;
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

  color: white;
`;

const StyledResponseBody = styled.section`
  position: absolute;
  width: 640px;
  height: 130px;
  left: 30px;
  top: 70px;
`;

const StyledResponseHeader = styled.section`
  position: absolute;
  width: 640px;
  height: 130px;
  left: 30px;
  top: 225px;
`;

const StyledRequestBody = styled.section`
  position: absolute;
  width: 640px;
  height: 130px;
  left: 30px;
  top: 80px;
`;

const StyledRequestHeader = styled.section`
  position: absolute;
  width: 640px;
  height: 130px;
  left: 30px;
  top: 235px;
`;

const StyledMethodSelector = styled.div`
  position: absolute;
  width: 85px;
  left: 5px;
  top: 24px;
`;

const StyledSpectrumBackground = styled.section`
  position: absolute;
  left: 40px;
  top: -190px;
`;

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
    methods: ["GET", "POST", "PUT", "DELETE"],
    selectedMethod: '',
    url: '',                        //proxyURL
    requestHeaders: '',             //proxyRequestHeaders
    requestBody: '',                //proxyRequestBody
    responseBody:'',                //ProxyResponseBody
    responseHeaders: '',            //ProxyResponseHeaders
    responseStatus: '',             //ProxyResponseStatus
    tabIndex: 0,
    };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handlePopulate = this.handlePopulate.bind(this);

  console.log(`IN CTOR: ${this.state.requestBody}`);

  }; //end constructor

  handlePopulate = (method, url, body, headerKey, headerValue) => {
    this.setState({
      selectedMethod: method,
      url: url,
      requestBody: body,
      requestHeaders: `${headerKey}: ${headerValue}`
    });
  };

  handleSelectMethod = (option) => {
    const selectedMethod = option.value
    this.setState({selectedMethod});
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`UI: proxybody: ${JSON.stringify(this.state.requestBody)}`); 

    if(this.state.selectedMethod === "GET"){
      this.state.requestBody = this.state.requestBody
    }
    else{
      this.state.requestBody = JSON.parse(this.state.requestBody)
    }

    // The inner object which will be user by the server
    const proxybody = {
      proxyurl: this.state.url, 
      proxyrequestheaders: JSON.parse(JSON.stringify(this.state.requestHeaders)), 
      proxyrequestbody: this.state.requestBody,
      proxymethod: this.state.selectedMethod
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
        requestBody: JSON.stringify(proxybody.proxyrequestbody, null, 2)
      })
    }).catch(error => {
      console.log(error)
    })
  }

render(){
  const {selectedMethod, methods} = this.state;
  return(
    <StyledMainWrapper>
      <StyledSpectrumBackground>
        <img src={spectrum} alt="" />
        <Tabs/>
      </StyledSpectrumBackground>
      <StyledRequestWrapper>
      <StyledRequest>
        Request
      </StyledRequest>
      <StyledRequestFrame>
        <StyledMethod>
          Method
        </StyledMethod>
        <StyledUrl>
          URL
        </StyledUrl>
        <form onSubmit={this.handleSubmit}>
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
            <Dropdown 
              options={methods}
              onChange={this.handleSelectMethod}
              value={selectedMethod}
              placeholder="Select"/>
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
        </form>
      </StyledRequestFrame>

      </StyledRequestWrapper>
      <StyledResponseWrapper>
        <StyledResponse>
          Response
        </StyledResponse>
        <StyledResponseFrame>
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
        </StyledResponseFrame>
      </StyledResponseWrapper>
      <Collections onSubmit={this.handlePopulate}/>
    </StyledMainWrapper>
    );
  }
}

export default Main