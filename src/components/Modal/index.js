import React from 'react';
import styled from 'styled-components';

import LoadingState from '../LoadingState';
import { media } from '../../utilities';

const ModalBackground = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 16px 0;
  background: rgba(0,0,0,0.6);
  box-sizing: border-box;
`;

const ModalWrapper = styled.div`
  background: white;
  max-height: 100%;
  padding: 32px;
  margin: 32px;
  width: 100%;
  max-width: 424px;
  border-radius: 8px;
  overflow: auto;
  box-sizing: border-box;
`;

const CloseButton = styled.button`
  position: absolute;
  overflow: auto;
  top: 2px;
  right: 0px;
  ${media.medium`
    top: 30px;
    right: 32px;
    font-size: 5.0625rem;    
  `}
  color: white;
  background: transparent;
  font-size: 3.25rem;
  border: none;
  overflow: hidden;
  line-height: 48px;
  padding: 0;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const FullImage = styled.img`
  width: 100%;
  background: #EBEDEF;
  min-height: 80px;
`;

const TitleText = styled.h2`
  margin: 0;
  font-size: 2.25rem;
  font-weight: 900;
`;

const Text = styled.p`
  line-height: 16px;
  margin: 8px 0;
`;

const Label = styled.span`
  display: block;
  font-size: 0.625rem;
  text-transform: uppercase;
  font-style: italic;
  color: #6D6E6F;
`;

export default class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      imageLoading: true
    };
  }

  imageLoaded() {
    this.setState({
      imageLoading: false
    });
  }

  render() {
    const { data, closeModal } = this.props
    return (
      <ModalBackground>
        <ModalWrapper>
          <ImageWrapper>
            <FullImage onLoad={this.imageLoaded.bind(this)} src={data.url} />
            {this.state.imageLoading && <LoadingState /> }
          </ImageWrapper>
          <TitleText>{data.title}</TitleText>
          <Text><Label>Artist:</Label> {data.artist}</Text>
          <Text><Label>Year:</Label> {data.year}</Text>
          <Text><Label>Medium:</Label> {data.medium}</Text>
          <Text><Label>Dimensions:</Label> {data.width} x {data.height} {data.units}</Text>
          
        </ModalWrapper>
        <CloseButton onClick={() => closeModal()}>&#215;</CloseButton>
      </ModalBackground>
    )
  }
  
}