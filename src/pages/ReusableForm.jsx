import React, { useState } from "react";

const UnifiedForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const formFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Age", name: "age", type: "number" },
  ];

  const selectOptions = [
    { value: "student", label: "Student" },
    { value: "developer", label: "Developer" },
    { value: "designer", label: "Designer" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.name.trim()) newErrors.name = "Name is required";
    if (!values.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      newErrors.email = "Invalid email format";
    if (!values.age) newErrors.age = "Age is required";
    if (!values.role) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert(`Submitted Successfully:\n${JSON.stringify(values, null, 2)}`);
    console.log("Form Data:", values);
  };

  return (
    <div className="min-h-[95svh] bg-slate-950 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-xl shadow-lg text-white w-full max-w-md flex flex-col gap-5"
      >
        <h2 className="text-2xl font-semibold text-indigo-400 text-center mb-2">
          Reusable Dynamic Form
        </h2>

        {formFields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1">
            <label htmlFor={field.name} className="text-indigo-300">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={values[field.name]}
              onChange={handleChange}
              className={`p-2 rounded-md border ${
                errors[field.name] ? "border-red-500" : "border-slate-600"
              } bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors[field.name] && (
              <span className="text-red-400 text-sm">{errors[field.name]}</span>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <label htmlFor="role" className="text-indigo-300">
            Select Role
          </label>
          <select
            id="role"
            name="role"
            value={values.role}
            onChange={handleChange}
            className={`p-2 rounded-md border ${
              errors.role ? "border-red-500" : "border-slate-600"
            } bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            <option value="">Select...</option>
            {selectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.role && (
            <span className="text-red-400 text-sm">{errors.role}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white font-medium py-2 rounded-md transition-all mt-2"
        >
          Submit
        </button>

        {Object.values(values).some((v) => v) && (
          <div className="mt-4 text-sm text-center text-green-400">
            <p>Preview:</p>
            <pre className="bg-slate-800 text-slate-300 p-2 rounded-md text-left text-xs">
              {JSON.stringify(values, null, 2)}
            </pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default UnifiedForm;
