import { Router, type Request, type Response } from "express";
import { simulatePageReplacement } from "../utils/simulator";
import type { SimulationRequest, Algorithm } from "../types";

const router = Router();

router.post("/simulate", (req: Request, res: Response) => {
  try {
    const { pageSequence, memorySize, algorithm }: SimulationRequest = req.body;

    // Validation
    if (!pageSequence || !Array.isArray(pageSequence) || pageSequence.length === 0) {
      return res.status(400).json({
        error: "Invalid page sequence. Must be a non-empty array.",
      });
    }

    if (!memorySize || typeof memorySize !== "number" || memorySize < 1 || memorySize > 10) {
      return res.status(400).json({
        error: "Invalid memory size. Must be a number between 1 and 10.",
      });
    }

    const validAlgorithms: Algorithm[] = ["fifo", "lru", "opt", "lfu", "clock"];
    if (!algorithm || !validAlgorithms.includes(algorithm)) {
      return res.status(400).json({
        error: `Invalid algorithm. Must be one of: ${validAlgorithms.join(", ")}`,
      });
    }

    // Run simulation
    const result = simulatePageReplacement(pageSequence, memorySize, algorithm);

    res.json(result);
  } catch (error) {
    console.error("Simulation error:", error);
    res.status(500).json({
      error: "Internal server error during simulation",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;

