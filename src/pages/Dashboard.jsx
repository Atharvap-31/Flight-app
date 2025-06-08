import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SearchFlights = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  console.log(JSON.parse(localStorage.getItem("bookings")));

  const filteredBookings = bookings.filter((booking) =>
    booking.flightDetails[0].airline.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Dashboard
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-4 rounded shadow-md mb-6">
        <input
          type="text"
          placeholder="Search by airline..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {filteredBookings?.length > 0 ? (
          filteredBookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow border hover:shadow-lg transition"
            >
              {booking.flightDetails.map((flight, i) => (
                <div
                  key={i}
                  className="mb-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">
                    {flight.airline.name} - {flight.airline.iata}
                  </h2>
                  <p>
                    <strong>Flight No:</strong> {flight.flight.number}
                  </p>
                  <p>
                    <strong>Date:</strong> {flight.flight_date}
                  </p>
                  <p>
                    <strong>Departure:</strong> {flight.departure.airport} at{" "}
                    {new Date(flight.departure.scheduled).toLocaleTimeString()}
                  </p>
                  <p>
                    <strong>Arrival:</strong> {flight.arrival.airport} at{" "}
                    {new Date(flight.arrival.scheduled).toLocaleTimeString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {flight.flight_status}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{flight.price}
                  </p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchFlights;
