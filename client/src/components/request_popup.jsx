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

const StyledNewRequest = styled.section`
  position: absolute;
  height: 21px;
  left: 215px;
  top: 0px;
`;

const StyledRequestName = styled.section`
  position: absolute;
  height: 21px;
  left: 280px;
  top: 60px;
`;

const StyledNewCollection = styled.section`
  position: absolute;
  height: 21px;
  left: 275px;
  top: 100px;
`;

const StyledCollectionSelector = styled.div`
  position: absolute;
  width: 600px;
  height: 200px;
  left: 285px;
  top: 160px;
`;

class RequestPopup extends Component {
  constructor(props){
    super(props);
    this.state = {
    collection: ''
    };
  }

  handleSelectCollection = (event) => {
    this.setState({collection: event.target.value});
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <StyledNewRequest>
          <h1>{this.props.text}</h1>
          </StyledNewRequest>
          <StyledRequestName>
            <input 
              type="text"
              placeholder="Request Name"
              onChange={this.props.requestText}/>
          </StyledRequestName>
          <StyledNewCollection>
            <h1>Collection</h1>
          </StyledNewCollection>
          <StyledCollectionSelector>
            <select onChange={this.handleSelectCollection} value={this.state.collection}>
              <option defaultValue="select">Select Collection</option>
              <option value={this.props.collectionItem}>{this.props.collectionItem}</option>
            </select>
          </StyledCollectionSelector>
          <StyledCancelButton onClick={this.props.closePopup}>
            Cancel
          </StyledCancelButton>
          <StyledSaveButton onClick={this.props.saveRequest}>
            Save
          </StyledSaveButton>
        </div>
      </div>
    );
  }
}

export default RequestPopup;