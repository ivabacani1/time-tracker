import * as Styled from "./InputCredentialsContainer.styles";

export const InputCredentialsContainer = ({
  children,
  handleFormSubmit,
  title,
}: {
  children: any;
  handleFormSubmit: () => void;
  title: string;
}) => {
  return (
    <Styled.Container $justifyContent="center">
      <Styled.CardContainer title={title}>
        <Styled.Form onSubmit={handleFormSubmit} noValidate>
          {children}
        </Styled.Form>
      </Styled.CardContainer>
    </Styled.Container>
  );
};
