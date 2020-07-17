import React, {Component} from 'react';
import '../style.css';
import styled from 'styled-components';

const StyledCancelButton = styled.button`
  position: absolute;
  width: 90px;
  left: 480px;
  top: 325px;
`;

const StyledSaveButton = styled.button`
  position: absolute;
  width: 90px;
  left: 610px;
  top: 325px;
`;

const StyledNewCollection = styled.section`
  position: absolute;
  height: 21px;
  left: 230px;
  top: 50px;
`;

const StyledCollectionName = styled.section`
  position: absolute;
  height: 21px;
  left: 275px;
  top: 130px;
`;

class CollectionPopup extends Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <StyledNewCollection>
          <h1>{this.props.text}</h1>
          </StyledNewCollection>
          <StyledCollectionName>
            <input 
              type="text"
              placeholder="Collection Name"
              onChange={this.props.collectionText}/>
          </StyledCollectionName>
          <StyledCancelButton onClick={this.props.closePopup}>
            Cancel
          </StyledCancelButton>
          <StyledSaveButton onClick={this.props.saveCollection}>
            Save
          </StyledSaveButton>
        </div>
      </div>
    );
  }
}

export default CollectionPopup;