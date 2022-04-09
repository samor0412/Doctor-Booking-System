import React from 'react';
import styled from 'styled-components';
import { secondary } from '../colors';
import { HEADER_ZINDEX } from 'styles';

export const HEADER_HEIGHT = '6rem';

const Container = styled.div`
  position: fixed;
  background-color: ${secondary};
  display: flex;
  top: 0;
  align-items: center;
  width: 100vw;
  height: ${HEADER_HEIGHT};
  padding: 0 2rem;
  z-index: ${HEADER_ZINDEX};
`;

const Title = styled.h2`
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
`;

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;
