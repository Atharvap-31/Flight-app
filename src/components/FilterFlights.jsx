import React, { useEffect, useState } from "react";
import { FaAngleUp, FaChevronDown } from "react-icons/fa6";

const FilterFlights = ({
setOneWayFlightData,
setRoundTripFlightData,
airLines,
roundTripFlightsApiData,
flightsApiData
}) => {
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [showFilters, setShowFilters] = useState(false);



  useEffect(() => {
    if (selectedAirlines.length === 0) {
      setOneWayFlightData(flightsApiData);
      setRoundTripFlightData(roundTripFlightsApiData);
    } else {
      const filteredOneWay = flightsApiData.filter((flight) =>
        selectedAirlines.includes(flight.airline?.name)
      );

      const filteredRoundTrip = roundTripFlightsApiData.filter((flight) =>
        selectedAirlines.includes(flight.airline?.name)
      );

      setOneWayFlightData(filteredOneWay);
      setRoundTripFlightData(filteredRoundTrip);
    }
  }, [selectedAirlines, flightsApiData, roundTripFlightsApiData]);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md border border-gray-200">
      <div
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        <h2 className="text-xl font-semibold text-gray-900">
          ✈️ Filter by Airlines
        </h2>
        <button className="text-gray-600 transition">
          {showFilters ? <FaAngleUp /> : <FaChevronDown />}
        </button>
      </div>

      {showFilters && (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2 border-t pt-2">
          {[...new Set(airLines)].map((airline) => (
            <label
              key={airline}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-all"
            >
              <input
                type="checkbox"
                value={airline}
                checked={selectedAirlines.includes(airline)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAirlines([...selectedAirlines, airline]);
                  } else {
                    setSelectedAirlines(
                      selectedAirlines.filter((a) => a !== airline)
                    );
                  }
                }}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-800 font-medium">{airline}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};


export default FilterFlights;
