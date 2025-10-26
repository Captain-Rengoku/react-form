import React, { useState } from "react";

const AllInputs = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    age: "",
    comments: "",
    gender: "",
    country: "",
    subscribe: false,
    join: false,
    color: "#4f46e5",
    date: "",
    range: 50,
    file: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Form submitted!\nFile: ${formData.file?.name || "No file uploaded"}`
    );
    console.log(formData);
  };

  return (
    <div className="min-h-[95svh] bg-slate-950 flex items-center justify-center py-4 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 text-white w-full max-w-lg p-6 rounded-xl shadow-lg space-y-3 border border-slate-800"
      >
        <h2 className="text-indigo-400 text-2xl font-semibold text-center mb-4">
          All Input Types (Controlled Form)
        </h2>

        {/* Text */}
        <div>
          <label className="block mb-1 text-indigo-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-indigo-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-indigo-300">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Number */}
        <div>
          <label className="block mb-1 text-indigo-300">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Textarea */}
        <div>
          <label className="block mb-1 text-indigo-300">Comments</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Radio */}
        <div>
          <label className="block mb-1 text-indigo-300">Gender</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                className="accent-indigo-500 hover:accent-indigo-400"
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                className="accent-indigo-500 hover:accent-indigo-400"
              />
              Female
            </label>
          </div>
        </div>

        {/* Select */}
        <div>
          <label className="block mb-1 text-indigo-300">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select</option>
            <option value="india">India</option>
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
          </select>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
            className="accent-indigo-500 hover:accent-indigo-400"
          />
          <label>Subscribe to newsletter</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="join"
            checked={formData.join}
            onChange={handleChange}
            className="accent-indigo-500 hover:accent-indigo-400"
          />
          <label>Join as member</label>
        </div>

        {/* Color */}
        <div>
          <label className="block mb-1 text-indigo-300">Favorite Color</label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-16 h-10 border-none"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 text-indigo-300">Select Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Range */}
        <div>
          <label className="block mb-1 text-indigo-300">
            Range: <span className="text-indigo-400">{formData.range}</span>
          </label>
          <input
            type="range"
            name="range"
            min="0"
            max="100"
            value={formData.range}
            onChange={handleChange}
            className="w-full accent-indigo-500 hover:accent-indigo-600"
          />
        </div>

        {/* File */}
        <div>
          <label className="block mb-1 text-indigo-300">Upload File</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
          />
          {formData.file && (
            <p className="text-sm text-indigo-400 mt-1">
              Selected File: {formData.file.name}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-500/80 transition-colors py-2 rounded-md font-semibold"
        >
          Submit
        </button>
        {/* Reset */}
        <button
          type="reset"
          className="w-full bg-red-500 hover:bg-red-500/80 transition-colors py-2 rounded-md font-semibold"
          onClick={() => setFormData(initialFormData)}
        >
          Reset Form
        </button>
      </form>
    </div>
  );
};

export default AllInputs;
