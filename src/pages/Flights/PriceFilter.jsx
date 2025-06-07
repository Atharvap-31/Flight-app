import React, { useState, useEffect } from 'react';

const PriceFilter = ({ minPrice, maxPrice, onChange }) => {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);

  const handleApply = () => {
    onChange({ min: Number(localMin), max: Number(localMax) });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm">
      <h2 className="text-lg font-semibold mb-2">Filter by Price</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="number"
          className="border p-2 w-1/2 rounded mr-2"
          value={localMin}
          min={minPrice}
          max={localMax}
          onChange={(e) => setLocalMin(e.target.value)}
          placeholder="Min"
        />
        <input
          type="number"
          className="border p-2 w-1/2 rounded"
          value={localMax}
          min={localMin}
          max={maxPrice}
          onChange={(e) => setLocalMax(e.target.value)}
          placeholder="Max"
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={handleApply}
      >
        Apply Filter
      </button>
    </div>
  );
};

export default PriceFilter;
