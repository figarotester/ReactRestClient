import React from 'react';
import styled from 'styled-components';

const StyledLandPage = styled.div`
  width: 100%;
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }
  p {
    text-align: center;
    
  }
  .tiny {
    font-size: 0.5rem;
  }
`;

const Welcome = () => (
  <StyledLandPage>
    <div>
      <h1>Welcome!</h1>
      <p>Drop-in replacement for Postman.</p>
    </div>
    <img src={require("../static/background.jpg")}
      alt="Created by photoshopessentials.com"/>
    <div className="tiny">"Created by photoshopessentials.com"</div>
  </StyledLandPage>
);

export default Welcome;