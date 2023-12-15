"use client";

import React, { Suspense, useState } from "react";

import { PageContainer } from "@/components/shared/PageContainer/PageContainer";
import { addSeconds, format, isValid } from "date-fns";
import { Flex } from "@/components/shared/Flex/Flex.styles";
import { TrashIcon, EditIcon } from "@/components/shared/icons";
import { Column } from "primereact/column";
import { PageContentContainer } from "@/components/shared/PageContainer/PageContentContainer";
import Loader from "@/components/shared/Loader/Loader";

import { Stopwatch } from "@/models/stopwatch.model";
import { useHistoryData } from "@/hooks/useHistoryData";

import { Table } from "./history.styles";
import StopWatchDialog from "@/components/StopwatchDialog/StopwatchDialog";

export default function Trackers() {
  const [openStartDialog, setOpenStartDialog] = useState(false);
  const [selectedStopwatch, setSelectedStopwatch] = useState<
    Stopwatch | undefined
  >(undefined);
  const {
    allStopwatches,
    isFetchingStopwatches,
    handleEditStopwatch,
    handleDeleteStopwatch,
  } = useHistoryData();

  return (
    <>
      <PageContainer>
        <PageContentContainer>
          <Flex $column $justifyContent="start" style={{ minHeight: "100%" }}>
            <Flex
              $gap={16}
              $alignItems="center"
              style={{ marginBottom: "53px" }}
            >
              <h3>{`Trackers history`}</h3>
            </Flex>

            {/* later - add filter input fields */}

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
                  value={allStopwatches}
                  paginator // add server pagination later so fetching is happening on page change
                  rows={6}
                  tableStyle={{
                    minWidth: "80vw",
                  }}
                  resizableColumns
                  showGridlines
                >
                  <Column
                    style={{ width: "20%" }}
                    field="date"
                    header="Date"
                    body={DateBodyTemplate}
                  />
                  <Column
                    style={{ width: "50%" }}
                    field="description"
                    header="Description"
                  />
                  <Column
                    style={{ width: "15%" }}
                    field="logged"
                    header="Time logged"
                    body={LoggedBodyTemplate}
                  />
                  <Column
                    style={{ width: "15%" }}
                    field="actions"
                    header="Actions"
                    body={(rowData) =>
                      ActionsBodyTemplate(
                        rowData,
                        handleDeleteStopwatch,
                        setSelectedStopwatch,
                        setOpenStartDialog
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
        handleOnChange={handleEditStopwatch}
      />
    </>
  );
}

const DateBodyTemplate = (rowData: Stopwatch) => {
  const fireBaseTime = new Date(
    rowData.start.seconds * 1000 + rowData.start.nanoseconds / 1000000
  );

  if (isValid(fireBaseTime)) return format(fireBaseTime, "dd.MM.yyyy");
};

const LoggedBodyTemplate = (rowData: Stopwatch) => {
  const today = new Date();
  const midnight = today.setHours(0, 0, 0, 0);
  return format(addSeconds(new Date(midnight), rowData.logged), "HH:mm:ss");
};

const ActionsBodyTemplate = (
  stopwatch: Stopwatch,
  handleDeleteStopwatch: (id: string) => void,
  setSelectedStopwatch: (stopwatch: Stopwatch) => void,
  setOpenStartDialog: (open: boolean) => void
) => {
  return (
    <Flex $gap={15} style={{ maxWidth: "150px" }}>
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
