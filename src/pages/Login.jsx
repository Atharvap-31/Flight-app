import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import bcrypt from "bcryptjs";

const Login = () => {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values, { setSubmitting, setErrors }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === values.email);

    if (!user) {
      setErrors({ email: "User not found" });
      setSubmitting(false);
      return;
    }

    const isPasswordCorrect = bcrypt.compareSync(
      values.password,
      user.password
    );
    if (!isPasswordCorrect) {
      setErrors({ password: "Incorrect password" });
      setSubmitting(false);
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful!");

    if (user.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 p-4">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {() => (
          <Form className="bg-white/40 backdrop-blur-md shadow-2xl rounded-3xl px-10 py-12 w-full max-w-md border border-white/30">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight">
              Welcome Back
            </h2>

            {/* Email Field */}
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="w-full mb-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white/60 backdrop-blur"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="mb-4 text-sm text-red-500 font-semibold"
            />

            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="w-full mb-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white/60 backdrop-blur"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="mb-4 text-sm text-red-500 font-semibold"
            />

           
            <button
              type="submit"
              className="w-full cursor-pointer mt-6 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-200 ease-in-out"
            >
              Log In
            </button>
            <p className="mt-3 text-black font-medium">
              If You dont have a Accout please Sign Up
            </p>
            <div className="pt-5 flex  justify-end items-center mx-2">
              <button
                onClick={() => navigate("/signup")}
                className="text-red-600 underline font-medium cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
