"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function DependentDropdownForm() {
  // -----------------------------------------------------
  // Country-State mapping data
  // -----------------------------------------------------
  const countries = {
    USA: ["New York", "California", "Texas"],
    India: ["Maharashtra", "Delhi", "Karnataka"],
    Canada: ["Ontario", "Quebec", "British Columbia"],
  };

  // -----------------------------------------------------
  // React Hook Form setup
  // -----------------------------------------------------
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      country: "",
      state: "",
    },
  });

  const [states, setStates] = useState([]);

  // Watch for the selected country to handle changes dynamically
  const selectedCountry = watch("country");

  // -----------------------------------------------------
  // Handle country change → update state list
  // -----------------------------------------------------
  const handleCountryChange = (event) => {
    const selected = event.target.value;
    setValue("country", selected); // Update form value
    setStates(countries[selected] || []); // Update states dropdown
    setValue("state", ""); // Reset state when country changes
  };

  // -----------------------------------------------------
  // Submit handler
  // -----------------------------------------------------
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert(`Country: ${data.country}\nState: ${data.state}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-md mx-auto bg-slate-800/70 p-6 rounded-lg text-white"
    >
      {/* Country Dropdown */}
      <div>
        <label className="block text-sm font-medium text-indigo-300 mb-1">
          Select Country
        </label>
        <select
          {...register("country")}
          onChange={handleCountryChange}
          className="w-full p-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Select Country --</option>
          {Object.keys(countries).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* State Dropdown */}
      <div>
        <label className="block text-sm font-medium text-indigo-300 mb-1">
          Select State
        </label>
        <select
          {...register("state")}
          disabled={!selectedCountry}
          className="w-full p-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <option value="">-- Select State --</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-4 p-2 rounded bg-indigo-600 hover:bg-indigo-700 font-semibold cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}
