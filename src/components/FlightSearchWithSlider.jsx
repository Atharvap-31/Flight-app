import React, { useState, useMemo, useEffect } from "react";

const FlightSearchWithSlider = ({ allFlights, setAllFlights,flights }) => {
  const minPrice = 1000;
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    const filtered = flights.filter((flight) => {
      return flight.price >= minPrice && flight.price <= maxPrice;
    });
    setAllFlights(filtered);
  }, [maxPrice]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Filter Flights by Max Price</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Min: ₹{minPrice}</span>
          <span className="text-gray-700">Max: ₹{maxPrice}</span>
        </div>

        <input
          type="range"
          min={minPrice}
          max="10000"
          step="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
      </div>
    </div>
  );
};

export default FlightSearchWithSlider;
