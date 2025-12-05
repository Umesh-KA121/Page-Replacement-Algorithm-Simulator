const RequestMatrix = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-2">Request Matrix</h2>

      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Process</th>
            <th className="border px-2 py-1">R1</th>
            <th className="border px-2 py-1">R2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">P1</td>
            <td className="border px-2 py-1">0</td>
            <td className="border px-2 py-1">1</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">P2</td>
            <td className="border px-2 py-1">1</td>
            <td className="border px-2 py-1">0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RequestMatrix;
