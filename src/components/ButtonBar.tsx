const ButtonBar = () => {
  return (
    <div className="flex gap-3 bg-white shadow p-3 rounded-xl">
      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Add Process
      </button>

      <button className="px-4 py-2 bg-green-600 text-white rounded">
        Add Resource
      </button>
    </div>
  );
};

export default ButtonBar;
