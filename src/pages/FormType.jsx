import React, { useRef, useState } from "react";

const FormType = () => {
  return (
    <div className="bg-slate-800 w-6xl rounded-lg flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-white p-2 sm:p-4">
      <Section title="Controlled Components">
        <ControlledForm />
      </Section>
      <Section title="Uncontrolled Components">
        <UncontrolledForm />
      </Section>
    </div>
  );
};

// Section wrapper for consistency
function Section({ title, children }) {
  return (
    <div className="bg-slate-900 p-4 sm:p-6 rounded-lg shadow-md w-full text-center min-h-[40svh]">
      <h2 className="text-indigo-400 text-2xl font-semibold text-center mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

// Controlled Component
function ControlledForm() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted Name: ${name}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="text-left text-indigo-300">
          Name:
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-500/80 transition-colors py-2 rounded-md font-semibold"
        >
          Submit
        </button>
      </form>
      <p className="mt-12 text-start text-slate-400">
        Controlled components in React are form elements whose values are
        managed by the component's state. Every time a user types or changes
        input, an event updates the React state, and that state becomes the
        single source of truth for the form data. This approach provides more
        control, allowing validation, formatting, and logic to happen
        dynamically as the user interacts with the form.
      </p>
    </>
  );
}

// Uncontrolled Component
function UncontrolledForm() {
  const nameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted Name: ${nameRef.current.value}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="text-left text-indigo-300">
          Name:
          <input
            ref={nameRef}
            type="text"
            placeholder="Enter your name"
            defaultValue="Default Value"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-500/80 transition-colors py-2 rounded-md font-semibold"
        >
          Submit
        </button>
      </form>
      <p className="mt-12 text-start text-slate-400">
        Uncontrolled components, on the other hand, rely on the DOM itself to
        manage form data using references (refs). Instead of tracking every
        input change in state, the data is accessed directly from the DOM only
        when needed-usually on form submission. While uncontrolled components
        are simpler and require less code, they offer less flexibility compared
        to the controlled components.
      </p>
    </>
  );
}

export default FormType;
