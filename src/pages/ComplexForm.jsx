import { Plus, X } from "lucide-react";
import React, { useState } from "react";

const ComplexForm = () => {
  // Nested user info
  const [formData, setFormData] = useState({
    user: { firstName: "", lastName: "" },
  });

  // Skills checkboxes
  const [selected, setSelected] = useState([]);

  // Dynamic fields
  const [fields, setFields] = useState([{ id: 1, value: "" }]);

  // File upload
  const [file, setFile] = useState(null);

  // Date picker and range
  const [date, setDate] = useState("");
  const [range, setRange] = useState(50);

  // Multi-select
  const [multiSelected, setMultiSelected] = useState([]);

  // Handle nested inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      user: { ...prev.user, [name]: value },
    }));
  };

  // Handle checkboxes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  // Handle dynamic fields
  const addField = () => setFields([...fields, { id: Date.now(), value: "" }]);
  const removeField = (id) => setFields(fields.filter((field) => field.id !== id));
  const handleFieldChange = (id, value) =>
    setFields(fields.map((field) => (field.id === id ? { ...field, value } : field)));

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  // Handle multi-select
  const handleMultiSelectChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setMultiSelected(values);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("User:", formData.user);
    console.log("Skills:", selected);
    console.log("Dynamic Fields:", fields);
    console.log("File:", file);
    console.log("Date:", date);
    console.log("Range:", range);
    console.log("MultiSelect:", multiSelected);

    if (!file) return alert("Please select a file before submitting!");

    const uploadData = new FormData();
    uploadData.append("file", file);

    // Example upload (placeholder)
    fetch("/api/upload", {
      method: "POST",
      body: uploadData,
    });

    alert(
      `User Info:\nName: ${formData.user.firstName} ${
        formData.user.lastName
      }\nSkills: ${selected.join(", ") || "None"}\nFields: ${
        fields.map((f) => f.value).join(", ") || "None"
      }\nFile: ${file?.name || "None"}\nDate: ${date || "Not selected"}\nRange: ${
        range
      }\nMultiSelect: ${multiSelected.join(", ") || "None"}`
    );
  };

  return (
    <div className="min-h-[95svh] bg-slate-950 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-4 rounded-xl shadow-lg text-white w-full max-w-md flex flex-col gap-5"
      >
        <h2 className="text-2xl font-semibold text-indigo-400 text-center mb-2">
          Complex Form Example
        </h2>

        {/* User Info */}
        <div className="flex flex-col gap-3">
          <input
            name="firstName"
            value={formData.user.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="p-2 rounded-md border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="lastName"
            value={formData.user.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="p-2 rounded-md border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-2 mt-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="HTML"
              onChange={handleCheckboxChange}
              className="w-4 h-4 accent-indigo-500 cursor-pointer"
            />
            HTML
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="CSS"
              onChange={handleCheckboxChange}
              className="w-4 h-4 accent-indigo-500 cursor-pointer"
            />
            CSS
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="JavaScript"
              onChange={handleCheckboxChange}
              className="w-4 h-4 accent-indigo-500 cursor-pointer"
            />
            JavaScript
          </label>
        </div>

        {/* Dynamic Fields */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-indigo-300 mb-2">
            Dynamic Fields
          </h3>
          {fields.map((field) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                value={field.value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                placeholder="Enter value"
                className="flex-1 p-2 rounded-md border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => removeField(field.id)}
                className="bg-red-500/80 hover:bg-red-500/60 px-3 py-1 rounded-md text-white transition-all cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addField}
            className="flex justify-center items-center gap-1 bg-indigo-500 hover:bg-indigo-600 font-bold cursor-pointer text-white py-1.5 px-3 rounded-md text-sm transition-all"
          >
            <Plus size={18} /> Add Field
          </button>
        </div>

        {/* File Upload */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-indigo-300 mb-2">
            File Upload
          </h3>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-300 border border-slate-600 rounded-md cursor-pointer bg-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
          />
          {file && (
            <p className="text-green-400 text-sm mt-2">
              Selected File: <span className="font-medium">{file.name}</span>
            </p>
          )}
        </div>

        {/* Date Picker & Range */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-indigo-300 mb-2">
            Date & Range
          </h3>

          <label className="flex flex-col gap-1 mb-3">
            <span className="text-sm text-slate-300">Select Date:</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 rounded-md border border-slate-600 bg-slate-800 text-white focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-slate-300">Range (0–100):</span>
            <input
              type="range"
              min="0"
              max="100"
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
              className="accent-indigo-500"
            />
            <span
              className="text-center font-medium mt-1"
              style={{ color: `hsl(${range}, 70%, 60%)` }}
            >
              {range}
            </span>
          </label>
        </div>

        {/* Multi Select */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-indigo-300 mb-2">
            Multi Select
          </h3>
          <select
            multiple
            value={multiSelected}
            onChange={handleMultiSelectChange}
            className="w-full h-40 p-2 rounded-md border border-slate-600 bg-slate-800 text-white focus:ring-2 focus:ring-indigo-500"
          >
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="typescript">TypeScript</option>
            <option value="next">Next</option>
            <option value="tailwind">Tailwind</option>
          </select>
          {multiSelected.length > 0 && (
            <p className="text-green-400 text-sm mt-2">
              Selected: {multiSelected.join(", ")}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white font-medium py-2 rounded-md transition-all mt-4"
        >
          Submit
        </button>

        {/* Display Preview */}
        {(formData.user.firstName ||
          formData.user.lastName ||
          selected.length > 0 ||
          fields.some((f) => f.value) ||
          file ||
          date ||
          multiSelected.length > 0) && (
          <div className="mt-4 text-sm text-center text-green-400">
            <p>
              Name: {formData.user.firstName} {formData.user.lastName}
            </p>
            {selected.length > 0 && <p>Skills: {selected.join(", ")}</p>}
            {fields.some((f) => f.value) && (
              <p>Fields: {fields.map((f) => f.value).join(", ")}</p>
            )}
            {file && <p>File: {file.name}</p>}
            {date && <p>Date: {date}</p>}
            <p>Range: {range}</p>
            {multiSelected.length > 0 && (
              <p>Multi Select: {multiSelected.join(", ")}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default ComplexForm;
