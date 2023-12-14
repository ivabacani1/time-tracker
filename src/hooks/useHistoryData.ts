import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase/config";
import { Stopwatch } from "../models/stopwatch.model";

export const useHistoryData = () => {
  const { data } = useSession();

  const [allStopwatches, setAllStopwatches] = useState<Stopwatch[]>([]);
  //   const [historyDate, setHistoryDate] = useState<Date>(new Date());
  //   const [filteredStopwatches, setFilteredStopwatches] = useState<Stopwatch[]>(
  //     []
  //   );
  const [isFetchingStopwatches, setIsFetchingStopwatches] =
    useState<boolean>(true);

  //   const filterStopwatchesByDate = (stopwatches: Stopwatch[], date: Date) => {
  //     const stopwatchesBySelectedDate = stopwatches.filter((stopwatch) =>
  //       isSameDay(new Date(stopwatch.start.seconds * 1000), historyDate)
  //     );
  //     setFilteredStopwatches(stopwatchesBySelectedDate);
  //   };

  //   const handleSetHistoryDate = (newDate: Date) => {
  //     setHistoryDate(newDate);
  //     filterStopwatchesByDate(allStopwatches, newDate);
  //   };

  const handleGetAllStopwatches = async (userEmail?: string | null) => {
    if (!userEmail) return;

    try {
      setIsFetchingStopwatches(true);

      const q = query(
        collection(
          db,
          "users",
          // Replace with user email from session
          userEmail,
          "stopwatches"
        ),
        orderBy("start", "desc")
      );

      const querySnapshot = await getDocs(q);

      const stopwatchesData = querySnapshot.docs.map((doc): Stopwatch => {
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
        setAllStopwatches(stopwatchesData);
        //filterStopwatchesByDate(stopwatchesData, historyDate);
      }

      return stopwatchesData;
    } catch (error: any) {
      console.error("Error fetching stopwatches:", error.message);
    } finally {
      setIsFetchingStopwatches(false);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      if (data?.user) await handleGetAllStopwatches(data?.user?.email);
    };
    fetchAll();
  }, [data?.user]);

  return {
    allStopwatches,
    // historyDate,
    // filteredStopwatches,
    // handleSetHistoryDate,
    isFetchingStopwatches,
  };
};
