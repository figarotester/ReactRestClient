import React, {Component} from "react";
import styled from 'styled-components';
import CollectionPopup from "./collection_popup";
import RequestPopup from "./request_popup";
import {DropdownButton, Dropdown} from 'react-bootstrap';

const CollectionsFrame = styled.section`
  position: absolute;
  width: 550px;
  height: 289px;
  left: 700px;
  top: -327px;

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
  left: 930px;
  top: -355px;

  font-family: Roboto;
  font-style: italic;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;

  color: #000000;
`;

const StyledRequestButton = styled.button`
  position: absolute;
  width: 150px;
  left: 395px;
  top: 5px;
`;



class Collections extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      collectionName: '',
      requestName: '',
      collections: [],
      requests: [],
      showCollectionPopup: false,
      showRequestPopup: false
    };
  }

  toggleCollectionPopup = () => {
    this.setState({
      showCollectionPopup: !this.state.showCollectionPopup
    });
  }

  toggleRequestPopup = () => {
    this.setState({
      showRequestPopup: !this.state.showRequestPopup
    });
  }

  handleChangeCollection = (event) => {
    this.setState({collectionName: event.target.value})
  }

  handleChangeRequest = (event) => {
    this.setState({requestName: event.target.value})
  }


  handleAddCollection = () => {
    this.setState({
      collections: this.state.collections.concat(this.state.collectionName)
      
    })
  }

  handleAddRequest = () => {
    this.setState({
      requests: this.state.collections.push(this.state.requestName)
    })
  }

  render() {
    return (
      <StyledCollectionsWrapper>
        <StyledCollections>
          Collections
        </StyledCollections>
        <CollectionsFrame>
          <button onClick={this.toggleCollectionPopup.bind(this)}>
            Add New Collection
          </button>
          <ul>
            {this.state.collections.map( (key) => (
            <li>
              <DropdownButton title={key}>
                <Dropdown.Item>
                  {this.state.requestName}
                </Dropdown.Item>

              </DropdownButton>
            </li>
            ))}
          </ul>
          {this.state.showCollectionPopup ?
            <CollectionPopup
              text='New Collection'
              closePopup={this.toggleCollectionPopup.bind(this)}
              saveCollection={this.handleAddCollection}
              collectionText={this.handleChangeCollection}/>
            : null
          }
          <StyledRequestButton onClick={this.toggleRequestPopup.bind(this)}>
            Add New Request
          </StyledRequestButton>
          {this.state.showRequestPopup ?
            <RequestPopup
              text='New Request'
              closePopup={this.toggleRequestPopup.bind(this)}
              saveRequest={this.handleAddRequest}
              requestText={this.handleChangeRequest}
              collectionFolder={this.state.collectionName}
              collectionItem={this.state.collections}/>
            : null
          }
        </CollectionsFrame>
      </StyledCollectionsWrapper>
    );
  }
}

export default Collections