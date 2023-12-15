import { DataTable } from "primereact/datatable";
import styled from "styled-components";

export const Table = styled(DataTable)`
  .p-datatable-wrapper {
    min-height: 53vh;
  }
  svg {
    cursor: pointer;
  }
`;
