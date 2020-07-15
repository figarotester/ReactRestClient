import React, {Component} from 'react';
import styled from 'styled-components';


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

class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      responseName: ''
     }
  }

  handleChange = (event) => {
    this.setState({name: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      responseName: this.state.name
    })

  }

  render() { 
    return ( 
      <StyledCollectionsWrapper>
        <StyledCollections>
          Collections
        </StyledCollections>
        <CollectionsFrame>
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              value={this.state.name}  
              onChange={this.handleChange}
              placeholder="New collection"/>
            <input type="submit" value="Add"/>
          </form>
          <br/>
          <p>{this.state.responseName}</p>
        </CollectionsFrame>
      </StyledCollectionsWrapper>
      
     );
  }
}
 
export default Collections;
