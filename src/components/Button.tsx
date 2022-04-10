import React from 'react';
import styled, { css } from 'styled-components';
import { LoaderImg } from 'styles';
import { primary, secondary } from '../colors';

export const HEADER_HEIGHT = '6rem';

const StyledButton = styled.button<Props>`
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  border: none;
  border-radius: 0.4rem;
  font-family: Gilroy, 'Noto Sans TC', sans-serif;

  :disabled,
  :hover:disabled {
    background-color: #cbcbcb;
    color: grey;
    cursor: default;
    opacity: 1;
  }

  ${({ buttonType }) => {
    switch (buttonType) {
      case 'primary':
        return css`
          background: ${primary};
          color: white;

          &:hover {
            opacity: 0.6;
          }
        `;
      case 'secondary':
        return css`
          background: white;
          border: solid 1px ${secondary};
          color: ${secondary};

          &:hover {
            background: ${secondary};
            color: white;
          }
        `;

      default:
        return css`
          background: black;
          border: solid 1px black;
          color: white;

          &:hover {
            background: white;
            color: black;
          }
        `;
    }
  }}
`;

const StyledLoadingImg = styled(LoaderImg)`
  height: 2rem;
`;

interface Props {
  buttonType?: 'primary' | 'secondary';
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ buttonType, onClick, children, isLoading, ...props }) => {
  return (
    <StyledButton buttonType={buttonType} onClick={onClick} {...props}>
      {isLoading ? <StyledLoadingImg /> : children}
    </StyledButton>
  );
};

export default Button;
