"use client";

import React from "react";

import * as Styled from "./Button.styles.ts";
import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from "primereact/button";
import { IconType } from "primereact/utils";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: string;
  icon?: IconType<BaseButtonProps>;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  label,
  onClick,
  color,
  icon,
  type,
  disabled,
  fullWidth,
}: ButtonProps) {
  return (
    <>
      <Styled.Button $color={color} $fullWidth={fullWidth}>
        <BaseButton
          type={type}
          label={label}
          onClick={onClick}
          icon={icon}
          disabled={disabled}
        />
      </Styled.Button>
    </>
  );
}
