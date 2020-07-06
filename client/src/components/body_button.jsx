import React from 'react';
import styled from 'styled-components';

const StyledBodyButton = styled.button`
  position: absolute;
  width: 90px;
  height: 23px;
  left: 110px;
  top: 104px;
`;

const BodyButton = () =>{
  return(
    <StyledBodyButton>Body</StyledBodyButton>
  );
}

export default BodyButton