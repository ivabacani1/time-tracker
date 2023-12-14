import { StyledPageContainer } from "./Containers.styles";

export const PageContainer = ({ children }: { children: any }) => {
  return (
    <StyledPageContainer $justifyContent="center">
      {children}
    </StyledPageContainer>
  );
};
