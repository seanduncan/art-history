import React from 'react';
import styled, {keyframes} from 'styled-components';

const Spinner = styled.div`
  width: 40px;
  height: 40px;

  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const bounce = keyframes`
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
`

const DoubleBounceOne = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  
  -webkit-animation: ${bounce} 2.0s infinite ease-in-out;
  animation: ${bounce} 2.0s infinite ease-in-out;
`;

const DoubleBounceTwo = styled(DoubleBounceOne)`
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
`

const LoadingState = () => (
  <Spinner>
    <DoubleBounceOne></DoubleBounceOne>
    <DoubleBounceTwo></DoubleBounceTwo>
  </Spinner>
);

export default LoadingState;