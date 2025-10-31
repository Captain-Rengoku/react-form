import React, { useEffect, useState } from "react";

const FormValidation = () => {
  const initialData = { name: "", email: "", password: "", username: "" };
  const initialError = { name: "", email: "", password: "", username: "" };
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState(initialError);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 🔹 Debounced username validation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.username && formData.username.length < 4) {
        setError((prev) => ({
          ...prev,
          username: "Username must be at least 4 characters long",
        }));
      } else {
        setError((prev) => ({ ...prev, username: "" }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.username]);

  // 🔹 Password validation function
  function validatePassword(password) {
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password))
      return "Must contain at least one uppercase letter.";
    if (!/\d/.test(password)) return "Must include at least one number.";
    return "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newError = { ...initialError };

    if (!formData.name.trim()) {
      newError.name = "Name is required!";
      valid = false;
    }

    if (!emailPattern.test(formData.email)) {
      newError.email = "Please enter a valid email address.";
      valid = false;
    }

    const validationError = validatePassword(formData.password);
    if (validationError) {
      newError.password = validationError;
      valid = false;
    }

    if (formData.username.length < 4) {
      newError.username = "Username must be at least 4 characters long";
      valid = false;
    }

    setError(newError);

    if (valid) {
      console.log("✅ Submitted:", formData);
      alert(`Submitted:\nName: ${formData.name}\nEmail: ${formData.email}`);
      setFormData(initialData);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, email: value }));
    setError((prev) => ({
      ...prev,
      email: emailPattern.test(value) ? "" : "Invalid email format",
    }));
  };

  return (
    <div className="bg-slate-800 rounded-lg flex items-center justify-center w-xl p-2 sm:p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-slate-900 p-4 sm:p-6 rounded-lg shadow-lg w-full"
      >
        <h2 className="text-center text-indigo-400 text-xl font-semibold mb-2">
          Form Validation
        </h2>

        {/* Name */}
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Enter name"
          className="p-2 rounded-md border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {error.name && <p className="text-red-500 text-sm">{error.name}</p>}

        {/* Email with Real-Time Validation */}
        <input
          type="email"
          value={formData.email}
          onChange={handleEmailChange}
          placeholder="Enter email (real-time validation)"
          className={`p-2 rounded-md border bg-slate-800 text-white focus:outline-none focus:ring-2 ${
            error.email
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-600 focus:ring-green-500"
          }`}
        />
        {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

        {/* Username with Debounced Validation */}
        <input
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          placeholder="Enter username (debounced)"
          className={`p-2 rounded-md border bg-slate-800 text-white focus:outline-none focus:ring-2 ${
            error.username
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-600 focus:ring-green-500"
          }`}
        />
        {error.username && (
          <p className="text-red-500 text-sm">{error.username}</p>
        )}

        {/* Password */}
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Enter password"
          className="p-2 rounded-md border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {error.password && (
          <p className="text-red-500 text-sm">{error.password}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md mt-2 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormValidation;
