import { Validators } from "./validatorFunctions";

export const validateEmail = (value: string): Error | undefined => {
  if (!Validators.required(value)) {
    return new Error("Please enter your email");
  }
  if (!Validators.validEmail(value)) {
    return new Error("Whoopsie, that doesn't look like a valid email");
  }
};

export const validatePassword = (value: string): Error | undefined => {
  if (!Validators.minLength(value, 8)) {
    return new Error("Please enter a password with at least 8 characters");
  }
};

export const validatePasswordSignInForm = (
  value: string
): Error | undefined => {
  if (!Validators.required(value)) {
    return new Error("Please enter your password");
  }
};
