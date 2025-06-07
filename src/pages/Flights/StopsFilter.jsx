import React, { useState } from "react";
import { TIME_SLOT } from "../../constants/TimeSlotConstant";

const StopsFilter = ({ allFlights, setAllFlights, flights,setFlightData }) => {
  const [selectedStop, setSelectedStop] = useState("all");
  const [selectedSlot, setSelectedSlot] = useState("all");

  const getStopType = (flight) => {
    return flight?.flight?.codeshared ? "1-stop" : "non-stop";
  };

  const handleFilter = () => {
    const filtered = allFlights.filter((flight) => {
      const stopType = getStopType(flight);
      const depSlot = TIME_SLOT(flight?.departure?.scheduled);

      return (
        (selectedStop === "all" || stopType === selectedStop) &&
        (selectedSlot === "all" || depSlot === selectedSlot)
      );
    });
    setFlightData(filtered);
  };
 return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-2xl">
      <div className="flex gap-4 mb-4 flex-wrap">
        {/* Stop Filter */}
        <select
          className="border rounded px-3 py-2"
          value={selectedStop}
          onChange={(e) => setSelectedStop(e.target.value)}
        >
          <option value="all">All Stops</option>
          <option value="non-stop">Non-stop</option>
          <option value="1-stop">1 Stop</option>
        </select>

        {/* Time Slot Filter */}
        <select
          className="border rounded px-3 py-2"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          <option value="all">All Time Slots</option>
          <option value="morning">Morning (5AM–12PM)</option>
          <option value="afternoon">Afternoon (12PM–5PM)</option>
          <option value="evening">Evening (5PM–9PM)</option>
          <option value="night">Night (9PM–5AM)</option>
        </select>

        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default StopsFilter;
