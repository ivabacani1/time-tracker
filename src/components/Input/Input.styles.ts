import { vars } from "@/styles/vars";
import styled, { css } from "styled-components";

export const InputContainer = styled.div`
  width: 100%;
  .p-inputtext {
    width: 100%;
    border-radius: 3px;
    &:focus,
    &:hover {
      box-shadow: none;
      border: 1px solid ${vars.colors.orange};
    }
  }

  .p-password {
    width: 100%;
    &:focus {
      box-shadow: none;
      border: 1px solid ${vars.colors.portGore};
    }
  }

  > small {
    color: red;
    font-size: 12px;
  }
`;
