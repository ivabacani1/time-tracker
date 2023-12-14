"use client";

import React, { useEffect } from "react";

import { Dialog } from "primereact/dialog";
import { useForm } from "@/hooks/useForm";
import Input from "@/components/Input/Input";
import { Flex } from "@/components/shared/Flex/Flex.styles";
import { Stopwatch } from "@/models/stopwatch.model";
import Button from "@/components/Button/Button";

interface StopWatchDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleOnChange: (description: string, id?: string) => void;
  selectedStopWatch?: Stopwatch;
  setSelectedStopWatch?: (stopwatch?: Stopwatch) => void;
}

export default function StartNewWatchDialog({
  isOpen,
  setIsOpen,
  handleOnChange,
  selectedStopWatch,
  setSelectedStopWatch,
}: StopWatchDialogProps) {
  const { handleFormChange, formState, handleFormSubmit, clearForm } = useForm<{
    description: string;
  }>({
    initialState: {
      description: "",
    },
    onSubmit: () => {
      handleOnChange(
        formState.description,
        selectedStopWatch ? selectedStopWatch.id : undefined
      );
      setSelectedStopWatch?.(undefined);
      clearForm();
      setIsOpen(false);
    },
    validators: {},
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    handleFormChange(e.currentTarget.name, e.currentTarget.value);
  }

  useEffect(() => {
    if (selectedStopWatch)
      handleFormChange("description", selectedStopWatch.description);
  }, [selectedStopWatch]);

  return (
    <Dialog
      header={selectedStopWatch ? "Edit stopwatch" : "Start new"}
      visible={isOpen}
      style={{ width: "30vw" }}
      onHide={() => setIsOpen(false)}
    >
      <form onSubmit={handleFormSubmit}>
        <Flex $column $gap={50}>
          <Input
            value={formState.description}
            name="description"
            onChange={handleChange}
            label="Description"
          />

          <Button
            type="submit"
            label={selectedStopWatch ? "Edit" : "Start"}
            disabled={!Boolean(formState.description)}
            fullWidth
          />
        </Flex>
      </form>
    </Dialog>
  );
}
