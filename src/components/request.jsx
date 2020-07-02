import React from 'react';
import styled from 'styled-components';
import TabButton from './tab_button';
import MethodSelector from './method_selector';
import SendButton from './send_button';
import BodyButton from './body_button';
import HeaderButton from './header_button';
import axios from 'axios';

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

class Request extends React.Component{
constructor(props){
super(props);
this.state = {
value: ''
};

this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event){
this.setState({value: event.target.value});
}

handleSubmit(event){
event.preventDefault();
axios.get(this.state.value)
  .then(res => {
    const data = res.data
    console.log(data)
    this.setState({data})
  })
  .catch((error) => {
  console.log(error)
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
          value={this.state.value}
          onChange={this.handleChange}
          type="text"
          style={{width: "330px"}}/>
      <SendButton type="submit" value="Submit">
        <h3>
        Response: {this.state.value}
        </h3>
      </SendButton>
    </form>
    </StyledUrlBar>
    <MethodSelector/>
    <BodyButton/>
    <HeaderButton/>
    </RequestFrame>
  </StyledRequestWrapper>
  );
  }
  }
export default Request