"use client";

import { PageContainer } from "@/components/shared/PageContainer/PageContainer";
import { signIn } from "next-auth/react";

import { Flex } from "@/components/shared/Flex/Flex.styles";
import { useForm } from "@/hooks/useForm";
import { validateEmail, validatePasswordSignInForm } from "@/utils/validators";
import { vars } from "@/styles/vars";

import * as Styled from "./signin.styles";
import Input from "@/components/Input/Input";
import { InputCredentialsContainer } from "@/components/InputCredentialsContainer/InputCredentialsContainer";
import Button from "@/components/Button/Button";

export interface UserType {
  email: string;
  password: string;
}

const validators = {
  email: validateEmail,
  password: validatePasswordSignInForm,
};

export default function Signin() {
  const { handleFormChange, formState, formError, handleFormSubmit, setError } =
    useForm<UserType>({
      initialState: { email: "", password: "" },
      onSubmit: () =>
        signIn("credentials", {
          email: formState.email,
          password: formState.password,
        }),
      validators,
    });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    handleFormChange(e.currentTarget.name, e.currentTarget.value);
  }

  return (
    <>
      <PageContainer>
        <Flex $column $gap={30} $alignItems="center">
          <InputCredentialsContainer
            handleFormSubmit={handleFormSubmit}
            title="Login"
          >
            <Flex $alignItems="center" $column $gap={30}>
              <Input
                name="email"
                value={formState.email}
                onChange={handleChange}
                label="Email"
                isError={Boolean(formError.email)}
                errorMessage={formError.email?.message}
              />

              <Input
                name="password"
                value={formState.password}
                onChange={handleChange}
                label="Password"
                isError={Boolean(formError.password)}
                errorMessage={formError.password?.message}
                isPassword
              />

              <Button
                type="submit"
                disabled={!formState.email || !formState.password}
                label="Login"
                fullWidth
              />
            </Flex>
          </InputCredentialsContainer>

          <Styled.RegisterHereCard>
            <Flex $gap={34} style={{ maxHeight: "47px" }}>
              <Styled.RegisterUser width={95} height={95} />
              <div>
                <Styled.Text>Need an account?</Styled.Text>
                <Styled.StyledLink href="/signup">
                  Register here
                </Styled.StyledLink>
              </div>
            </Flex>
          </Styled.RegisterHereCard>
        </Flex>
      </PageContainer>
    </>
  );
}
