import React from 'react';
import styled from 'styled-components';
import UrlBar from './url_bar';
import TabButton from './tab_button';
import MethodSelector from './method_selector';
import SendButton from './send_button';
import BodyButton from './body_button';
import HeaderButton from './header_button';

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

const Request = () =>{
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
        <UrlBar/>
        <SendButton/>
        <MethodSelector/>
        <BodyButton/>
        <HeaderButton/>
      </RequestFrame>
    </StyledRequestWrapper>
  );
}

export default Request