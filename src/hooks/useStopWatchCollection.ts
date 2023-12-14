import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

import {
  handleContinueStopwatch,
  handleDeleteStopwatch,
  handleEditStopwatch,
  handlePauseStopwatch,
  handleStopAllStopwatches,
  handleStopStopwatch,
  handleSyncActiveStopwatch,
} from "@/app/utils/stopWatchFunctions";
import { db } from "@/lib/firebase/config";
import { Stopwatch, StopwatchStatus } from "@/models/stopwatch.model";
import { useSession } from "next-auth/react";

export const useStopwatchCollection = () => {
  const { data } = useSession();
  const [stopwatches, setStopwatches] = useState<Stopwatch[]>([]);
  const [activeStopwatchId, setActiveStopwatchId] = useState<
    string | undefined
  >();

  const [isFetchingStopwatches, setIsFetchingStopwatches] =
    useState<boolean>(true);

  const handleCreateStopwatch = async (description: string) => {
    if (!data?.user?.email) return;
    try {
      setIsFetchingStopwatches(true);
      await addDoc(
        collection(
          db,
          data?.user?.email ? "users" : "",
          // Replace with user email from session
          data?.user?.email ?? "",
          "stopwatches"
        ),
        {
          start: new Date(),
          logged: 0,
          end: null,
          status: StopwatchStatus.RUNNING,
          description: description,
        }
      );

      if (activeStopwatchId) {
        await handlePauseStopwatch(activeStopwatchId, data?.user?.email);
        setActiveStopwatchId(undefined);
      }

      await handleFetchStopwatches(data?.user?.email);
    } catch (error: any) {
      console.error("Error while creating stopwatch");
    } finally {
      setIsFetchingStopwatches(false);
    }
  };

  const handleFetchStopwatches = useCallback(
    async (userEmail?: string | null) => {
      if (!userEmail) return;

      try {
        setIsFetchingStopwatches(true);

        const q = query(
          collection(
            db,
            "users",
            // Replace with user id from session
            userEmail,
            "stopwatches"
          ),
          where("status", "!=", StopwatchStatus.STOPPED)
        );

        const querySnapshot = await getDocs(q);

        const sorted = querySnapshot.docs.sort((a, b) =>
          a.data().description.localeCompare(b.data().description)
        );

        const stopwatchesData = sorted.map((doc): Stopwatch => {
          const data = doc.data();

          return {
            id: doc.id,
            end: data.end,
            start: data.start,
            logged: data.logged,
            status: data.status,
            lastSync: data.lastSync,
            description: data.description,
          };
        });

        if (stopwatchesData) {
          setStopwatches(stopwatchesData);

          stopwatchesData.map((stopwatch) => {
            if (stopwatch.status === StopwatchStatus.RUNNING) {
              setActiveStopwatchId(stopwatch.id);
            }
          });
        }

        return stopwatchesData;
      } catch (error: any) {
        console.error("Error fetching stopwatches:", error.message);
      } finally {
        setIsFetchingStopwatches?.(false);
      }
    },
    []
  );

  const addSecondToActiveStopwatch = () => {
    const activeStopwatchIndex = stopwatches.findIndex(
      (stopwatch) => stopwatch.id === activeStopwatchId
    );

    if (activeStopwatchIndex !== -1) {
      const newStopwatches = [...stopwatches];
      const updatedStopwatch: Stopwatch = {
        ...stopwatches[activeStopwatchIndex],
        logged: stopwatches[activeStopwatchIndex].logged + 1,
      };

      newStopwatches[activeStopwatchIndex] = updatedStopwatch;
      setStopwatches(newStopwatches);
    }
  };

  const pauseStopWatch = async (id: string) => {
    await handlePauseStopwatch(id, data?.user?.email);
    setActiveStopwatchId(undefined);
  };

  const continueStopWatch = async (id: string) => {
    await handleContinueStopwatch(id, data?.user?.email);
    setActiveStopwatchId(id);
  };

  const stopStopwatch = async (id: string) => {
    await handleStopStopwatch(id, data?.user?.email);
    if (activeStopwatchId === id) setActiveStopwatchId(undefined);
    setStopwatches((prevState) => prevState.filter((st) => st.id !== id));
  };

  const stopAllWatches = async () => {
    await handleStopAllStopwatches(data?.user?.email);
    setStopwatches([]);
    if (activeStopwatchId) setActiveStopwatchId(undefined);
  };

  const editStopwatch = async (description: string, id?: string) => {
    if (!id) return;
    await handleEditStopwatch(id, description, data?.user?.email);
    setStopwatches((prevState) => {
      const index = prevState.findIndex((item) => item.id === id);

      if (index === -1) return prevState;

      const newItems = [...prevState];
      newItems[index] = { ...newItems[index], description: description };
      return newItems;
    });
  };

  const deleteStopwatch = async (id: string) => {
    await handleDeleteStopwatch(id, data?.user?.email);
    setStopwatches((prevState) => prevState.filter((st) => st.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // later - simplify activeStopwatch data={JSON.parse(JSON.stringify(unit))} to prevent warnings
      if (activeStopwatchId)
        handleSyncActiveStopwatch(data?.user?.email, activeStopwatchId);
    }, 1000);

    return () => clearInterval(interval); // Clearing interval to prevent memory leak
  }, [activeStopwatchId]);

  useEffect(() => {
    const fetchStopwatches = async () => {
      if (data?.user) await handleFetchStopwatches(data?.user?.email);
    };
    fetchStopwatches();
  }, [handleFetchStopwatches, data?.user]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeStopwatchId) addSecondToActiveStopwatch();
    }, 1000);

    return () => clearInterval(interval);
  }, [stopwatches, activeStopwatchId]);

  return {
    handleCreateStopwatch,
    stopwatches,
    handlePauseStopwatch: pauseStopWatch,
    handleContinueStopwatch: continueStopWatch,
    handleStopStopwatch: stopStopwatch,
    handleEditStopwatch: editStopwatch,
    handleDeleteStopwatch: deleteStopwatch,
    handleStopAllStopwatches: stopAllWatches,
    isFetchingStopwatches,
    activeStopwatchId,
    addSecondToActiveStopwatch,
  };
};
