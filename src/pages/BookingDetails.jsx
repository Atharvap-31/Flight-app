import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const BookingDetails = (s) => {
  const { id } = useParams();

  const flights = useSelector((state) => state.flights.flights);

  const uniqueDetails = flights?.filter((item) => item.flight.number === id);

  return (
    <div className="m-4">
      {uniqueDetails.map((f) => {
        const {
          aircraft,
          airline,
          arrival,
          departure,
          flight: flightInfo,
          flight_date,
          flight_status,
          price,
        } = f;

        return (
          <div className="flex justify-between items-center">
            <div
              key={flightInfo.iata}
              className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                {/* Airline & Flight */}
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

              {/* Departure and Arrival info */}
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

              {/* Aircraft info */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  Aircraft
                </h4>
                <p className="text-gray-700">
                  Registration: {aircraft?.registration} | IATA:{" "}
                  {aircraft?.iata} | ICAO: {aircraft?.icao}
                </p>
              </div>

              {/* Flight number and price */}
              <div className="flex justify-between items-center border-t pt-4">
                <p className="text-gray-700 font-semibold">
                  Flight No: {flightInfo.number} ({flightInfo.iata})
                </p>
                <p className="text-xl font-bold text-blue-700">₹{price}</p>
              </div>
            </div>

            <Formik>
              <Form></Form>
            </Formik>
          </div>
        );
      })}
    </div>
  );
};

export default BookingDetails;
