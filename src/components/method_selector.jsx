import React from 'react';
import styled from 'styled-components';

const StyledMethodSelector = styled.div`
position: absolute;
width: 94px;
height: 20px;
left: 9px;
top: 24px;
`;

const MethodSelector = () => {
  return(
    <StyledMethodSelector>
      <select>
      <option selected value="get">GET</option>
      <option value="post">POST</option>
      <option value="put">PUT</option>
      <option value="delete">DELETE</option>
    </select>
    </StyledMethodSelector>
  );
};

export default MethodSelector