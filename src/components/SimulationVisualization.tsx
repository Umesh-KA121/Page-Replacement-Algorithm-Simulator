import type { SimulationResult } from "../types";

type SimulationVisualizationProps = {
  result: SimulationResult | null;
  currentStep: number;
  onStepChange: (step: number) => void;
};

const SimulationVisualization = ({
  result,
  currentStep,
  onStepChange,
}: SimulationVisualizationProps) => {
  if (!result || result.steps.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 shadow-lg">
        <p className="text-slate-400 text-center">
          Start a simulation to see the visualization
        </p>
      </div>
    );
  }

  const currentStepData = result.steps[currentStep - 1];
  const totalSteps = result.steps.length;

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">{result.totalHits}</p>
            <p className="text-sm text-slate-400">Total Hits</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">{result.totalFaults}</p>
            <p className="text-sm text-slate-400">Total Faults</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-sky-400">
              {(result.hitRatio * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-slate-400">Hit Ratio</p>
          </div>
        </div>
      </div>

      {/* Step Controls */}
      <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-100">
            Step {currentStep} of {totalSteps}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => onStepChange(1)}
              disabled={currentStep === 1}
              className="px-3 py-1 rounded-lg bg-slate-700 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              First
            </button>
            <button
              onClick={() => onStepChange(currentStep - 1)}
              disabled={currentStep === 1}
              className="px-3 py-1 rounded-lg bg-slate-700 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              Previous
            </button>
            <button
              onClick={() => onStepChange(currentStep + 1)}
              disabled={currentStep === totalSteps}
              className="px-3 py-1 rounded-lg bg-slate-700 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              Next
            </button>
            <button
              onClick={() => onStepChange(totalSteps)}
              disabled={currentStep === totalSteps}
              className="px-3 py-1 rounded-lg bg-slate-700 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              Last
            </button>
          </div>
        </div>

        {/* Step Slider */}
        <input
          type="range"
          min="1"
          max={totalSteps}
          value={currentStep}
          onChange={(e) => onStepChange(parseInt(e.target.value, 10))}
          className="w-full"
        />
      </div>

      {/* Current Step Visualization */}
      <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 shadow-lg">
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm font-medium text-slate-300">
              Requested Page:
            </span>
            <span className="text-xl font-bold text-sky-400">
              {currentStepData.requestedPage}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentStepData.isHit
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {currentStepData.isHit ? "HIT" : "FAULT"}
            </span>
          </div>
          {currentStepData.clockPointer !== undefined && (
            <p className="text-sm text-slate-400">
              Clock Pointer: {currentStepData.clockPointer + 1}
            </p>
          )}
        </div>

        {/* Frames Display */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-slate-300 mb-3">Memory Frames:</h4>
          <div className={`grid gap-3 ${
            currentStepData.frames.length <= 3 ? 'grid-cols-3' :
            currentStepData.frames.length <= 5 ? 'grid-cols-5' :
            currentStepData.frames.length <= 7 ? 'grid-cols-7' : 'grid-cols-10'
          }`}>
            {currentStepData.frames.map((frame, index) => (
              <div
                key={index}
                className={`rounded-lg border-2 p-4 text-center ${
                  frame.page === currentStepData.requestedPage
                    ? "border-emerald-500 bg-emerald-500/10"
                    : currentStepData.replacedFrameIndex === index
                    ? "border-red-500 bg-red-500/10"
                    : "border-slate-700 bg-slate-900/60"
                }`}
              >
                <div className="text-xs text-slate-400 mb-1">Frame {index + 1}</div>
                <div className="text-2xl font-bold text-slate-100 mb-2">
                  {frame.page || "—"}
                </div>
                {frame.page && (
                  <div className="text-xs text-slate-400 space-y-1">
                    <div>Load: {frame.loadTime}</div>
                    <div>Last: {frame.lastAccess}</div>
                    <div>Count: {frame.accessCount}</div>
                    {currentStepData.clockPointer !== undefined && (
                      <div>Ref: {frame.refBit ? "1" : "0"}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Explanation */}
        <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
          <p className="text-sm text-slate-300">{currentStepData.explanation}</p>
        </div>
      </div>

      {/* Sequence Overview */}
      <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 shadow-lg">
        <h4 className="text-sm font-medium text-slate-300 mb-3">Page Request Sequence:</h4>
        <div className="flex flex-wrap gap-2">
          {result.steps.map((step, index) => (
            <button
              key={index}
              onClick={() => onStepChange(step.step)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                step.step === currentStep
                  ? "bg-sky-500 text-slate-900"
                  : step.isHit
                  ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                  : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
              }`}
            >
              {step.requestedPage}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400">
          <span className="inline-block w-3 h-3 bg-emerald-500/20 border border-emerald-500 rounded mr-1"></span>
          Hit
          <span className="inline-block w-3 h-3 bg-red-500/20 border border-red-500 rounded mr-1 ml-3"></span>
          Fault
        </p>
      </div>
    </div>
  );
};

export default SimulationVisualization;

