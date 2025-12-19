import { type FormEvent, useState } from "react";
import type { Algorithm } from "../types";

type SimulationInputProps = {
  onStartSimulation: (sequence: string[], memorySize: number, algorithm: Algorithm) => void;
  isAlgorithmSelected: boolean;
  selectedAlgorithm: Algorithm;
  onAlgorithmChange: (algorithm: Algorithm) => void;
  isLoading?: boolean;
};

const SimulationInput = ({
  onStartSimulation,
  isAlgorithmSelected,
  selectedAlgorithm,
  onAlgorithmChange,
  isLoading = false,
}: SimulationInputProps) => {
  const [pageSequence, setPageSequence] = useState("");
  const [memorySize, setMemorySize] = useState("3");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!isAlgorithmSelected) {
      window.alert("Please select a replacement algorithm first.");
      return;
    }

    const sequence = pageSequence
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (sequence.length === 0) {
      window.alert("Please enter a page sequence.");
      return;
    }

    const memSize = parseInt(memorySize, 10);
    if (isNaN(memSize) || memSize < 1 || memSize > 10) {
      window.alert("Memory size must be between 1 and 10.");
      return;
    }

    onStartSimulation(sequence, memSize, selectedAlgorithm);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-slate-100">Simulation Setup</h2>
      
      <div>
        <label htmlFor="algorithm" className="block text-sm font-medium text-slate-300 mb-2">
          Choose a replacement algorithm *
        </label>
        <select
          id="algorithm"
          className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-slate-100 shadow-inner outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
          value={selectedAlgorithm}
          onChange={(e) => onAlgorithmChange(e.target.value as Algorithm)}
        >
          <option value="fifo">FIFO (First In First Out)</option>
          <option value="lru">LRU (Least Recently Used)</option>
          <option value="opt">OPT (Optimal)</option>
          <option value="lfu">LFU (Least Frequently Used)</option>
          <option value="clock">Clock Algorithm</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="sequence" className="block text-sm font-medium text-slate-300 mb-2">
            Page Request Sequence *
          </label>
          <input
            id="sequence"
            type="text"
            value={pageSequence}
            onChange={(e) => setPageSequence(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-slate-100 shadow-inner outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
            placeholder="e.g., 1,2,3,4,1,2,5,1,2,3,4,5"
            required
          />
          <p className="mt-1 text-xs text-slate-400">
            Enter page numbers separated by commas or spaces
          </p>
        </div>

        <div>
          <label htmlFor="memorySize" className="block text-sm font-medium text-slate-300 mb-2">
            Memory Size (Number of Frames) *
          </label>
          <input
            id="memorySize"
            type="number"
            min="1"
            max="10"
            value={memorySize}
            onChange={(e) => setMemorySize(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-slate-100 shadow-inner outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isAlgorithmSelected || isLoading}
          className={`w-full rounded-lg px-4 py-2 font-medium transition focus:outline-none focus:ring-2 ${
            isAlgorithmSelected && !isLoading
              ? "bg-emerald-500 text-slate-900 hover:bg-emerald-400 focus:ring-emerald-400/60 cursor-pointer"
              : "bg-slate-700 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Running Simulation..." : "Start Simulation"}
        </button>
      </form>
    </div>
  );
};

export default SimulationInput;

