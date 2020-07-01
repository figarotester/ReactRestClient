import React from 'react';
import styled from 'styled-components';

const StyledStatusBar = styled.div`
  position: absolute;
  width: 150px;
  height: 20px;
  left: 9px;
  top: 24px;

  background: white;
`;

const StatusBar = () =>{
  return(
    <StyledStatusBar>
      (waiting for request)
    </StyledStatusBar>
  );
}

export default StatusBar