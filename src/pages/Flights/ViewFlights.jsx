import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterFlights from "../../components/FilterFlights";
import PriceFilter from "./PriceFilter";
import FlightSearchWithSlider from "../../components/FlightSearchWithSlider";
import { useNavigate } from "react-router";

const ViewFlights = () => {
  const flights = useSelector((state) => state.flights.flights);
  const [allFlights, setAllFlights] = useState([]);
  const [flightData, setFlightData] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const navigate = useNavigate();

  const airLines = flights?.map((item) => item.airline.name);

  useEffect(() => {
    setAllFlights(flights);
  }, [flights]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <div className="p-4 bg-white shadow rounded-lg w-full">
            <div className="space-y-2">
              <FilterFlights
                setSelectedAirlines={setSelectedAirlines}
                selectedAirlines={selectedAirlines}
                setFlightData={setFlightData}
                setAllFlights={setAllFlights}
                allFlights={allFlights}
                airLines={airLines}
                flights={flights}
              />
            </div>

            <div className="space-y-2">
              <FlightSearchWithSlider
                allFlights={allFlights}
                setAllFlights={setAllFlights}
                flights={flights}
              />
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {flightData?.map((flight, idx) => {
              const dep = flight.departure;
              const arr = flight.arrival;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 transition hover:shadow-2xl"
                >
                  {/* Airline Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {flight.airline?.name}
                      </h2>
                      <p className="text-sm text-gray-500 tracking-wide">
                        {flight.airline?.iata} / {flight.airline?.icao}
                      </p>
                    </div>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {dep?.airport.split(" ")[0]} →{" "}
                      {arr?.airport.split(" ")[0]}
                    </span>
                  </div>

                  {/* Flight Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <p className="text-xs font-semibold text-gray-400">
                        Departure
                      </p>
                      <p className="font-medium">{dep.airport}</p>
                      <p>
                        {new Date(dep.scheduled).toLocaleString("en-IN", {
                          timeZone: dep.timezone,
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                      <p className="text-xs text-gray-500">
                        Terminal {dep.terminal}, Gate {dep.gate || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400">
                        Arrival
                      </p>
                      <p className="font-medium">{arr.airport}</p>
                      <p>
                        {new Date(arr.scheduled).toLocaleString("en-IN", {
                          timeZone: arr.timezone,
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                      <p className="text-xs text-gray-500">
                        Terminal {arr.terminal}, Gate {arr.gate || "—"}
                      </p>
                      <p className="text-xs text-gray-500 font-bold">
                        Price: {flight.price} RS
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <span
                      className={`inline-flex items-center text-sm font-medium px-3 py-1 rounded-full ${
                        flight.landed
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {flight.landed ? "Landed" : "Scheduled"}
                    </span>

                    {dep.delay && (
                      <span className="text-xs font-medium text-red-600">
                        ⏱ Delay: {dep.delay} min
                      </span>
                    )}
                  </div>

                  <div className="flex justify-center items-center pt-6">
                    <button
                      onClick={() =>
                        navigate(`/viewflights/${flight.flight.number}`)
                      }
                      className="w-full bg-blue-500 text-white p-1 text-base rounded-lg cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewFlights;
