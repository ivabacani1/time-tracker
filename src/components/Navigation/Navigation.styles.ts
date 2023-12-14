import { vars } from "@/styles/vars";
import styled, { css } from "styled-components";
import { Flex } from "../shared/Flex/Flex.styles";
import Link from "next/link";

export const Title = styled(Flex)`
  color: ${vars.colors.whiteLilac};
  font-size: 24px;
  font-weight: 700;
  padding-top: 8px;
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${vars.colors.portGore};
  padding: 0 34px;
  border-radius: 0px 0px 22px 22px;
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  .p-button {
    max-width: 92px;
    padding: 0;
  }
`;

export const NavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  padding-top: 10px;

  .p-button-label {
    display: flex;
    margin-top: 4px;
  }
  .p-button {
    height: 100%;
    width: 100%;
    background: ${vars.colors.portGore};
    border: none;
    font-size: 15px;
    color: ${vars.colors.ghost};

    svg {
      margin-right: 8px;
      width: 24px;
      height: 24px;
      bottom: 0;
      path {
        stroke: ${vars.colors.ghost};
      }
    }

    &:focus,
    &:hover {
      box-shadow: none;
      color: ${vars.colors.whiteLilac};
      svg {
        path {
          stroke: ${vars.colors.whiteLilac};
        }
      }
    }

    ${({ $active }) =>
      $active &&
      css`
        box-shadow: none;
        color: ${vars.colors.whiteLilac};
        svg {
          path {
            stroke: ${vars.colors.whiteLilac};
          }
        }
      `}
  }

  svg {
    position: relative;
    height: 5px;
    bottom: -28px;

    path {
      fill: ${vars.colors.ghost};
    }
  }

  ${({ $active }) =>
    $active &&
    css`
      svg {
        path {
          fill: ${vars.colors.orange};
        }
      }
    `}
`;
