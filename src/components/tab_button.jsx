import React from 'react';
import styled, {css} from 'styled-components';


const StyledTabButton = styled.button`
  position: absolute;
  width: 38px;
  height: 25px;
  left: 360px;
  top: 16px;
  background: transparent;
  
  border: 2px solid black;
  color: black;
 
  ${props => props.primary && css`
    background: black;
    color: white;
  `}
`;

const TabButton = () =>{
  return(
    <StyledTabButton>+</StyledTabButton>
  )
};

export default TabButton