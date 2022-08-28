import styled, { css } from "styled-components";

type ButtonProps = {
  variant?: "primary" | "secondary";
  width?: string;
  height?: string;
};

const variantStyles = (variant = "primary") =>
  ({
    primary: css`
      color: ${(props) => props.theme.white};
      background: ${(props) => props.theme.green500};
      border: 1px solid ${(props) => props.theme.green600};

      &:hover {
        background: ${(props) => props.theme.green600};
        border: 1px solid ${(props) => props.theme.green500};
      }
    `,
    secondary: css`
      color: ${(props) => props.theme.gray600};
      background: ${(props) => props.theme.white};
      border: 1px solid ${(props) => props.theme.gray100};
    `,
  }[variant]);

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  width: ${({ width = "149px" }) => width};
  height: ${({ height = "56px" }) => height};
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  border-radius: 8px;
  border: none;
  box-shadow: 0px 8px 4px rgba(13, 17, 27, 0.08);
  transition: all 0.2s;

  ${({ variant }) => variantStyles(variant)}

  &:active {
    transform: translateY(1.5px);
  }

  &:disabled {
    background-color: ${(props) => props.theme.gray200};
  }
`;
