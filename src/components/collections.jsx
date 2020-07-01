import React from 'react';
import styled from 'styled-components';


const CollectionsFrame = styled.section`

  position: absolute;
  width: 350px;
  height: 289px;
  left: 850px;
  top: -280px;

  background: #EEEAEA;

  `;

  const StyledCollectionsWrapper = styled.section`
  position: absolute;
  width: 90px;
  height: 21px;
  left: 56px;
  top: 347px;
  
`;

const StyledCollections = styled.h1`
  position: absolute;
  width: 90px;
  height: 21px;
  left: 850px;
  top: -310px;

  font-family: Roboto;
  font-style: italic;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;


  color: #000000;

`;

  const Collections = () =>{
    return(
      <StyledCollectionsWrapper>
        <StyledCollections>
          Collections
        </StyledCollections>
        <CollectionsFrame>
        </CollectionsFrame>
    </StyledCollectionsWrapper>
    )
    
  }

  export default Collections