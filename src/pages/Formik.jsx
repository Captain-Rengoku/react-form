import { Check, LoaderPinwheel, ToggleLeft, ToggleRight } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

const FormikForm = () => {
  const [backendBlocked, setBackendBlocked] = useState(false);

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "test@gmail.com",
    password: "",
    language: "",
    agree: false,
  };

  const validate = (values) => {
    const errors = {};

    if (!values.firstName) errors.firstName = "First name is required";
    else if (values.firstName.length < 4)
      errors.firstName = "First name must be at least 4 characters long";
    else if (values.firstName.length > 10)
      errors.firstName = "First name maximum 10 characters long";

    if (!values.lastName) errors.lastName = "Last name is required";
    else if (values.lastName.length < 4)
      errors.lastName = "Last name must be at least 4 characters long";
    else if (values.lastName.length > 10)
      errors.lastName = "Last name maximum 10 characters long";
    else if (!/^[A-Za-z]+$/i.test(values.lastName))
      errors.lastName = "Last Name is not as per the rules (letters only)";

    if (!values.email) errors.email = "Email is required";
    else if (!values.email.includes("@")) errors.email = "Email must include @";

    if (!values.password) errors.password = "Password is required";
    else if (values.password.length < 8)
      errors.password = "Password must have at least 8 characters";

    if (!values.language) errors.language = "Please select a language";

    if (!values.agree)
      errors.agree = "You must agree to the terms and conditions";

    return errors;
  };

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      if (backendBlocked) throw new Error();
      console.log(values);
      alert(`FormData Submitted: ${JSON.stringify(values, null, 2)}`);
      resetForm();
    } catch {
      setErrors({ root: "Some backend error has happened" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[95svh] bg-slate-950 flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full sm:max-w-3xl bg-slate-900 rounded-2xl p-8 shadow-xl backdrop-blur-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mb-6">
          Formik Form Demo
        </h1>

        {/* Backend Toggle */}
        <div className="flex justify-end items-center text-xl text-slate-400 gap-2 mb-6">
          {backendBlocked ? "Backend Blocked" : "Backend Linked"}
          <button
            onClick={() => setBackendBlocked((prev) => !prev)}
            className="cursor-pointer outline-none transition-transform duration-200 active:scale-90"
          >
            {backendBlocked ? (
              <ToggleRight size={28} className="text-red-500" />
            ) : (
              <ToggleLeft size={28} className="text-green-500" />
            )}
          </button>
        </div>

        {/* 🧾 Formik Form */}
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="space-y-5">
              {/* First Name */}
              <div className="flex flex-col">
                <label className="text-sm text-indigo-300 font-semibold mb-1">
                  First Name:
                </label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                    errors.firstName
                      ? "focus:ring-red-400"
                      : "focus:ring-indigo-500"
                  }`}
                />
                <ErrorMessage
                  name="firstName"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Middle Name */}
              <div className="flex flex-col">
                <label className="text-sm text-indigo-300 font-semibold mb-1">
                  Middle Name:
                </label>
                <Field
                  type="text"
                  name="middleName"
                  placeholder="Enter middle name (optional)"
                  className="p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label className="text-sm text-indigo-300 font-semibold mb-1">
                  Last Name:
                </label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                    errors.lastName
                      ? "focus:ring-red-400"
                      : "focus:ring-indigo-500"
                  }`}
                />
                <ErrorMessage
                  name="lastName"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm text-indigo-300 font-semibold mb-1">
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "focus:ring-red-400"
                      : "focus:ring-indigo-500"
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label className="text-sm text-indigo-300 font-semibold mb-1">
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "focus:ring-red-400"
                      : "focus:ring-indigo-500"
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Select Dropdown */}
              <div className="flex flex-col">
                <label className="text-sm text-indigo-300 font-semibold mb-1">
                  Favorite Language
                </label>
                <Field
                  as="select"
                  name="language"
                  className="p-2 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">-- Select --</option>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="react">React</option>
                  <option value="nextjs">Next Js</option>
                </Field>
                <ErrorMessage
                  name="language"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              {/* Checkbox */}
              <div className="flex">
                <label className="flex items-center gap-2 cursor-pointer py-2">
                  <Field type="checkbox" name="agree" className="hidden peer" />
                  <div
                    className="w-5 h-5 border-3 border-gray-400 rounded-md peer-hover:bg-indigo-600 peer-checked:bg-indigo-500 
                  peer-checked:border-indigo-500 text-slate-900 peer-checked:text-white transition"
                  >
                    <Check size={16} className="" />
                  </div>
                  I agree to the terms and conditions
                </label>
              </div>
              <ErrorMessage
                name="agree"
                component="p"
                className="text-sm text-red-500"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className={`flex justify-center items-center w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition duration-300 ${
                  isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex justify-center items-center gap-1">
                    <LoaderPinwheel className="animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>

              {/* Root Error */}
              {errors.root && (
                <p className="text-red-400 text-center text-sm mt-1">
                  {errors.root}
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormikForm;
