const Controls = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
      <h2 className="font-semibold text-lg">Controls</h2>

      <button className="w-full py-2 bg-red-500 text-white rounded">
        Detect Deadlock
      </button>

      <button className="w-full py-2 bg-blue-600 text-white rounded">
        Run Banker’s Algorithm
      </button>

      <button className="w-full py-2 bg-gray-600 text-white rounded">
        Reset Graph
      </button>
    </div>
  );
};

export default Controls;
