import React from 'react';
import styled from 'styled-components';

const StyledUrlBar = styled.div`
  position: absolute;
  left: 110px;
  top: 23px;
`;

const UrlBar = () =>{
  return(
    <StyledUrlBar>
      <input
        className="inputurl"
        name="url"
        type="text"
        style={{width: "330px"}}/>
    </StyledUrlBar>
  );
}

export default UrlBar