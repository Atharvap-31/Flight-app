import { useEffect, useMemo, useState } from "react";

const useUniqueAirlines = (flights) => {
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [allFlights, setAllFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [flightData, setFlightData] = useState([]);

  // Memoize unique airline names
  const airlineNames = useMemo(() => {
    const names = flights
      ?.map((flight) => flight.airline?.name)
      .filter(Boolean);
    return [...new Set(names)].sort();
  }, [flights]);

  // Apply filtering
  useEffect(() => {
    // When Redux data comes in
    setAllFlights(flights);
    setFlightData(flights);
  }, [flights]);

  useEffect(() => {
    if (selectedAirlines.length === 0) {
      setFlightData(allFlights);
    } else {
      const filtered = allFlights.filter((flight) =>
        selectedAirlines.includes(flight.airline?.name)
      );
      setFlightData(filtered);
    }
  }, [selectedAirlines, allFlights]);

  // Reset logic
  const reset = () => {
    setSelectedAirlines([]);
  };

  return {
    filteredFlights,
    airlineNames,
    selectedAirlines,
    setSelectedAirlines,
    reset,
    flightData
  };
};

export default useUniqueAirlines;
