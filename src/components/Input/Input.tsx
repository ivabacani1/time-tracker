"use client";

import React from "react";

import * as Styled from "./Input.styles.ts";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  isError?: boolean;
  errorMessage?: string;
  isPassword?: boolean;
  name?: string;
}

export default function Input({
  value,
  onChange,
  label,
  isError,
  errorMessage,
  name,
  isPassword,
}: InputProps) {
  return (
    <>
      <Styled.InputContainer>
        <span className="p-float-label">
          {isPassword ? (
            <Password
              name={name}
              value={value}
              onChange={onChange}
              toggleMask
              className={isError ? "p-invalid" : undefined}
              feedback={false}
            />
          ) : (
            <InputText
              name="email"
              value={value}
              onChange={onChange}
              className={isError ? "p-invalid" : undefined}
            />
          )}
          <label htmlFor={isPassword ? undefined : "input_value"}>
            {label}
          </label>
        </span>
        {errorMessage && <small id="username-help">{errorMessage}</small>}
      </Styled.InputContainer>
    </>
  );
}
