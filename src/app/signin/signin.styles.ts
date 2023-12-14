import { RegisterUserIcon } from "@/components/shared/icons";
import { vars } from "@/styles/vars";
import { Card } from "primereact/card";
import styled from "styled-components";

import Link from "next/link";

export const RegisterHereCard = styled(Card)`
  width: 400px;
  overflow: hidden;

  .p-card-body {
    padding-top: 32px;
  }
`;
export const RegisterUser = styled(RegisterUserIcon)`
  position: relative;
  bottom: 10px;
`;

export const Text = styled.p`
  color: ${vars.colors.lynch};
  font-weight: 600;
`;

export const StyledLink = styled(Link)`
  font-size: 14px;
  top: -6px;
  position: relative;
`;
