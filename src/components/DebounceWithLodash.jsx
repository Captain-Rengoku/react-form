"use client";

import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce"; // ✅ Reliable utility for debouncing function calls

export default function DebouncedInput() {
  // -----------------------------------------------------
  // 🧩 STATE SETUP
  // -----------------------------------------------------
  // `value` → Tracks the immediate input field value
  // `debouncedValue` → Updates only after the debounce delay
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // -----------------------------------------------------
  // ⚙️ DEBOUNCED FUNCTION (created once via useMemo)
  // -----------------------------------------------------
  // - `useMemo` ensures that the same debounced function is reused across renders.
  // - `debounce()` wraps `setDebouncedValue` so it only runs
  //    after the user stops typing for 500ms.
  // - Without `useMemo`, a new debounced function would be created on every render,
  //    breaking the debounce timing.
  const updateDebounced = useMemo(
    () => debounce((val) => setDebouncedValue(val), 500),
    []
  );

  // -----------------------------------------------------
  // 🔁 SIDE EFFECT TO UPDATE DEBOUNCED VALUE
  // -----------------------------------------------------
  // Whenever `value` changes (i.e., user types),
  // we call the debounced function, which will delay
  // updating `debouncedValue` by 500ms after the last keystroke.
  //
  // ✅ Cleanup:
  // - If the user types again before 500ms, the previous debounce timer is cleared.
  // - If the component unmounts, we cancel any pending debounce calls to prevent memory leaks.
  useEffect(() => {
    updateDebounced(value);
    return () => {
      updateDebounced.cancel(); // 🧹 Cleanup pending debounce
    };
  }, [value, updateDebounced]);

  // -----------------------------------------------------
  // 🧱 UI RENDERING
  // -----------------------------------------------------
  // Displays both the raw value (instant typing)
  // and the debounced value (after delay).
  return (
    <div className="w-full max-w-md bg-slate-800/60 p-4 rounded-lg text-white">
      <label className="text-indigo-300 font-semibold">
        Debounced Input (500ms):
      </label>

      {/* 📝 Input updates `value` immediately */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
        className="w-full mt-2 p-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* 🔍 Displays the latest debounced output */}
      <p className="mt-3 text-sm text-slate-300">
        Debounced Value:{" "}
        <span className="text-indigo-400">{debouncedValue}</span>
      </p>
    </div>
  );
}
