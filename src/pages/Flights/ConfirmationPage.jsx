import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, id } = location.state;
  const currentBooking = JSON.parse(localStorage.getItem("CurrentBookings"));


  if (!booking) {
    return (
      <div className="p-6 text-center text-red-600">
        Booking data not found.
        <button
          onClick={() => navigate("/")}
          className="ml-4 text-blue-600 underline"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          🎉 Booking Confirmed!
        </h2>

        <div className="space-y-4 text-gray-800">
          <p>
            <strong>Booking ID:</strong> {booking.bookingId}
          </p>
          <p>
            <strong>Name:</strong> {booking.passengerDetails.firstName}{" "}
            {booking.passengerDetails.lastName}
          </p>
          <p>
            <strong>Email:</strong> {booking.passengerDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {booking.passengerDetails.phoneNumber}
          </p>

          <hr className="my-4" />

          {currentBooking[0].flightDetails.map((flight, index) => {
            return (
              <>
                <p>
                  <strong>Flight Number:</strong> {flight?.airline?.name}
                </p>
                <p>
                  <strong>Flight:</strong> {flight?.departure?.airport} →{" "}
                  {flight?.arrival?.airport}
                </p>
                <p>
                  <strong>Flight Number:</strong> {flight?.flight?.iata}
                </p>
                <p>
                  <strong>Price:</strong> ₹{flight?.price}
                </p>
              </>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              navigate(`/viewflights`);
              localStorage.setItem("CurrentBookings", null);
            }}
            className="bg-blue-600 cursor-pointer text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Go to View Flights
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
