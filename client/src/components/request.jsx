import React, {Component} from 'react';
import styled from 'styled-components';
import TabButton from './tab_button';
import MethodSelector from './method_selector';
import SendButton from './send_button';
import BodyButton from './body_button';
import StatusBar from './status';

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

const StyledHeaderButton = styled.button`
  position: absolute;
  width: 90px;
  height: 23px;
  left: 350px;
  top: 104px;
`;

/*const generateElement = (key,value) => {
  return (
    <div key={key} className="row">
      <div className="col-xs-6 ins-label">{key}</div>
      <div className="col-xs-6">{value}</div>
    </div>
  );
}*/

/*function generateData(data) {
  const newData = Object.keys(data).reduce((result, currentKey) => {
    if (typeof data[currentKey] === 'string' || data[currentKey] instanceof String) {
      const elementToPush = generateElement(currentKey, data[currentKey]);
      result.push(elementToPush);
    } else {
      const nested = generateData(data[currentKey]);
      result.push(...nested);
    }
    return result;
  }, []);
  return newData;
}*/


class Request extends Component {
  constructor(props){
    super(props);
    this.state = {
    url: '',
    response: '',
    header: ''
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
};

  handleChange = (event) => {
  this.setState({url: event.target.value});
}

  handleSubmit = async (event) => {
    event.preventDefault();

    const postbody = {proxyurl: this.state.url, proxymethod: 'get'};
    console.log(JSON.stringify(postbody));

    fetch('proxy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postbody)
    }).then(response => response.json())
    .then(json => {
      console.log('parsed json', json)
      this.setState({response: JSON.stringify(json, null, 2)});
    });

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
    <MethodSelector/>
    <BodyButton/>
    <StyledHeaderButton>Header</StyledHeaderButton>
    </RequestFrame>
    <StyledResponseWrapper>
      <StyledResponse>
        Response
      </StyledResponse>
      <ResponseFrame>
        <StyledStatus>
          Status
        </StyledStatus>
        <StatusBar/>
        <BodyButton/>
        <StyledHeaderButton>
        Header
      </StyledHeaderButton >
        <StyledResponseText>
          <textarea rows={5} cols={63} value={this.state.response} onChange={this.handleChange}/>
        </StyledResponseText>
      </ResponseFrame>
      
    </StyledResponseWrapper>
    
  </StyledRequestWrapper>
  
    );
  }
}
export default Request