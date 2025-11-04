"use client";

import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

export default function DebounceWithLodash() {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // -----------------------------------------------------
  // DEBOUNCED FUNCTION (created once via useMemo)
  // -----------------------------------------------------
  // - `useMemo` ensures that the same debounced function is reused across renders.
  // - `debounce()` wraps `setDebouncedValue` so it only runs after the user stops typing for 500ms.
  // - Without `useMemo`, a new debounced function would be created on every render, breaking the debounce timing.
  const updateDebounced = useMemo(
    () => debounce((val) => setDebouncedValue(val), 500),
    []
  );

  // -----------------------------------------------------
  // SIDE EFFECT TO UPDATE DEBOUNCED VALUE
  // -----------------------------------------------------
  // Whenever `value` changes (user types), we call the debounced function, 
  // which will delay updating `debouncedValue` by 500ms after the last keystroke.
  //
  // Cleanup:
  // - If the user types again before 500ms, the previous debounce timer is cleared.
  // - If the component unmounts, we cancel any pending debounce calls to prevent memory leaks.
  useEffect(() => {
    updateDebounced(value);
    return () => {
      // cleanup function Cleans up pending debounce
      updateDebounced.cancel(); 
    };
  }, [value, updateDebounced]);

  return (
    <div className="w-full max-w-xl bg-slate-800/60 p-4 rounded-lg text-white">
      <label className="text-indigo-300 font-semibold">
        Debounced Input (500ms):
      </label>

      {/* Input updates `value` immediately */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
        className="w-full mt-2 p-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Displays the latest debounced output */}
      <p className="mt-3 text-sm text-slate-300">
        Debounced Value:{" "}
        <span className="text-indigo-400">{debouncedValue}</span>
      </p>
    </div>
  );
}
