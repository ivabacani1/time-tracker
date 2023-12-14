import { ProgressSpinner } from "primereact/progressspinner";
import { Flex } from "../Flex/Flex.styles";

export default function Loader() {
  return (
    <Flex $justifyContent="center" $alignItems="center">
      <ProgressSpinner />
    </Flex>
  );
}
