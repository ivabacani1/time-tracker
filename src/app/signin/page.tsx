"use client";

import { PageWrap } from "@/components/shared/PageWrap/PageWrap";
import { signIn } from "next-auth/react";

import { Flex } from "@/components/shared/Flex/Flex.styles";
import { useForm } from "@/hooks/useForm";
import { validateEmail, validatePasswordSignInForm } from "@/utils/validators";
import { Button } from "primereact/button";
import { vars } from "@/styles/vars";

import * as Styled from "./signin.styles";
import Input from "@/components/Input/Input";

import Link from "next/link";

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
    <PageWrap>
      <Styled.SignInContainer $gap={30} $column>
        <Styled.SignInCardContainer title="Login">
          <Styled.Form onSubmit={handleFormSubmit} noValidate>
            <Flex $alignItems="center" $column $gap={30}>
              <Input
                name="email"
                value={formState.email}
                onChange={handleChange}
                label="Email"
                isError={Boolean(formError.password)}
                errorMessage={formError.password?.message}
              />

              <Input
                name="password"
                value={formState.password}
                onChange={handleChange}
                label="Password"
                isError={Boolean(formError.password)}
                errorMessage={formError.email?.message}
                isPassword
              />

              <Button
                type="submit"
                disabled={!formState.email || !formState.password}
                color={vars.colors.orange}
              >
                Sign in
              </Button>
            </Flex>
          </Styled.Form>
        </Styled.SignInCardContainer>

        <Styled.RegisterHereCard>
          <Flex $gap={34} style={{ maxHeight: "47px" }}>
            <Styled.RegisterUser width={95} height={95} />
            <div>
              <p>Need an account?</p>
              <Link href="/signup">Register here</Link>
            </div>
          </Flex>
        </Styled.RegisterHereCard>
      </Styled.SignInContainer>
    </PageWrap>
  );
}
