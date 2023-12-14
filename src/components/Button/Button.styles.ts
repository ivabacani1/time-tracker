import styled, { css } from "styled-components";

export const Button = styled.div<{ $color?: string; $fullWidth?: boolean }>`
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  .p-button {
    height: 36px;
    ${({ $fullWidth }) =>
      $fullWidth &&
      css`
        width: 100%;
      `}
    ${({ $color }) =>
      $color &&
      css`
        background: ${$color};
        border-color: ${$color};
      `}
  }

  svg {
    margin-right: 8px;
  }
`;
