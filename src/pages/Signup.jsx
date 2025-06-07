import React, { useState } from "react";
import InputBox from "../atoms/InputBox";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router";
import FormComponent from "../components/FormComponent";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const SignupSchema = Yup.object().shape({
    email: Yup.string().trim().required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters."),
    role: Yup.string().oneOf(["user", "admin"]).required("Role is required."),
  });

  const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === values.email);

    if (userExists) {
      setErrors({ email: "User with this email already exists." });
      setSubmitting(false);
      return;
    }

    const hashedPassword = bcrypt.hashSync(values.password, 10);
    const newUser = { ...values, password: hashedPassword };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    resetForm();
    navigate("/");
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <Formik
    //     initialValues={form}
    //     validationSchema={SignupSchema}
    //     onSubmit={handleSubmit}
    //   >
    //     {({ values, handleChange, errors }) => {
    //       console.log(errors);

    //       return (
    //         <Form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    //           <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
    //           <div className="flex items-center gap-4 mb-8">
    //             <label className="flex items-center gap-2 cursor-pointer">
    //               <Field
    //                 as={InputBox}
    //                 type="radio"
    //                 name="role"
    //                 value="user"
    //                 checked={values.role === "user"}
    //                 onChange={handleChange}
    //                 className="cursor-pointer"
    //               />
    //               <span className="text-base leading-none">User</span>
    //             </label>

    //             <label className="flex items-center gap-2 cursor-pointer">
    //               <Field
    //                 as={InputBox}
    //                 type="radio"
    //                 name="role"
    //                 value="admin"
    //                 checked={values.role === "admin"}
    //                 onChange={handleChange}
    //                 className="cursor-pointer"
    //               />
    //               <span className="text-base leading-none">Admin</span>
    //             </label>
    //           </div>

    //           <Field
    //             as={InputBox}
    //             placeholder="Email"
    //             type="email"
    //             name="email"
    //             className={`w-full ${
    //               !errors.email ? "mb-4" : "mb-4"
    //             } p-2 border border-gray-300 rounded`}
    //           />
    //           {errors.email && (
    //             <ErrorMessage
    //               name="email"
    //               component="p"
    //               className=" text-sm mb-4 text-red-500 font-semibold"
    //             />
    //           )}

    //           <Field
    //             as={InputBox}
    //             placeholder="Password"
    //             type="password"
    //             name="password"
    //             lassName={`w-full ${
    //               errors.password ? "mb-4" : "mb-4"
    //             } p-2 border border-gray-300 rounded `}
    //           />
    //           {errors.password && (
    //             <ErrorMessage
    //               name="password"
    //               component="p"
    //               className="mb-4 text-sm text-red-500 font-semibold"
    //             />
    //           )}
    //           <button
    //             type="submit"
    //             className="w-full mt-4 bg-blue-500 cursor-pointer text-white p-2 rounded hover:bg-blue-600"
    //           >
    //             Submit
    //           </button>
    //         </Form>
    //       );
    //     }}
    //   </Formik>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
  <Formik
    initialValues={form}
    validationSchema={SignupSchema}
    onSubmit={handleSubmit}
  >
    {({ values, handleChange, errors }) => (
      <Form className="bg-white/40 backdrop-blur-md shadow-2xl rounded-3xl px-10 py-12 w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight">
          Create Your Account
        </h2>

        {/* Role selection */}
        <div className="flex justify-center gap-6 mb-10">
          <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium">
            <Field
              as={InputBox}
              type="radio"
              name="role"
              value="user"
              checked={values.role === "user"}
              onChange={handleChange}
              className="accent-purple-500"
            />
            <span>User</span>
          </label>

          <label className="flex items-center gap-2  cursor-pointer text-gray-700 font-medium">
            <Field
              as={InputBox}
              type="radio"
              name="role"
              value="admin"
              checked={values.role === "admin"}
              onChange={handleChange}
              className="accent-purple-500"
            />
            <span>Admin</span>
          </label>
        </div>

        {/* Email Field */}
        <Field
          as={InputBox}
          placeholder="Email"
          type="email"
          name="email"
          className="w-full mb-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/60 backdrop-blur"
        />
        <ErrorMessage
          name="email"
          component="p"
          className="text-sm mb-4 text-red-500 font-semibold"
        />

        {/* Password Field */}
        <Field
          as={InputBox}
          placeholder="Password"
          type="password"
          name="password"
          className="w-full mb-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/60 backdrop-blur"
        />
        <ErrorMessage
          name="password"
          component="p"
          className="text-sm mb-4 text-red-500 font-semibold"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-200 ease-in-out"
        >
          Sign Up
        </button>
      </Form>
    )}
  </Formik>
</div>

  );
};

export default Signup;
