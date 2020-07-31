import React, {Component} from "react";
import styled from 'styled-components';
import CollectionPopup from "./collection_popup";
import RequestPopup from "./request_popup";
import {Collapse} from "react-collapse";
import classNames from "classnames";
import Files from "react-files";

const StyledCollectionsFrame = styled.section`
  position: absolute;
  width: 500px;
  height: 370px;
  left: 700px;
  top: -327px;

  background: rgba(0, 0, 0, 0.50);
`;

const StyledCollectionsWrapper = styled.section`
  position: absolute;
  left: 100px;
  top: 371px;
`;

const StyledCollectionsHeader = styled.h1`
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

  color: white;
`;

const StyledRequestButton = styled.button`
  position: absolute;
  width: 170px;
  left: -210px;
  top: 25px;
`;

const StyledImportHeader = styled.h6`
  position: absolute;
  left: 315px;
  top: 5px;
  font-family: Roboto;
  font-style: italic;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;

  color: white;
`;

const StyledAddCollectionHeader = styled.h6`
  position: absolute;
  left: 20px;
  top: 5px;
  font-family: Roboto;
  font-style: italic;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;

  color: white;
`;

const StyledChooseFile = styled.section`
  position: absolute;
  left: 315px;
  top: 35px;
`;

const StyledCollectionButton = styled.button`
  position: absolute;
  left: 170px;
  top: 5px;
`;

const StyledListCollection = styled.section`
  position: absolute;
  left: -5px;
  top: 35px;
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
      activeUploadIndex: null,
      activeIndex: null,
      methodPopulate: '',
      urlPopulate: '',
      bodyPopulate: '',
      headerKeyPopulate: '',
      headerValuePopulate: '',
      jsonFile: {},
      requests: [],
      allMethod: [],
      allUrl: [],
      allHeaderKey: [],
      allHeaderValue: [],
      allBody: [],
      fileCollections: [],
    };

    this.fileReader = new FileReader();
    this.fileReader.onload = event => {
      this.setState(
        { jsonFile: JSON.parse(event.target.result), 
          fileCollections: this.state.fileCollections.concat(this.state.collectionName)
        }, () =>
        {
          let all = this.state.jsonFile;
          let items = all["item"];

          for (const element of items) {
            this.state.requests.push(element["name"]);
            this.state.allMethod.push(element["request"].method)
            this.state.allUrl.push(element["request"].url.raw)
            for (const headerElement of element["request"].header){
              console.log(headerElement.key)
              this.state.allHeaderKey.push(headerElement.key)
              this.state.allHeaderValue.push(headerElement.value)
            }
          }
          for (const get of this.state.allMethod){
            if (get === "GET"){
              this.state.allBody.push("")
            }
            else{
              for(const element of items){
                if(element["request"].body){
                  this.state.allBody.push(element["request"].body.raw)
                }
              }
            }
          }       
        });
      };

    this.handleToggleRequest = this.handleToggleRequest.bind(this);
    this.handleSubmitPopulate = this.handleSubmitPopulate.bind(this);
  };

  handleToggleRequest = (index) => {
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index
    })
  }

  handleToggleRequestUpload = (index) => {
    this.setState({
      activeUploadIndex: this.state.activeUploadIndex === index ? null : index
    })
  }

  handleShowRequest = (index) => {
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

  moreLessUpload = (index) => {
    if (this.state.activeUploadIndex === index) {
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

  handleAddCollection = (collections) => {
    this.setState({
      collections: this.state.collections.concat(this.state.collectionName)
    });
  }

  handleAddRequest = () => {
    this.setState({
      requestName: this.state.requestName
    });
  }

  handleSubmitPopulate = (currentMethod, currentUrl, currentBody, currentHeaderKey, currentHeaderValue) => {
    this.state.methodPopulate = currentMethod
    this.state.urlPopulate = currentUrl
    this.state.bodyPopulate = currentBody
    this.state.headerKeyPopulate = currentHeaderKey
    this.state.headerValuePopulate = currentHeaderValue 

    const {methodPopulate} = this.state;
    const {urlPopulate} = this.state;
    const {bodyPopulate} = this.state;
    const {headerKeyPopulate} = this.state;
    const {headerValuePopulate} = this.state;
    const {onSubmit} = this.props;

    onSubmit(methodPopulate, urlPopulate, JSON.parse(JSON.stringify(bodyPopulate)), JSON.stringify(headerKeyPopulate), JSON.stringify(headerValuePopulate))
  } 

  render() {
    let file;
    let content;
    const { activeUploadIndex } = this.state;
    const { activeIndex } = this.state;
    const listRequest = this.state.requests.map((requests, index) =>
      <li>
        <button
        id={index} 
         onClick={currentRequest => this.handleSubmitPopulate(this.state.allMethod[index], this.state.allUrl[index], this.state.allBody[index], this.state.allHeaderKey[index], this.state.allHeaderValue[index])}> 
          {requests}
        </button>
      </li>
      )
      file = this.state.fileCollections.map((index) => {
        return (
          <li key={index}>
            <div>
              <p style={{color: 'white'}}>{this.state.jsonFile.info.name}</p>
              <Collapse isOpened={activeUploadIndex === index}>
                <div
                  className={classNames("alert alert-info msg", {
                    show: activeUploadIndex === index,
                    hide: activeUploadIndex !== index
                  })}
                >
                  <ul>
                    {listRequest}
                  </ul>
                </div>
              </Collapse>
              <button
                className="btn btn-primary btn-xs"
                onClick={this.handleToggleRequestUpload.bind(this, index)}
              >
                {this.moreLessUpload(index)}
              </button>
            </div>
          </li>
        );
      }); 
      content = this.state.collections.map((index) => {
        return (
          <li key={index}>
            <div>
              <p style={{color: 'white'}}>{index}</p>
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
                onClick={this.handleToggleRequest.bind(this, index)}
              >
                {this.handleShowRequest(index)}
              </button>
            </div>
          </li>
        );
      });

    return (
      <StyledCollectionsWrapper>
        <StyledCollectionsHeader>
          Collections
        </StyledCollectionsHeader>
        <StyledCollectionsFrame>
          <StyledAddCollectionHeader>
            Add New Collection
          </StyledAddCollectionHeader>
          <StyledCollectionButton onClick={this.toggleCollectionPopup.bind(this)}>
              +
          </StyledCollectionButton>
          <StyledImportHeader>
            Import from JSON
          </StyledImportHeader>
          <StyledChooseFile>
            <Files
              onChange={file => {
                this.fileReader.readAsText(file[0]);
              }}
              onError={err => console.log(err)}
              accepts={[".json"]}
              multiple
              maxFiles={3}
              maxFileSize={10000000}
              minFileSize={0}
              clickable
              >
              <button>Upload</button>
            </Files>
          </StyledChooseFile>
          <StyledListCollection>
            <ul>{file}</ul>
            <ul>{content}</ul>
          </StyledListCollection>
          <StyledRequestButton onClick={this.toggleRequestPopup.bind(this)}>
            Save to collections
          </StyledRequestButton>
          {this.state.showCollectionPopup ?
          <CollectionPopup
            text='New Collection'
            closePopup={this.toggleCollectionPopup.bind(this)}
            saveCollection={this.handleAddCollection}
            collectionText={this.handleChangeCollection}/>
            : null
          }
          {this.state.showRequestPopup ?
          <RequestPopup
            text='Save Request As..'
            closePopup={this.toggleRequestPopup.bind(this)}
            saveRequest={this.handleAddRequest}
            requestText={this.handleChangeRequest}
            collectionFolder={this.state.collectionName}
            collectionItem={this.state.collections}/>
            : null
          }
        </StyledCollectionsFrame>
      </StyledCollectionsWrapper>
    );
  }
}

export default Collections