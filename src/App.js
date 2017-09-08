import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import { ajaxGet } from './utilities';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';

const LoadMoreButton = styled.button`
  display: flex;
  background-color: white;
  padding: 8px 16px;
  margin: 0 auto;
  font-size: 1rem;
  font-weight: 700;
  border: none;  
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-radius: 2px;
  transition: box-shadow 0.15s ease-in-out;
  cursor: pointer;
  &:hover, &:focus {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
  &:disabled {
    box-shadow: none;
  }
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      imageIDs: [],
      modalData: {},
      modalOpen: false,
      loading: false
    };
  }

  componentDidMount() {
    this.setUpIDFetch();
  }

  setUpIDFetch = () => {
    this.setState({
      loading: true
    }, this.getIDs());
  }

  getIDs = () => {
    const {imageIDs} = this.state;
    const startAfter = (imageIDs.length) ? `/?startafter=${imageIDs[imageIDs.length - 1]}` : '';
    ajaxGet(`https://appsheettest1.azurewebsites.net/sample/art${startAfter}`)
      .then(JSON.parse)
      .then((r) => {
        this.setState({
          imageIDs: this.state.imageIDs.concat(r),
          loading: false
        });
      })
      .catch(function(error) { console.error(error); });
  }

  openModal = (data) => {
    this.setState({
      modalData: data,
      modalOpen: true
    });
  }

  closeModal = () => {
    this.setState({
      modalOpen: false
    });
  }

  render() {
    const buttonText = (this.state.loading) ? 'Loading' : 'More Results';
    return (
      <div className="App">
        <header>
          <h1>Art</h1>          
        </header>
        <ImageGallery ids={this.state.imageIDs} openModal={this.openModal} />
        <LoadMoreButton disabled={this.state.loading} onClick={this.setUpIDFetch}>{buttonText}</LoadMoreButton>
        { this.state.modalOpen && <Modal data={this.state.modalData} closeModal={this.closeModal} /> }
      </div>
    );
  }
}

export default App;
