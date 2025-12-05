import Header from "../components/header";
import ButtonBar from "../components/ButtonBar";
import Graph from "../components/Graph";
import Controls from "../components/Controls";
import AllocationMatrix from "../components/AllocationMatrix";
import RequestMatrix from "../components/RequestMatrix";

const Home = () => {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-4">

      {/* TOP HEADER */}
      <Header />

      {/* BUTTON BAR BELOW HEADER */}
      <ButtonBar />

      {/* MAIN AREA: LEFT GRAPH + RIGHT PANEL */}
      <div className="flex w-full gap-4 mt-2">

        {/* LEFT SIDE → GRAPH */}
        <div className="flex flex-col flex-[3] bg-white rounded-xl shadow p-4">
          <Graph />
        </div>

        {/* RIGHT SIDE → CONTROLS + MATRICES */}
        <div className="flex flex-col flex-[1] gap-4">

          <Controls />

          <AllocationMatrix />

          <RequestMatrix />

        </div>
      </div>
    </div>
  );
};

export default Home;
