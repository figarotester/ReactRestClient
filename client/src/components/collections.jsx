import React, {Component} from "react";
import styled from 'styled-components';
import CollectionPopup from "./collection_popup";
import RequestPopup from "./request_popup";
import {Collapse} from "react-collapse";
import classNames from "classnames";

const CollectionsFrame = styled.section`
  position: absolute;
  width: 550px;
  height: 370px;
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
      showCollectionPopup: false,
      showRequestPopup: false,
      activeIndex: null
    };

    this.toggleClass = this.toggleClass.bind(this);
  }

  toggleClass = (index) => {
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index
    })
  }

  moreLess = (index) => {
    if (this.state.activeIndex === index) {
      return (
        <span>
          <i className="angle up"/> Hide requests
        </span>
      );
    } else {
      return (
        <span>
          <i className="angle down"/> Show requests
        </span>
      );
    }
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
      requestName: this.state.requestName
    })
  }

  render() {
    let content;
    const { activeIndex } = this.state;
    if (this.props.loading) {
      content = "Loading...";
    } else {
      content = this.state.collections.map((index) => {
        return (
          <li key={index}>
            <div>
              <p>{index}</p>
              <Collapse isOpened={activeIndex === index}>
                <div
                  className={classNames("alert alert-info msg", {
                    show: activeIndex === index,
                    hide: activeIndex !== index
                  })}
                >
                  <button>
                    {this.state.requestName}
                  </button>
                </div>
              </Collapse>
              <button
                className="btn btn-primary btn-xs"
                onClick={this.toggleClass.bind(this, index)}
              >
                {this.moreLess(index)}
              </button>
            </div>
          </li>
        );
      });
    }
    return (
      <StyledCollectionsWrapper>
        <StyledCollections>
          Collections
        </StyledCollections>
        <CollectionsFrame>
          <button onClick={this.toggleCollectionPopup.bind(this)}>
            Add New Collection
          </button>
          <ul>{content}</ul>
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