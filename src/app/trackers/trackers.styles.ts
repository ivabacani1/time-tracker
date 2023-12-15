import { Flex } from "@/components/shared/Flex/Flex.styles";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";

export const Buttons = styled(Flex)`
  padding-top: 86px;
  padding-bottom: 36px;
  width: 80vw;
`;

export const Table = styled(DataTable)`
  .p-datatable-wrapper {
    min-height: 43vh;
  }
  svg {
    cursor: pointer;
  }
`;
