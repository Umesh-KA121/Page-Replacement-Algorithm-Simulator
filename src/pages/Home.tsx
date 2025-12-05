import Header from "../components/header";
import Controls from "../components/Controls";
import Graph from "../components/Graph";
import AllocationMatrix from "../components/AllocationMatrix";
import RequestMatrix from "../components/RequestMatrix";

const Home = () => {
  return (
    <div className="p-6 w-full flex flex-col gap-6">
      <Header />

      <div className="flex gap-6">
        
        {/* Graph Section */}
        <div className="flex flex-col flex-[2] bg-white rounded-xl shadow p-4">
          <div className="flex gap-3 mb-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Add Process</button>
            <button className="px-4 py-2 bg-green-600 text-white rounded">Add Resource</button>
          </div>

          <Graph />  
        </div>

        {/* Controls + Matrices */}
        <div className="flex flex-col flex-1 gap-4">

          <Controls />

          <AllocationMatrix />

          <RequestMatrix />

        </div>
      </div>
    </div>
  );
};

export default Home;
