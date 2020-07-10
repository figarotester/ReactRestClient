import React, {Component} from 'react';
import styled from 'styled-components';
import TabButton from './tab_button';
import SendButton from './send_button';
const axios = require('axios');

const CollectionsFrame = styled.section`
  position: absolute;
  width: 400px;
  height: 289px;
  left: 800px;
  top: -296px;

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
  left: 850px;
  top: -325px;

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
  left: 56px;
  top: 16px;
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
  top: calc(50% - 18px/2 - 130.5px);
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
  top: calc(50% - 18px/2 - 130.5px);
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

const StyledRequestWrapper = styled.section`
  position: absolute;
  width: 90px;
  height: 21px;
  left: 56px;
  top: 16px;
`;

const RequestFrame = styled.section`
  position: absolute;
  width: 700px;
  height: 289px;
  left: 56px;
  top: 51px;
  background: #EEEAEA;
`;

const StyledResponse = styled.h1`
  position: absolute;
  width: 90px;
  height: 21px;
  left: 56px;
  top: 40px;

  font-family: Roboto;
  font-style: italic;
  font-weight: 500;
  font-size: 20px;
  line-height: 21px;
`;

const ResponseFrame = styled.section`
  position: absolute;
  width: 700px;
  height: 289px;
  left: 56px;
  top: 75px;

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
  top: calc(50% - 22px/2 - 130.5px);

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;

  color: #000000;
`;

const StyledResponseText = styled.section`
  position: absolute;
  width: 640px;
  height: 130px;
  left: 30px;
  top: 140px;

  background: white
;`

const StyledRequestText = styled.section`
  position: absolute;
  width: 640px;
  height: 130px;
  left: 30px;
  top: 140px;

  background: white
;`

const StyledHeaderButton = styled.button`
  position: absolute;
  width: 90px;
  height: 23px;
  left: 350px;
  top: 104px;
`;

const StyledMethodSelector = styled.div`
  position: absolute;
  width: 94px;
  height: 20px;
  left: 9px;
  top: 24px;
`;

const StyledBodyButton = styled.button`
  position: absolute;
  width: 90px;
  height: 23px;
  left: 110px;
  top: 104px;
`;

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
    url: '',
    requestHeaders: '',
    requestBody:'',
    responseBody:'',
    responseHeaders: '',
    status: '',
    value: ''
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleSelect = this.handleSelect.bind(this);
  this.handleRequestDisplay = this.handleRequestDisplay.bind(this);
  this.handleResponseDisplay = this.handleResponseDisplay.bind(this);

};

  handleRequestDisplay = (event) =>{
    this.setState({requestDisplay: event.target.value});
  }

  handleResponseDisplay = (event) =>{
    this.setState({responseDisplay: event.target.value});
  }

  handleSelect = (event) =>{
    this.setState({value: event.target.value});
  }

  handleChange = (event) => {
  this.setState({url: event.target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const postbody = {
      proxyurl: this.state.url, 
      proxyrequestheaders: this.state.requestHeaders, 
      proxyrequestbody: this.state.requestBody,
      proxymethod: this.state.value};
      
    console.log(JSON.stringify(postbody));

    const requestHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'xc-portal-source-client': 'MySpectrumApp@8.4.0',
      'Authorization' : 'Basic Y2hhcnRlcm5ldDpDaGFydDNybjN0'
    }

    const requestBody = 
    {
      "KeepMeIn": true,
    "Username": "billpay0026?recordsession=true&uriexactmatch=false",
    "TargetUrl": null,
    "Password": "Testing01",
    "CaptchaResponse": null,
    "AttemptNumber": 1
  }

    const body = {
      ID: 123
    }

    axios(
      {
        method: 'post',
        url: '/proxy',
        data: postbody,
        headers: requestHeaders,
        body: requestBody,
        credentials: 'include',
        params: body
      }
    ).then(response => {
      console.log('parsed json', response.data);
      console.log('Status:', response.status, response.statusText);
      console.log('Headers:', response.headers);
      console.log(response.config)
      this.setState({
        requestHeaders: JSON.stringify(requestHeaders, null, 2),
        responseHeaders: JSON.stringify(response.headers, null, 2),
        requestBody: JSON.stringify(requestBody, null, 2),
        responseBody: JSON.stringify(response.data, null, 2),
        status: JSON.stringify(response.status, null, 2),
      })
    }).catch(error => {
      console.log(error)
    })
  }

render(){
  return(
  <StyledRequestWrapper>
    <StyledRequest>
      Request
    </StyledRequest>
    <TabButton/>
    <RequestFrame>
    <StyledMethod>
      Method
    </StyledMethod>
    <StyledUrl>
      URL
    </StyledUrl>
    <StyledUrlBar>
      <form onSubmit={this.handleSubmit}>
        <input
          name="value"
          value={this.state.url}
          onChange={this.handleChange}
          type="text"
          style={{width: "330px"}}/>
        <SendButton type="submit" value="Submit"/>
      </form>
    </StyledUrlBar>
    <StyledMethodSelector>
      <form onSubmit={this.handleSubmit}>
        <select onChange={this.handleSelect} value={this.state.value}>
          <option defaultValue="select">Select</option>
          <option value="get">GET</option>
          <option value="post">POST</option>
          <option value="put">PUT</option>
          <option value="delete">DELETE</option>
        </select>
      </form>
    </StyledMethodSelector>
    <StyledBodyButton onClick={this.handleRequestDisplay} value={this.state.requestBody}>
      Body
    </StyledBodyButton>
    <StyledHeaderButton onClick={this.handleRequestDisplay} value={this.state.requestHeaders}>
      Header
    </StyledHeaderButton>
    <StyledRequestText>
      <textarea rows={5} cols={78} value={this.state.requestDisplay} onChange={this.handleRequestDisplay}/>
    </StyledRequestText>
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
          <textarea rows={1} cols={16} value={this.state.status} onChange={this.handleChange}/>
        </StyledStatusBar>
        <StyledBodyButton onClick={this.handleResponseDisplay} value={this.state.responseBody}>
          Body
        </StyledBodyButton>
        <StyledHeaderButton onClick={this.handleResponseDisplay} value={this.state.responseHeaders}>
        Header
      </StyledHeaderButton >
        <StyledResponseText>
          <textarea rows={5} cols={78} value={this.state.responseDisplay} onChange={this.handleResponseDisplay}/>
        </StyledResponseText>
      </ResponseFrame>
    </StyledResponseWrapper>
    <StyledCollectionsWrapper>
      <StyledCollections>
        Collections
      </StyledCollections>
      <CollectionsFrame>
      </CollectionsFrame>
    </StyledCollectionsWrapper>
  </StyledRequestWrapper>
  
    );
  }
}
export default Main