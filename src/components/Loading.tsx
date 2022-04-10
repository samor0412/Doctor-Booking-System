import React from 'react';
import styled from 'styled-components';
import { LoaderImg } from 'styles';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

interface Props {
  isLoading?: boolean;
  children: React.ReactNode;
}

const LoadingOverlay: React.FC<Props> = ({ isLoading, children }) => (
  <>
    {isLoading ? (
      <LoaderContainer>
        <LoaderImg />
      </LoaderContainer>
    ) : (
      children
    )}
  </>
);

export default LoadingOverlay;
