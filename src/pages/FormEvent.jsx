import React, { useState } from "react";

const FormEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changed: ${name} = ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e) => {
    console.log(`Focused on: ${e.target.name}`);
  };

  const handleBlur = (e) => {
    console.log(`Blurred from: ${e.target.name}`);
  };

  const handleKeyDown = (e) => {
    console.log(`Key Down: ${e.key}`);
  };

  const handleKeyUp = (e) => {
    console.log(`Key Up: ${e.key}`);
  };

  const handleMouseEnter = (e) => {
    console.log(`Mouse entered on: ${e.target.name || e.target.type}`);
  };

  const handleMouseLeave = (e) => {
    console.log(`Mouse left from: ${e.target.name || e.target.type}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form Submitted!");
  };

  const handleReset = () => {
    console.log("Form Reset");
    setFormData({ name: "", email: "", age: "", comments: "" });
  };

  return (
    <div className="w-xl bg-slate-800 rounded-lg flex justify-center items-center p-2 sm:p-4">
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="w-full bg-slate-900 p-4 sm:p-6 rounded-lg text-white"
      >
        <h2 className="text-indigo-400 text-2xl font-semibold text-center mb-4">
          Form Events
        </h2>

        {/* Name */}
        <label className="block mb-3 text-indigo-300">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        {/* Email */}
        <label className="block mb-3 text-indigo-300">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        {/* Age */}
        <label className="block mb-3 text-indigo-300">
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </label>

        {/* Comments */}
        <label className="block mb-4 text-indigo-300">
          Comments:
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows="3"
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        {/* Buttons */}
        <div className="flex justify-between gap-6">
          <button
            type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-500/80 transition-colors py-2 rounded-lg font-semibold"
          >
            Submit
          </button>
          <button
            type="reset"
          className="w-full bg-red-500 hover:bg-red-500/80 transition-colors py-2 rounded-lg font-semibold"
          >
            Reset
          </button>
        </div>
        <p className="mt-12 text-start text-slate-400">
          To see all the events in action go to browser's console
        </p>
      </form>
    </div>
  );
};

export default FormEvent;
