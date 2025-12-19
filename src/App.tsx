import { useState } from "react";
import type { Algorithm, SimulationResult } from "./types";
import { simulatePageReplacement } from "./utils/api";
import Header from "./components/Header";
import SimulationInput from "./components/SimulationInput";
import SimulationVisualization from "./components/SimulationVisualization";

const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>("fifo");
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartSimulation = async (
    sequence: string[],
    memorySize: number,
    algorithm: Algorithm
  ) => {
    setIsLoading(true);
    setError(null);
    setSimulationResult(null);
    setCurrentStep(1);

    try {
      const result = await simulatePageReplacement(sequence, memorySize, algorithm);
      setSimulationResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to run simulation";
      setError(errorMessage);
      console.error("Simulation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left side - Input */}
          <div className="w-full lg:w-96">
            <SimulationInput
              onStartSimulation={handleStartSimulation}
              isAlgorithmSelected={true}
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={setSelectedAlgorithm}
              isLoading={isLoading}
            />
            {error && (
              <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-400">
                <p className="font-semibold">Error:</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Right side - Visualization */}
          <div className="flex-1">
            <SimulationVisualization
              result={simulationResult}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
