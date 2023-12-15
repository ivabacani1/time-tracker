import styled, { css } from "styled-components";

export const Flex = styled.div<{
  $column?: boolean;
  $gap?: number;
  $justifyContent?:
    | "start"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "flex-end";
  $alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
}>`
  display: flex;

  ${({ $column }) =>
    $column &&
    css`
      flex-direction: column;
    `}
  ${({ $gap }) =>
    $gap &&
    css`
      gap: ${$gap}px;
    `}
    ${({ $justifyContent }) =>
    $justifyContent &&
    css`
      justify-content: ${$justifyContent};
    `}
    ${({ $alignItems }) =>
    $alignItems &&
    css`
      align-items: ${$alignItems};
    `};
`;
