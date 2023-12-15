"use client";

import React, { Suspense, useState } from "react";

import { PageContainer } from "@/components/shared/PageContainer/PageContainer";
import { addSeconds, format } from "date-fns";
import { Flex } from "@/components/shared/Flex/Flex.styles";
import {
  CalendarIcon,
  StartNewIcon,
  StopIcon,
  TrashIcon,
  EditIcon,
  PauseIcon,
  StartIcon,
  StopAllIcon,
} from "@/components/shared/icons";
import { Column } from "primereact/column";
import { PageContentContainer } from "@/components/shared/PageContainer/PageContentContainer";
import { useStopwatchCollection } from "@/hooks/useStopWatchCollection";
import Loader from "@/components/shared/Loader/Loader";
import { Buttons, Table } from "./trackers.styles";
import { Stopwatch } from "@/models/stopwatch.model";
import Button from "@/components/Button/Button";
import { vars } from "@/styles/vars";
import StopWatchDialog from "@/components/StopwatchDialog/StopwatchDialog";

export default function Trackers() {
  const [openStartDialog, setOpenStartDialog] = useState(false);
  const [selectedStopwatch, setSelectedStopwatch] = useState<
    Stopwatch | undefined
  >(undefined);
  const {
    handleCreateStopwatch,
    stopwatches,
    activeStopwatchId,
    handlePauseStopwatch,
    handleContinueStopwatch,
    handleStopStopwatch,
    isFetchingStopwatches,
    handleEditStopwatch,
    handleDeleteStopwatch,
    handleStopAllStopwatches,
  } = useStopwatchCollection();

  return (
    <>
      <PageContainer>
        <PageContentContainer>
          <Flex $column $justifyContent="start">
            <Flex $gap={16} $alignItems="center">
              <CalendarIcon />
              <h3>{`Today (${format(new Date(), "dd.MM.yyyy")})`}</h3>
            </Flex>

            <Buttons $justifyContent="flex-end" $gap={15}>
              <Button
                icon={<StartNewIcon />}
                label="Start new timer"
                onClick={() => setOpenStartDialog(true)}
              />

              <Button
                icon={<StopAllIcon />}
                label="Stop all"
                onClick={handleStopAllStopwatches}
                color={vars.colors.portGore}
              />
            </Buttons>

            {isFetchingStopwatches ? (
              <Flex
                style={{ minHeight: "50vh" }}
                $justifyContent="center"
                $alignItems="center"
              >
                <Loader />
              </Flex>
            ) : (
              <Suspense fallback={<Loader />}>
                <Table
                  value={stopwatches}
                  paginator // add server pagination later so fetching is happening on page change
                  rows={6}
                  tableStyle={{
                    minWidth: "80vw",
                  }}
                  resizableColumns
                  showGridlines
                >
                  <Column
                    style={{ width: "25%" }}
                    field="logged"
                    header="Time logged"
                    body={LoggedBodyTemplate}
                  />
                  <Column
                    style={{ width: "55%" }}
                    field="description"
                    header="Description"
                  />
                  <Column
                    style={{ width: "20%" }}
                    field="actions"
                    header="Actions"
                    body={(rowData) =>
                      ActionsBodyTemplate(
                        rowData,
                        handlePauseStopwatch,
                        handleContinueStopwatch,
                        handleStopStopwatch,
                        handleDeleteStopwatch,
                        setSelectedStopwatch,
                        setOpenStartDialog,
                        activeStopwatchId
                      )
                    }
                  />
                </Table>
              </Suspense>
            )}
          </Flex>
        </PageContentContainer>
      </PageContainer>
      <StopWatchDialog
        selectedStopWatch={selectedStopwatch}
        isOpen={openStartDialog}
        setIsOpen={setOpenStartDialog}
        handleOnChange={
          selectedStopwatch ? handleEditStopwatch : handleCreateStopwatch
        }
      />
    </>
  );
}

const LoggedBodyTemplate = (rowData: Stopwatch) => {
  const today = new Date();
  const midnight = today.setHours(0, 0, 0, 0);
  return format(addSeconds(new Date(midnight), rowData.logged), "HH:mm:ss");
};

const ActionsBodyTemplate = (
  stopwatch: Stopwatch,
  handlePauseStopwatch: (id: string) => void,
  handleContinueStopwatch: (id: string) => void,
  handleStopStopwatch: (id: string) => void,
  handleDeleteStopwatch: (id: string) => void,
  setSelectedStopwatch: (stopwatch?: Stopwatch) => void,
  setOpenStartDialog: (open: boolean) => void,
  activeStopwatchId?: string
) => {
  return (
    <Flex $gap={15} style={{ maxWidth: "150px" }}>
      {stopwatch.id === activeStopwatchId ? (
        <PauseIcon onClick={() => handlePauseStopwatch(stopwatch.id)} />
      ) : (
        <StartIcon onClick={() => handleContinueStopwatch(stopwatch.id)} />
      )}
      <StopIcon onClick={() => handleStopStopwatch(stopwatch.id)} />
      <EditIcon
        onClick={() => {
          setOpenStartDialog(true);
          setSelectedStopwatch(stopwatch);
        }}
      />
      <TrashIcon onClick={() => handleDeleteStopwatch(stopwatch.id)} />
    </Flex>
  );
};
