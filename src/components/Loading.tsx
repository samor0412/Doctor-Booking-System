import React from 'react';
import loadSVG from 'assets/loader.svg';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;
const LoaderImg = styled.img.attrs({
  src: loadSVG
})`
  width: 100px;
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
