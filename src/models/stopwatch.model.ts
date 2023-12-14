export interface Stopwatch {
  id: string;
  start: FirebaseTimestamp;
  logged: number;
  end?: FirebaseTimestamp;
  status: StopwatchStatus;
  lastSync?: FirebaseTimestamp;
  description: string;
}

export enum StopwatchStatus {
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}
