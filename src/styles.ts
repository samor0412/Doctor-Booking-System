import styled from 'styled-components';
import loadSVG from 'assets/loader.svg';

export const HEADER_ZINDEX = 1;
export const FULL_SCREEN_CONTAINER_ZINDEX = 2;

export const Error = styled.div`
  margin: 4rem;
  font-size: 1.4rem;
  text-align: center;
`;

export const LoaderImg = styled.img.attrs({
  src: loadSVG
})`
  width: 100px;
`;
