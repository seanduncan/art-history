import React from 'react';
import styled from 'styled-components';

import LoadingState from '../LoadingState';
import { ajaxGet, media } from '../../utilities';

const ArtImageWrapper = styled.button`
  background: white;
  padding: 0;
  margin: 0 8px;
  margin-bottom: 16px;
  width: 100%;
  ${media.small`
    width: calc(50% - 16px);
  `}
  ${media.medium`
    width: calc(33.33% - 16px);
  `}
  ${media.large`
    width: calc(25% - 16px);
  `}
  border: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: box-shadow 0.15s ease-in-out;
  align-self: flex-start;
  text-align: left;
  cursor: pointer;
  border-radius: 2px;
  overflow: hidden;
  &:hover, &:focus {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 220px;
  background: #EBEDEF;
  object-fit: cover;
`;

const ImageWrap = styled.div`
  position: relative;
  font-size: 0;
`

const ImageTitle = styled.h3`
  min-height: 18px;
  font-size: 1rem;
  font-weight: 400;
  color: #6D6E6F;
  padding: 0 8px;
  margin: 8px 0;
`;

export default class ArtImage extends React.Component {
  constructor() {
    super();
    this.state = {
      imageResults: '',
      imageLoading: true
    };
  }

  componentDidMount(props) {
    ajaxGet(`https://appsheettest1.azurewebsites.net/sample/art/${this.props.imgIDSrc}`)
      .then(JSON.parse)
      .then((r) => {
        this.setState({
          imageResults: r
        });
      })
      .catch(function(error) { console.error(error); });
  }

  imageLoaded() {
    this.setState({
      imageLoading: false
    });
  }

  render() {
    const {openModal} = this.props;
    return (
      <ArtImageWrapper onClick={() => openModal(this.state.imageResults)}>
        <ImageWrap>
          <Image onLoad={this.imageLoaded.bind(this)} src={this.state.imageResults.thumbnailUrl} />
          {this.state.imageLoading && <LoadingState /> }
        </ImageWrap>
        <ImageTitle>{this.state.imageResults.title}</ImageTitle>
        
      </ArtImageWrapper>
    )
  }
  
}