import React from 'react';
import styled from 'styled-components';

import ArtImage from '../ArtImage';
import LoadingState from '../LoadingState';

const ImageGalleryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 400px;
  margin: 0 -8px;
  margin-bottom: 32px;
`;

export default class ImageGallery extends React.Component {
  renderImages(ids, openModal) {
    return ids.map(function(id, i) {
      return (
        <ArtImage key={i} imgIDSrc={id} openModal={data => openModal(data)} />
      )
    });
  }

  render() {
    const { ids, openModal } = this.props
    return (
      <ImageGalleryWrapper>
        {ids.length ?
          this.renderImages(ids, openModal) :
          <LoadingState />
        }
      </ImageGalleryWrapper>
    )
  }
  
}