import React, {Component} from "react";
import styled from 'styled-components';
import CollectionPopup from "./collection_popup";
import RequestPopup from "./request_popup";
import {Collapse} from "react-collapse";
import classNames from "classnames";
import Files from "react-files";
//import exportFromJSON from 'export-from-json';

const CollectionsFrame = styled.section`
  position: absolute;
  width: 530px;
  height: 370px;
  left: 700px;
  top: -327px;

  background: #EEEAEA;
`;

const StyledCollectionsWrapper = styled.section`
  position: absolute;
  width: 90px;
  height: 21px;
  left: 105px;
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
  width: 170px;
  left: -210px;
  top: 23px;
`;

const StyledImportHeader = styled.h6`
  position: absolute;
  left: 315px;
  top: 5px;
`;

const StyledChooseFile = styled.section`
  position: absolute;
  left: 315px;
  top: 35px;
`;

const StyledExportFile = styled.section`
  position: absolute;
  left: 300px;
  top: 100px;

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
      this.setState({ jsonFile: JSON.parse(event.target.result), fileCollections: this.state.fileCollections.concat(this.state.collectionName)
      }, () => {
        console.log(this.state.jsonFile.info.name);

        let all = this.state.jsonFile;
        let items = all["item"];
    for (const element of items) {
      this.state.requests.push(element["name"]);
      this.state.allMethod.push(element["request"].method)
      this.state.allUrl.push(element["request"].url.raw)

      for (const headerElement of element["request"].header){
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

    this.toggleClass = this.toggleClass.bind(this);
    this.submitPopulate = this.submitPopulate.bind(this);

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

  submitPopulate = ( currentMethod, currentUrl, currentBody, currentHeaderKey, currentHeaderValue) => {

    this.state.methodPopulate = currentMethod
    this.state.urlPopulate = currentUrl
    this.state.bodyPopulate = currentBody
    this.state.headerKeyPopulate = currentHeaderKey
    this.state.headerValuePopulate = currentHeaderValue 

    /*this.setState({
      methodPopulate: currentMethod,
      urlPopulate: currentUrl,
      bodyPopulate: currentBody,
      headerKeyPopulate: currentHeaderKey,
      headerValuePopulate: currentHeaderValue

    })*/

    

    /*this.setState({
      requestPopulate: currentRequest
    })*/

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
    const { activeIndex } = this.state;
    const listRequest = this.state.requests.map((requests, index) =>
      <li>
        <button
        id={index} 
         onClick={currentRequest => this.submitPopulate(this.state.allMethod[index], this.state.allUrl[index], this.state.allBody[index], this.state.allHeaderKey[index], this.state.allHeaderValue[index])}> 
          {requests}
        </button>
      </li>
      )
    
      file = this.state.fileCollections.map((index) => {
        return (
          <li key={index}>
            <div>
              <p>{this.state.jsonFile.info.name}</p>
              <Collapse isOpened={activeIndex === index}>
                <div
                  className={classNames("alert alert-info msg", {
                    show: activeIndex === index,
                    hide: activeIndex !== index
                  })}
                >
                  <ul>
                    {listRequest}
                  </ul>
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

    return (
      <StyledCollectionsWrapper>
        <StyledCollections>
          Collections
        </StyledCollections>
        <CollectionsFrame>
        {/* <pre id="dataJSON">
          what
        </pre> */}
          <button onClick={this.toggleCollectionPopup.bind(this)}>
            Add New Collection
          </button>
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
          <StyledExportFile>
          {/* <label>
              file name:
              <input id="fileName" placeholder="file name"/>
          </label>
          <button onClick="download('json')">download JSON file</button> */}
          </StyledExportFile>
          <ul>{file}</ul>
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
            Save to collections
          </StyledRequestButton>
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
        </CollectionsFrame>
      </StyledCollectionsWrapper>
    );
  }
}

export default Collections