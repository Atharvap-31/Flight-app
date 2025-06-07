import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SearchFlights = () => {
  const [tripType, setTripType] = useState("one-way");
  const [multiCitySegments, setMultiCitySegments] = useState([
    { from: "", to: "", date: "" },
  ]);

  const handleSegmentChange = (index, field, value) => {
    const updated = [...multiCitySegments];
    updated[index][field] = value;
    setMultiCitySegments(updated);
  };

  const addSegment = () => {
    if (multiCitySegments.length < 3) {
      setMultiCitySegments((prev) => [...prev, multiCitySegments]);
    }
  };

  const removeSegment = (index) => {
    setMultiCitySegments(multiCitySegments.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-10 bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Search Flights
      </h2>

      {/* Trip Type Toggle */}
      <div className="flex justify-center gap-6 mb-10">
        {["one-way", "round-trip", "multi-city"].map((type) => (
          <label
            key={type}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 
          ${
            tripType === type
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300"
          }`}
          >
            <input
              type="radio"
              name="tripType"
              value={type}
              checked={tripType === type}
              onChange={(e) => setTripType(e.target.value)}
              className="hidden"
            />
            <span className="capitalize">{type.replace("-", " ")}</span>
          </label>
        ))}
      </div>

      {/* One-way / Round-trip Form */}
      {(tripType === "one-way" || tripType === "round-trip") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="From"
            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="To"
            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="Departure Date"
            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {tripType === "round-trip" && (
            <input
              type="date"
              placeholder="Return Date"
              className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      )}

      {/* Multi-city Form */}
      {tripType === "multi-city" && (
        <div className="flex flex-col gap-6">
          {multiCitySegments.map((segment, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
            >
              <input
                type="text"
                placeholder="From"
                value={segment.from}
                onChange={(e) =>
                  handleSegmentChange(index, "from", e.target.value)
                }
                className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="To"
                value={segment.to}
                onChange={(e) =>
                  handleSegmentChange(index, "to", e.target.value)
                }
                className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={segment.date}
                onChange={(e) =>
                  handleSegmentChange(index, "date", e.target.value)
                }
                className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {index > 0 && (
                <button
                  onClick={() => removeSegment(index)}
                  className="text-red-500 text-sm underline mt-1 hover:text-red-700 transition"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {multiCitySegments.length < 3 && (
            <button
              onClick={addSegment}
              className="text-blue-500 mt-2 underline hover:text-blue-700 transition self-start"
            >
              + Add Another Destination
            </button>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button className="mt-10 w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-200 ease-in-out">
        Search Flights
      </button>
    </div>
  );
};

export default SearchFlights;
