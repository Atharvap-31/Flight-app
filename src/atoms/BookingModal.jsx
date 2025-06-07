import React from "react";

const BookingModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Booking Confirmed!
        </h2>
        <p className="mb-2">
          <strong>Booking ID:</strong> {booking.bookingId}
        </p>
        <p className="mb-2">
          <strong>Name:</strong> {booking.passengerDetails.firstName}{" "}
          {booking.passengerDetails.lastName}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {booking.passengerDetails.email}
        </p>
        <p className="mb-2">
          <strong>Flight:</strong>{" "}
          {booking?.flightDetails[0]?.departure?.airport} -{" "}
          {booking?.flightDetails[0]?.arrival?.airport}
        </p>
        <p className="mb-2">
          <strong>Price :</strong> {booking?.flightDetails[0]?.price}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
