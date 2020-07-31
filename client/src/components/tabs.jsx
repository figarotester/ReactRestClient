import React, {Component} from "react";
import uuid from "react-uuid";
import styled from 'styled-components';
import "../styles.css";

const StyledDeleteTabButton = styled.button`
  position: absolute;
  left: -75px;
  top: 170px;
`;

const StyledAddTabButton = styled.button`
  position: absolute;
  left: -75px;
  top: 200px;
`;

class Tabs extends Component {
  state = {
  tabs: [
    {id: 1, name: "Tab1"}
  ],
  currentTab: { id: 1, name: "Tab1"},
  editMode: false,
  editTabNameMode: false
  };

  handleDoubleClick = () => {
    this.setState({
      editTabNameMode: true
    });
  };
  handleEditTabName = e => {
    const { currentTab, tabs } = this.state;
    const updatedTabs = tabs.map(tab => {
    if (tab.id === currentTab.id) {
      return {
        ...tab,
        name: e.target.value
      };
    } else {
        return tab;
      }
    });
    this.setState({
      tabs: updatedTabs,
      currentTab: {
      ...currentTab,
      name: e.target.value
      }
    });
  };

  handleOnBlur = () => {
    this.setState({
      editTabNameMode: false
    });
  };
  createTabs = () => {
    const { tabs, currentTab, editTabNameMode } = this.state;
    const allTabs = tabs.map(tab => {
      return (
        <li>
          {editTabNameMode && currentTab.id === tab.id ? (
            <input
              value={tab.name}
              onBlur={this.handleOnBlur}
              onChange={this.handleEditTabName}/>) : (
            <button
              className={currentTab.id === tab.id ? "tab active" : "tab"}
              onClick={() => this.handleSelectTab(tab)}
              onDoubleClick={() => this.handleDoubleClick(tab)}>
              {tab.name}
            </button>
          )}
        </li>
      );
    });
    return <ul className="nav nav-tabs">{allTabs}</ul>;
  };
  handleSelectTab = tab => {
    this.setState({
      currentTab: tab,
      editMode: false,
      editTabNameMode: false
    });
  };
  handleAddTab = () => {
    const { tabs } = this.state;
    const newTabObject = {
      id: uuid(),
      name: `Tab ${tabs.length + 1}`,
    };
    this.setState({
      tabs: [...tabs, newTabObject],
      currentTab: newTabObject,
      editMode: false,
      editTabNameMode: false
    });
  };
  handleDeleteTab = tabToDelete => {
    const { tabs } = this.state;
    const tabToDeleteIndex = tabs.findIndex(tab => tab.id === tabToDelete.id);
    const updatedTabs = tabs.filter((tab, index) => {
      return index !== tabToDeleteIndex;
    });
    const previousTab =
    tabs[tabToDeleteIndex - 1] || tabs[tabToDeleteIndex + 1] || {};
    this.setState({
      tabs: updatedTabs,
      editMode: false,
      editTabNameMode: false,
      currentTab: previousTab
    });
  };
  setEditMode = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  render() {
    const { currentTab, editMode } = this.state;
    return (
      <div className="container">
        <div className="well">
          <StyledAddTabButton className="add-tab-button" onClick={this.handleAddTab} style={{color: 'white'}}>
            <i className="text-primary fas fa-plus-square" /> + Add Tab
          </StyledAddTabButton>
          {this.createTabs()}
          <div className="tab-content">
            {editMode ? 
            <div>
              <textarea
                onChange={this.handleContentChange}
                value={this.state.currentTab.content}/>
              <button className="save-button" onClick={this.setEditMode}>
                Done
              </button>
            </div>
             : (
            <div>
              <p>{currentTab.content}</p>
              {currentTab.id ? (
              <div
                style={{ display: "flex", justifyContent: "space-between" }}>
              <StyledDeleteTabButton className="add-tab-button" style={{color: 'white'}} onClick={() => this.handleDeleteTab(currentTab)}>
                Delete Tab
              </StyledDeleteTabButton>
            </div>
            ) : (
              ""
          )}
            </div>
          )}
          </div>
        </div>
      </div>
    );
  }
}

export default Tabs