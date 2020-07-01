import React from 'react';
import styled from 'styled-components';


const StyledSendButton = styled.button`
  position: absolute;
  width: 120px;
  height: 31px;
  left: 500px;
  top: 21px;

  background: #11F35E;
`;

const SendButton = () =>{
  return(
    <StyledSendButton>Send</StyledSendButton>
  )
};

export default SendButton