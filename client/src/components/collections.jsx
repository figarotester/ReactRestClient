import React, {Component} from "react";
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
  constructor() {
    super();
    this.state = {
      name: "",
      collections: [{ name: "" }]
    };
  }

  handleCollectionNameChange = idx => event => {
    const newCollections = this.state.collections.map((collection, cidx) => {
      if (idx !== cidx) return collection;
      return { ...collection, name: event.target.value };
    });

    this.setState({ collections: newCollections });
  };

  handleAddCollection = () => {
    this.setState({
      collections: this.state.collections.concat([{ name: "" }])
    });
  };

  handleRemoveCollection = idx => () => {
    this.setState({
      collections: this.state.collections.filter((c, cidx) => idx !== cidx)
    });
  };

  render() {
    return (
      <StyledCollectionsWrapper>
        <StyledCollections>
          Collections
        </StyledCollections>
        <CollectionsFrame>
          <form onSubmit={this.handleSubmit}>
            {this.state.collections.map((collection, idx) => (
              <div className="collection">
                <input
                  type="text"
                  placeholder={`Collection #${idx + 1} name`}
                  value={collection.name}
                  onChange={this.handleCollectionNameChange(idx)}
                />
                <button type="button" onClick={this.handleRemoveCollection(idx)} className="small">
                  delete
                </button>
              </div>
            ))}
            <button type="button" onClick={this.handleAddCollection} className="small">
              Add New Collection
            </button>
          </form>
        </CollectionsFrame>
      </StyledCollectionsWrapper>
    );
  }
}

export default Collections