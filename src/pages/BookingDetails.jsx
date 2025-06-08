import { Form, Formik, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import BookingModal from "../atoms/BookingModal";
import ConfirmationPage from "./Flights/ConfirmationPage";

const BookingDetails = () => {
  const { id, roundtripId } = useParams();
  const tripType = useSelector((state) => state.flights.tripType);

  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    pincode: "",
    address: "",
    country: "",
    city: "",
    state: "",
  });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    pincode: Yup.string()
      .matches(/^\d{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
  });

  const flightsReduxData = useSelector((state) => state.flights.flights);

  const flights = [
    ...flightsReduxData[0].oneWayFlights,
    ...flightsReduxData[0].roundTripFlights,
  ];

  const uniqueDetails = flights?.filter(
    (item) => item.flight.number === id || item.flight.number === roundtripId
  );

  const totalPrice = uniqueDetails.reduce(
    (acc, flight) => acc + flight.price,
    0
  );

  const generateBookingId = () => {
    return "BOOK-" + Date.now();
  };

  const handleSubmit = (values) => {
    const passengerDetails = values;
    const flightDetails = uniqueDetails;

    const isSuccess = true;

    if (isSuccess) {
      const bookingId = generateBookingId();
      const booking = { bookingId, passengerDetails, flightDetails };

      const existingBookings =
        JSON.parse(localStorage.getItem("bookings")) || [];
      const updatedBookings = [ booking,...existingBookings];
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      localStorage.setItem("CurrentBookings", JSON.stringify([booking]));

      navigate("/confirmation", { state: { booking, id } });
    } else {
      alert("Payment Failed. Try again.");
    }
  };

  return (
    <div className="m-4 flex">
      <div>
        {uniqueDetails.map((flight) => {
          const {
            aircraft,
            airline,
            arrival,
            departure,
            flight: flightInfo,
            flight_date,
            flight_status,
            price,
          } = flight;

          return (
            <div
              key={flightInfo.iata}
              className="flex flex-col md:flex-row gap-6 items-start mb-10"
            >
              <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-700">
                      {airline.name} ({airline.iata})
                    </h3>
                    <p className="text-gray-600">
                      Flight: {flightInfo.iata} | Date: {flight_date}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-white font-semibold ${
                      flight_status === "landed"
                        ? "bg-green-600"
                        : flight_status === "cancelled"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {flight_status.toUpperCase()}
                  </div>
                </div>

                <div className="flex justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      Departure
                    </h4>
                    <p className="text-gray-700">{departure.airport}</p>
                    <p className="text-gray-500 text-sm">
                      Terminal: {departure.terminal || "N/A"} | Timezone:{" "}
                      {departure.timezone}
                    </p>
                    <p className="text-sm font-mono mt-1">
                      IATA: {departure.iata} | ICAO: {departure.icao}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      Arrival
                    </h4>
                    <p className="text-gray-700">{arrival.airport}</p>
                    <p className="text-gray-500 text-sm">
                      Terminal: {arrival.terminal || "N/A"} | Timezone:{" "}
                      {arrival.timezone}
                    </p>
                    <p className="text-sm font-mono mt-1">
                      IATA: {arrival.iata} | ICAO: {arrival.icao}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Aircraft
                  </h4>
                  <p className="text-gray-700">
                    Registration: {aircraft?.registration} | IATA:{" "}
                    {aircraft?.iata} | ICAO: {aircraft?.icao}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t pt-4">
                  <p className="text-gray-700 font-semibold">
                    Flight No: {flightInfo.number} ({flightInfo.iata})
                  </p>
                  <p className="text-xl font-bold text-blue-700">₹{price}</p>
                </div>
              </div>
            </div>
          );
        })}
        {tripType === "round-trip" && (
          <div className="flex justify-between items-center border-t pt-4 px-5">
            <p className="text-gray-700 font-semibold">Total Price</p>
            <p className="text-xl font-bold text-blue-700">₹{totalPrice}</p>
          </div>
        )}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              Passenger Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <Field
                  name="firstName"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <Field
                  name="lastName"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Field
                  name="phoneNumber"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4 border-b pb-2">
              Billing Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pincode
                </label>
                <Field
                  name="pincode"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="pincode"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <Field
                  name="address"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <Field
                  name="country"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <Field
                  name="city"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <Field
                  name="state"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg  bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer"
            >
              Book
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingDetails;
