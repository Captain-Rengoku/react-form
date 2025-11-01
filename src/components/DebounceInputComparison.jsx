"use client";

import { useState, useRef } from "react";

// Normal Input Component
export function NormalInput() {
  const [value, setValue] = useState("");

  const handleChange = (e) => setValue(e.target.value);

  return (
    <div className="w-full max-w-4xl bg-slate-800/60 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Type something..."
        className="p-2 w-full rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <p className="mt-3">
        <strong className="text-indigo-300">Live Value:</strong> {value}
      </p>
    </div>
  );
}

// Throttle Input Component
export function ThrottleInput() {
  const [value, setValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const throttleTimeout = useRef(null);
  const lastUpdate = useRef(0);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    const now = Date.now();

    if (now - lastUpdate.current >= 1000) {
      setDisplayValue(newValue);
      lastUpdate.current = now;
    } else {
      clearTimeout(throttleTimeout.current);
      throttleTimeout.current = setTimeout(() => {
        setDisplayValue(newValue);
        lastUpdate.current = Date.now();
      }, 1000 - (now - lastUpdate.current));
    }
  };

  return (
    <div className="w-full max-w-4xl bg-slate-800/60 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Type something..."
        className="p-2 w-full rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="mt-3">
        <p>
          <strong className="text-indigo-300">Typed:</strong> {value}
        </p>
        <p>
          <strong className="text-indigo-300">Updated Every 1000ms:</strong> {displayValue}
        </p>
      </div>
    </div>
  );
}

// Debounce Input Component
export function DebounceInput() {
  const [value, setValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const debounceTimeout = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDisplayValue(newValue);
    }, 500);
  };

  return (
    <div className="w-full max-w-4xl bg-slate-800/60 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type something..."
        className="p-2 w-full rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="mt-3">
        <p>
          <strong className="text-indigo-300">Typed:</strong> {value}
        </p>
        <p>
          <strong className="text-indigo-300">Updated After 500ms:</strong> {displayValue}
        </p>
      </div>
    </div>
  );
}
