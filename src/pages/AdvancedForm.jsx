import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SuperAdvancedLoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes + clear messages
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (globalError) setGlobalError("");
    if (successMessage) setSuccessMessage("");
    if (error) setError("");

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Inline email validation
    if (name === "email" && value && !value.includes("@")) {
      setError("Invalid email address");
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setGlobalError("All fields are required");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      // Mock API call delay
      await new Promise((res) => setTimeout(res, 1500));

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      setSuccessMessage("Login successful!");
      toast.success("Login successful!");

      setFormData({ email: "", password: "" });
    } catch (err) {
      setGlobalError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Validation rule
  const isValid =
    formData.email.includes("@") && formData.password.length >= 6;

  return (
    <div className="min-h-[95svh] bg-slate-950 flex items-center justify-center p-6">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-5 text-white"
      >
        <h3 className="text-2xl font-semibold text-center mb-2 text-indigo-400">
          Super Advanced Login Form
        </h3>

        {/* ✅ Global error + success messages */}
        {globalError && (
          <div className="text-red-500 font-semibold text-sm text-center">
            {globalError}
          </div>
        )}
        {successMessage && (
          <div className="text-green-500 font-semibold text-sm text-center">
            {successMessage}
          </div>
        )}

        {/* ✅ Email Field */}
        <div className="flex flex-col gap-2">
          <label className="text-indigo-300">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
          {error && <span className="text-red-400 text-sm">{error}</span>}
        </div>

        {/* ✅ Password Field */}
        <div className="flex flex-col gap-2">
          <label className="text-indigo-300">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>

        {/* ✅ Submit Button with disabled + loader */}
        <button
          type="submit"
          disabled={!isValid || loading}
          className={`mt-2 py-2 rounded-md font-bold transition-all duration-300 flex items-center justify-center ${
            isValid && !loading
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              : "bg-gray-600 cursor-not-allowed opacity-60"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </button>

        {/* ✅ Example inline toast trigger (optional) */}
        <button
          type="button"
          onClick={() => toast("This is a custom inline toast!")}
          className="text-sm text-indigo-400 hover:underline self-center mt-1"
        >
          Show inline toast
        </button>
      </form>
    </div>
  );
}
