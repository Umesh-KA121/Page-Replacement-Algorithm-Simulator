import type { Algorithm, SimulationResult } from "../types";
import { simulatePageReplacement as runSimulation } from "./simulator";

export const simulatePageReplacement = (
  pageSequence: string[],
  memorySize: number,
  algorithm: Algorithm
): SimulationResult => {
  // Validate inputs
  if (!pageSequence || !Array.isArray(pageSequence) || pageSequence.length === 0) {
    throw new Error("Invalid page sequence. Must be a non-empty array.");
  }

  const validPageSequence = pageSequence.map((page) => String(page).trim()).filter((page) => page.length > 0);
  if (validPageSequence.length === 0) {
    throw new Error("Invalid page sequence. All pages must be non-empty strings.");
  }

  if (!memorySize || typeof memorySize !== "number" || memorySize < 1 || memorySize > 10) {
    throw new Error("Invalid memory size. Must be a number between 1 and 10.");
  }

  const validAlgorithms: Algorithm[] = ["fifo", "lru", "opt", "lfu", "clock"];
  if (!algorithm || !validAlgorithms.includes(algorithm)) {
    throw new Error(`Invalid algorithm. Must be one of: ${validAlgorithms.join(", ")}`);
  }

  // Run simulation locally
  return runSimulation(validPageSequence, memorySize, algorithm);
};

