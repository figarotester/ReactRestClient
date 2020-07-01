import React from 'react';
import styled from 'styled-components';

const StyledTab = styled.div`
position: absolute;
width: 224px;
height: 21px;
left: 141px;
top: 20px;
`;

const Tab = () => {
  return(
    <StyledTab>
      <Tab eventKey="get" title="GET"/>
    </StyledTab>
  );
};

export default Tab