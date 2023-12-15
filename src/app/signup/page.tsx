"use client";

import { PageContainer } from "@/components/shared/PageContainer/PageContainer";

import { Flex } from "@/components/shared/Flex/Flex.styles";
import { useForm } from "@/hooks/useForm";
import { validateEmail, validatePassword } from "@/utils/validators";
import { vars } from "@/styles/vars";

import Input from "@/components/Input/Input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { InputCredentialsContainer } from "@/components/InputCredentialsContainer/InputCredentialsContainer";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

export interface UserType {
  email: string;
  password: string;
}

const validators = {
  email: validateEmail,
  password: validatePassword,
};

export default function Signup() {
  const router = useRouter();
  const { handleFormChange, formState, formError, handleFormSubmit } =
    useForm<UserType>({
      initialState: { email: "", password: "" },
      onSubmit: () => {
        createUserWithEmailAndPassword(
          auth,
          formState.email,
          formState.password
        ).then(() => router.push("/signin"));
      },
      validators,
    });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    handleFormChange(e.currentTarget.name, e.currentTarget.value);
  }

  return (
    <PageContainer>
      <InputCredentialsContainer
        handleFormSubmit={handleFormSubmit}
        title="Sign up"
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
            label="Sign up"
            fullWidth
          />
        </Flex>
      </InputCredentialsContainer>
    </PageContainer>
  );
}
