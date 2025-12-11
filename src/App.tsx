import { useState } from "react";
import type { Algorithm, SimulationResult } from "./types";
import { simulatePageReplacement } from "./utils/simulator";
import Header from "./components/Header";
import SimulationInput from "./components/SimulationInput";
import SimulationVisualization from "./components/SimulationVisualization";

const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>("fifo");
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const handleStartSimulation = (
    sequence: string[],
    memorySize: number,
    algorithm: Algorithm
  ) => {
    const result = simulatePageReplacement(sequence, memorySize, algorithm);
    setSimulationResult(result);
    setCurrentStep(1);
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
            />
          </div>

          {/* Right side - Visualization */}
          <div className="flex-1">
            <SimulationVisualization
              result={simulationResult}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
