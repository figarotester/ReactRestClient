import React from 'react';
import styled from 'styled-components';
import StatusBar from './status';
import BodyButton from './body_button';
import HeaderButton from './header_button';

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
  left: 56px;
  top: 347px;
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

const Response = () =>{
  return(
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
        <HeaderButton/>
      </ResponseFrame>
    </StyledResponseWrapper>
  );
}

export default Response