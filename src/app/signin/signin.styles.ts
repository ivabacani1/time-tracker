import { Flex } from "@/components/shared/Flex/Flex.styles";
import { RegisterUserIcon } from "@/components/shared/icons";
import { vars } from "@/styles/vars";
import { Card } from "primereact/card";
import styled, { css } from "styled-components";

export const Form = styled.form`
  span {
    width: 100%;
  }

  .p-button {
    margin-top: 20px;
    width: 100%;
    background: ${vars.colors.orange};
    text-align: center;
    display: flex;
    justify-content: center;
  }
`;

export const SignInCardContainer = styled(Card)`
  width: 400px;

  .p-card-body {
    padding: 44px 35px 60px;
  }

  .p-card-title {
    font-size: 24px;
    color: ${vars.colors.ebony};
    display: flex;
    justify-content: center;
  }
`;

export const SignInContainer = styled(Flex)`
  margin-top: 70px;
`;

export const RegisterHereCard = styled(Card)`
  overflow: hidden;

  .p-card-body {
    padding-top: 32px;
  }
`;
export const RegisterUser = styled(RegisterUserIcon)`
  position: relative;
  bottom: 10px;
`;
