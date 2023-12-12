import { vars } from "@/styles/vars";
import Image from "next/image";
import styled, { css } from "styled-components";

export const Logo = styled(Image)`
  margin: 34px 0px;
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${vars.colors.portGore};
  padding: 0 34px;
  border-radius: 0px 0px 22px 22px;
  max-height: 112px;

  > div {
    height: 112px;
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
    bottom: -1.5px;

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
