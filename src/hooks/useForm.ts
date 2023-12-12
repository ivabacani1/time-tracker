import { FormEvent, useCallback, useState } from "react";

type FormValidator<T extends Record<keyof T, unknown>> = Partial<
  Record<keyof T, ValidatorFunction>
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidatorFunction = (value: any) => Error | undefined;

interface FormProps<T> {
  initialState: T;
  onSubmit: () => void;
  validators: FormValidator<T>;
}

type FormError<T> = Partial<Record<keyof T, Error>>;

export function useForm<T extends Record<keyof T, unknown>>({
  initialState,
  onSubmit,
  validators,
}: FormProps<T>) {
  const [formState, setFormState] = useState<T>(initialState);
  const [formError, setFormError] = useState<FormError<T>>({});

  const handleFormChange = useCallback(
    (
      fieldName: string,
      fieldValue: string | number | File | boolean | null
    ) => {
      setFormError((prevError) => {
        return {
          ...prevError,
          [fieldName]: undefined,
        };
      });
      setFormState((prevState) => {
        return {
          ...prevState,
          [fieldName]: fieldValue,
        };
      });
    },
    []
  );

  const validateFormFields = useCallback((): FormError<T> => {
    return Object.entries(validators).reduce((acc, curr) => {
      const [key, validate] = curr as [keyof T, ValidatorFunction | undefined];
      return validate ? { ...acc, [key]: validate(formState[key]) } : acc;
    }, {});
  }, [formState, validators]);

  const handleFormSubmit = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault();
      const formError = validateFormFields();
      setFormError(formError);
      const isValid = Object.values(formError).every(
        (error) => error === undefined
      );
      isValid && onSubmit();
    },
    [validateFormFields, onSubmit]
  );

  const clearForm = useCallback(() => {
    setFormError({});
    setFormState(initialState);
  }, [initialState]);

  const setError = useCallback((newError: Partial<Record<keyof T, Error>>) => {
    setFormError((prevError) => {
      return {
        ...prevError,
        ...newError,
      };
    });
  }, []);

  return {
    handleFormChange,
    formState,
    formError,
    handleFormSubmit,
    clearForm,
    setError,
  };
}
