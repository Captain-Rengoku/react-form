"use client";

import { useState, useMemo } from "react";

// General Throttle Function
function throttle(fn, limit) {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// General Debounce Function
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}


export default function GeneralInputs() {
  const [debouncedValue, setDebouncedValue] = useState("");
  const [throttledValue, setThrottledValue] = useState("");

  // useMemo so debounce/throttle are created once and stable
  const handleThrottledChange = useMemo(
    () => throttle((val) => setThrottledValue(val), 1000),
    []
  );

  const handleDebouncedChange = useMemo(
    () => debounce((val) => setDebouncedValue(val), 500),
    []
  );

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6 bg-slate-800/70 rounded-2xl p-6 shadow-xl backdrop-blur-md text-white">
      {/* Throttled Input */}
      <div>
        <label className="text-indigo-300 font-semibold">
          Throttled Input (1000ms):
        </label>
        <input
          type="text"
          onChange={(e) => handleThrottledChange(e.target.value)}
          placeholder="Try typing fast..."
          className="w-full p-2 mt-1 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <p className="mt-2 text-sm text-slate-300">
          Updated every 1000ms: {throttledValue}
        </p>
      </div>

      {/* Debounced Input */}
      <div>
        <label className="text-indigo-300 font-semibold">
          Debounced Input (500ms):
        </label>
        <input
          type="text"
          onChange={(e) => handleDebouncedChange(e.target.value)}
          placeholder="Try typing fast..."
          className="w-full p-2 mt-1 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <p className="mt-2 text-sm text-slate-300">
          Updated after 500ms: {debouncedValue}
        </p>
      </div>
    </div>
  );
}
