export type Algorithm = "fifo" | "lru" | "opt" | "lfu" | "clock";

export type Frame = {
  page: string | null; // Page currently in frame, null if empty
  loadTime: number; // When page was loaded (step number)
  lastAccess: number; // Last time page was accessed (step number)
  accessCount: number; // Number of times page was accessed
  refBit: boolean; // Reference bit for Clock algorithm
};

export type SimulationStep = {
  step: number;
  requestedPage: string;
  frames: Frame[];
  isHit: boolean;
  replacedPage: string | null; // Which page was replaced (null if no replacement)
  replacedFrameIndex: number | null; // Which frame was replaced
  clockPointer?: number; // For Clock algorithm
  explanation: string; // Why this decision was made
};

export type SimulationResult = {
  steps: SimulationStep[];
  totalHits: number;
  totalFaults: number;
  hitRatio: number;
};

export type SimulationRequest = {
  pageSequence: string[];
  memorySize: number;
  algorithm: Algorithm;
};

