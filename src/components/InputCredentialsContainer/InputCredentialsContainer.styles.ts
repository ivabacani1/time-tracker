import { Flex } from "@/components/shared/Flex/Flex.styles";

import { Card } from "primereact/card";
import styled from "styled-components";

export const Form = styled.form`
  margin-top: 45px;
  span {
    width: 100%;
  }

  .p-button {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
  }
`;

export const CardContainer = styled(Card)`
  width: 400px;

  .p-card-body {
    padding: 44px 35px 60px;
  }
`;

export const Container = styled(Flex)`
  margin-top: 70px;
`;
