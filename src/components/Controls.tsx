const Controls = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-3">
      <h2 className="font-semibold text-lg">controls</h2>

      <button className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded">
        Detect Deadlock
      </button>

      <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
        Run Banker’s Algorithm
      </button>

      <button className="w-full py-2 bg-gray-500 hover:bg-gray-600 text-white rounded">
        Reset Graph
      </button>
    </div>
  );
};

export default Controls;
