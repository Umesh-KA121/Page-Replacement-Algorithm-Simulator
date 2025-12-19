import type { Algorithm, SimulationResult } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export type SimulationRequest = {
  pageSequence: string[];
  memorySize: number;
  algorithm: Algorithm;
};

export const simulatePageReplacement = async (
  pageSequence: string[],
  memorySize: number,
  algorithm: Algorithm
): Promise<SimulationResult> => {
  const response = await fetch(`${API_BASE_URL}/simulate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageSequence,
      memorySize,
      algorithm,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

