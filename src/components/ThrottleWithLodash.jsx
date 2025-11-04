"use client";

import { useState, useEffect, useMemo } from "react";
import throttle from "lodash.throttle";

export default function ThrottleWithLodash() {
  const [value, setValue] = useState("");
  const [throttledValue, setThrottledValue] = useState("");

  // -----------------------------------------------------
  // THROTTLED FUNCTION (created once via useMemo)
  // -----------------------------------------------------
  // - `useMemo` ensures the same throttled function instance is reused across renders.
  // - `throttle()` wraps `setThrottledValue` so it only runs at most once every 1000ms (1 second).
  // - Without `useMemo`, the throttle timing would reset on each render.
  const updateThrottled = useMemo(
    () => throttle((val) => setThrottledValue(val), 1000),
    []
  );

  // -----------------------------------------------------
  // SIDE EFFECT TO UPDATE THROTTLED VALUE
  // -----------------------------------------------------
  // Whenever `value` changes (user types), we call the throttled function,
  // which ensures that `throttledValue` is updated at most once every 1000ms.
  //
  // Cleanup:
  // - When the component unmounts, cancel any pending trailing updates
  //   to avoid updating state after unmount.
  
  // Run throttled update whenever value changes
  useEffect(() => {
    updateThrottled(value);
  }, [value, updateThrottled]);

  // Cleanup once on unmount
  useEffect(() => {
    return () => updateThrottled.cancel();
  }, [updateThrottled]);

  return (
    <div className="w-full max-w-xl bg-slate-800/60 p-4 rounded-lg text-white">
      <label className="text-indigo-300 font-semibold">
        Throttled Input (1000ms):
      </label>

      {/* Input updates `value` immediately */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
        className="w-full mt-2 p-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Displays the latest throttled output */}
      <p className="mt-3 text-sm text-slate-300">
        Throttled Value:{" "}
        <span className="text-indigo-400">{throttledValue}</span>
      </p>
    </div>
  );
}
