import React from 'react';
import styled from 'styled-components';
import { FULL_SCREEN_CONTAINER_ZINDEX } from 'styles';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${FULL_SCREEN_CONTAINER_ZINDEX};
`;

export const FullScreenMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  opacity: 0.6;
  z-index: -1;
`;

const ContentContainer = styled.div`
  padding: 2rem;
  background: #ffffff;
  border-radius: 0.6rem;
`;

const Popover: React.FC = ({ children }) => {
  return (
    <Container>
      <FullScreenMask />
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
};

export default Popover;
