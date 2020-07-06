import React from 'react';
import styled from 'styled-components';


const StyledHeaderButton = styled.button`
  position: absolute;
  width: 90px;
  height: 23px;
  left: 350px;
  top: 104px;
`;

const HeaderButton = () =>{
  return(
    <StyledHeaderButton>Header</StyledHeaderButton>
  );
}

export default HeaderButton