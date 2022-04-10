import React from 'react';
import styled, { css } from 'styled-components';
import { primary, secondary } from '../colors';

export const HEADER_HEIGHT = '6rem';

const StyledButton = styled.button<Props>`
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  border: none;
  border-radius: 0.4rem;
  font-family: Gilroy, 'Noto Sans TC', sans-serif;

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

interface Props {
  buttonType?: 'primary' | 'secondary';
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ buttonType, onClick, children, ...props }) => {
  return (
    <StyledButton buttonType={buttonType} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
