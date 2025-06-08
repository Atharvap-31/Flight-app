import { useEffect, useState } from "react";
import { FLIGHT_OPTIONS } from "../constants/FlightOptionConstant";
import { FieldArray, Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setFlights,setTripType } from "../redux/createSlice";
import { useNavigate } from "react-router";
const apiKey = import.meta.env.VITE_API_KEY;

const SearchFlights = () => {
  const flightSearchInitialValues = {
    tripType: "one-way",
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    multiCitySegments: [{ from: "", to: "", date: "" }],
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();


  async function fetchFlights(dep_iata, arr_iata, date) {
    try {
      const flightResponse = await axios.get(
        "https://api.aviationstack.com/v1/flights",
        {
          params: {
            access_key: apiKey,
            dep_iata,
            arr_iata,
          },
        }
      );

      const allFlights = flightResponse.data.data || [];

      const userDate = new Date(date).toISOString().split("T")[0];

      const calculatePrice = () =>
        Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;

      const filteredFlights = allFlights
        .filter((flight) => {
          const scheduledDate = flight?.departure?.scheduled?.split("T")[0];
          return scheduledDate === userDate;
        })
        .map((flight) => ({
          ...flight,
          price: calculatePrice(),
          select:false
        }));

      return filteredFlights;
    } catch (error) {
      console.error("Error in fetchFlights:", error);
      return [];
    }
  }

  const handleSubmit = async (values) => {
    try {
      const cityNames = [values.from, values.to].filter(Boolean);

      const requests = cityNames.map((city) =>
        axios.get("https://api.aviationstack.com/v1/cities", {
          params: { access_key: apiKey, city_name: city },
        })
      );

      const responses = await Promise.all(requests);
      const allCities = responses.flatMap((res) => res.data.data || []);

      const fromCity = allCities.find(
        (item) => item.city_name.toUpperCase() === values.from.toUpperCase()
      );
      const toCity = allCities.find(
        (item) => item.city_name.toUpperCase() === values.to.toUpperCase()
      );

      if (!fromCity || !toCity) {
        console.error("City data not found");
        return;
      }

      const dep_iata = fromCity.iata_code;
      const arr_iata = toCity.iata_code;

      const oneWayFlights = await fetchFlights(
        dep_iata,
        arr_iata,
        values.departureDate
      );

      let roundTripFlights = [];
      if (values.tripType === "round-trip") {
        roundTripFlights = await fetchFlights(
          arr_iata,
          dep_iata,
          values.returnDate
        );
      }

  
      dispatch(setFlights( [ {oneWayFlights:oneWayFlights,roundTripFlights:roundTripFlights}]  ));
      dispatch(setTripType(values.tripType));
      navigate("/viewflights");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-10 bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Search Flights
      </h2>

      <Formik
        initialValues={flightSearchInitialValues}

        onSubmit={handleSubmit}
      >
        {({ values }) => {
          return (
            <Form>
         
              <div className="flex justify-center gap-6 mb-10">
                {FLIGHT_OPTIONS.map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 
            ${
              values.tripType === type
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
                  >
                    <Field
                      type="radio"
                      name="tripType"
                      value={type}
                      className="hidden"
                    />
                    <span className="capitalize">{type.replace("-", " ")}</span>
                  </label>
                ))}
              </div>

              {(values.tripType === "one-way" ||
                values.tripType === "round-trip") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Field
                      type="text"
                      name="from"
                      placeholder="From"
                      className="p-4 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="from"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      type="text"
                      name="to"
                      placeholder="To"
                      className="p-4 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="to"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      type="date"
                      name="departureDate"
                      className="p-4 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="departureDate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {values.tripType === "round-trip" && (
                    <div>
                      <Field
                        type="date"
                        name="returnDate"
                        className="p-4 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="returnDate"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  )}
                </div>
              )}

              {values.tripType === "multi-city" && (
                <FieldArray name="multiCitySegments">
                  {({ push, remove }) => (
                    <div className="flex flex-col gap-6 mt-4">
                      {values.multiCitySegments.map((_, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start"
                        >
                          <div>
                            <Field
                              name={`multiCitySegments.${index}.from`}
                              placeholder="From"
                              className="p-4 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage
                              name={`multiCitySegments.${index}.from`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <Field
                              name={`multiCitySegments.${index}.to`}
                              placeholder="To"
                              className="p-4 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage
                              name={`multiCitySegments.${index}.to`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <Field
                              type="date"
                              name={`multiCitySegments.${index}.date`}
                              className="p-4 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage
                              name={`multiCitySegments.${index}.date`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 cursor-pointer text-sm underline hover:text-red-700 transition"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}

                      {values.multiCitySegments.length < 3 && (
                        <button
                          type="button"
                          onClick={() => push({ from: "", to: "", date: "" })}
                          className="text-blue-500 mt-2 underline hover:text-blue-700 transition self-start"
                        >
                          + Add Another Destination
                        </button>
                      )}
                    </div>
                  )}
                </FieldArray>
              )}

              <button
                type="submit"
                className="mt-10 w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-200 ease-in-out"
              >
                Search Flights
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SearchFlights;
