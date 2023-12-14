"use server";

import { db } from "@/lib/firebase/config";
import { Stopwatch, StopwatchStatus } from "@/models/stopwatch.model";
import { differenceInSeconds } from "date-fns";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const handleSyncActiveStopwatch = async (
  userEmail?: string | null,
  activeStopwatchId?: string
) => {
  if (!userEmail) return;
  try {
    if (!activeStopwatchId) return;
    const newLastSyncTime = new Date();
    const stopwatchRef = doc(
      db,
      "users",
      userEmail,
      "stopwatches",
      activeStopwatchId
    );
    const stopwatchDoc = await getDoc(stopwatchRef);

    if (!stopwatchDoc.exists()) {
      console.error("Stopwatch document does not exist.");
      return;
    }
    const stopwatchData: Stopwatch = stopwatchDoc.data() as Stopwatch;

    const lastSyncTime = stopwatchData.lastSync
      ? stopwatchData.lastSync
      : stopwatchData.start;

    const timeToBeLogged =
      stopwatchData.logged +
      differenceInSeconds(
        newLastSyncTime,
        new Date(lastSyncTime.seconds * 1000)
      );

    await updateDoc(stopwatchRef, {
      logged: timeToBeLogged,
      lastSync: newLastSyncTime,
    });
  } catch (error) {
    console.log("Error while syncing data to firebase");
  }
};

export const handlePauseStopwatch = async (
  id: string,
  userEmail?: string | null
) => {
  if (!userEmail) return;
  try {
    const stopwatchRef = doc(
      db,
      "users", // Replace with userId from session
      userEmail,
      "stopwatches",
      id
    );
    const stopwatchDoc = await getDoc(stopwatchRef);

    if (!stopwatchDoc.exists()) {
      console.error("Stopwatch document does not exist.");
      return;
    }

    const stopwatchData: Stopwatch = stopwatchDoc.data() as Stopwatch;

    if (stopwatchData.status === StopwatchStatus.STOPPED) {
      console.error("Cannot pause stopped stopwatch.");
      return;
    }

    if (stopwatchData.status === StopwatchStatus.PAUSED) {
      console.error("Stopwatch already paused.");
      return;
    }

    const lastSyncTime = stopwatchData.lastSync
      ? stopwatchData.lastSync
      : stopwatchData.start;

    const timeToBeLogged =
      stopwatchData.logged +
      differenceInSeconds(new Date(), new Date(lastSyncTime.seconds * 1000));

    await updateDoc(stopwatchRef, {
      status: StopwatchStatus.PAUSED,
      logged: timeToBeLogged,
    });
  } catch (error: any) {
    console.error(`Error pausing stopwatch with id: ${id}`, error.message);
  }
};

export const handleContinueStopwatch = async (
  id: string,
  userEmail?: string | null
) => {
  if (!userEmail) return;
  try {
    const stopwatchRef = doc(
      db,
      "users", // Replace with userId from session
      userEmail,
      "stopwatches",
      id
    );
    const stopwatchDoc = await getDoc(stopwatchRef);

    if (!stopwatchDoc.exists()) {
      console.error("Stopwatch document does not exist.");
      return;
    }

    const stopwatchData: Stopwatch = stopwatchDoc.data() as Stopwatch;

    if (stopwatchData.status === StopwatchStatus.STOPPED) {
      console.error("Stopwatch is stopped, cannot continue.");
      return;
    }

    if (stopwatchData.status === StopwatchStatus.RUNNING) {
      console.error("Stopwatch already running.");
      return;
    }

    await updateDoc(stopwatchRef, {
      status: StopwatchStatus.RUNNING,
      lastSync: new Date(),
    });
  } catch (error: any) {
    console.error(`Error continuing stopwatch with id: ${id}`, error.message);
  }
};

export const handleStopStopwatch = async (
  id: string,
  userEmail?: string | null
) => {
  if (!userEmail) return;
  try {
    const stopwatchRef = doc(
      db,
      "users",
      userEmail, // Replace with userId from session
      "stopwatches",
      id
    );
    const stopwatchDoc = await getDoc(stopwatchRef);

    if (!stopwatchDoc.exists()) {
      console.error("Stopwatch document does not exist.");
      return;
    }

    const stopwatchData: Stopwatch = stopwatchDoc.data() as Stopwatch;

    if (stopwatchData.status === StopwatchStatus.STOPPED) {
      console.error("Stopwatch already stopped.");
      return;
    }

    const lastSyncTime = stopwatchData.lastSync
      ? stopwatchData.lastSync
      : stopwatchData.start;

    const timeToBeLogged =
      stopwatchData.logged +
      differenceInSeconds(new Date(), new Date(lastSyncTime.seconds * 1000));

    await updateDoc(stopwatchRef, {
      status: StopwatchStatus.STOPPED,
      end: new Date(),
      logged: timeToBeLogged,
    });
  } catch (error: any) {
    console.error(`Error stopping stopwatch with id: ${id}`, error.message);
  }
};

export const handleStopAllStopwatches = async (userEmail?: string | null) => {
  if (!userEmail) return;
  try {
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

    // create reusable function for the code below

    const querySnapshot = await getDocs(q);

    // firebase doesnt have updateAll option
    querySnapshot.docs.map(async (stopwatch) => {
      const stopwatchData: Stopwatch = stopwatch.data() as Stopwatch;

      if (stopwatchData.status === StopwatchStatus.STOPPED) {
        console.error("Stopwatch already stopped.");
        return;
      }

      const lastSyncTime = stopwatchData.lastSync
        ? stopwatchData.lastSync
        : stopwatchData.start;

      const timeToBeLogged =
        stopwatchData.logged +
        differenceInSeconds(new Date(), new Date(lastSyncTime.seconds * 1000));
      const stopwatchRef = doc(
        db,
        "users",
        userEmail, // Replace with userId from session
        "stopwatches",
        stopwatch.id
      );
      await updateDoc(stopwatchRef, {
        status: StopwatchStatus.STOPPED,
        end: new Date(),
        logged: timeToBeLogged,
      });
    });
  } catch (error: any) {
    console.error(`Error stopping stopwatches`, error.message);
  }
};

export const handleEditStopwatch = async (
  stopwatchId: string,
  description: string,
  userEmail?: string | null
) => {
  if (!userEmail) return;
  try {
    const stopwatchRef = doc(
      db,
      "users",
      userEmail,
      "stopwatches",
      stopwatchId
    );
    const stopwatchDoc = await getDoc(stopwatchRef);

    if (!stopwatchDoc.exists()) {
      console.error("Stopwatch document does not exist.");
      return;
    }

    await updateDoc(stopwatchRef, {
      description: description,
    });
  } catch (error) {
    console.log("Error while syncing data to firebase");
  }
};

export const handleDeleteStopwatch = async (
  stopwatchId: string,
  userEmail?: string | null
) => {
  if (!userEmail) return;
  try {
    const stopwatchRef = doc(
      db,
      "users",
      userEmail,
      "stopwatches",
      stopwatchId
    );
    const stopwatchDoc = await getDoc(stopwatchRef);

    if (!stopwatchDoc.exists()) {
      console.error("Stopwatch document does not exist.");
      return;
    }

    await deleteDoc(stopwatchRef);
  } catch (error) {
    console.log("Error while syncing data to firebase");
  }
};
