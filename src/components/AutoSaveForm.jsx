"use client";

import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

export default function AutosaveForm() {
  const { register, watch, setValue } = useForm({
    defaultValues: { note: "" },
  });

  const [status, setStatus] = useState("Idle");

  // Watch form input value
  const note = watch("note");

  // Load saved note from localStorage on mount
  useEffect(() => {
    const savedNote = localStorage.getItem("autosave-note");
    if (savedNote) {
      setValue("note", savedNote);
      setStatus("Loaded from LocalStorage");
    }
  }, [setValue]);

  // Debounced save function (runs 1s after user stops typing)
  const debouncedSave = useMemo(
    () =>
      debounce(async (data) => {
        setStatus("Saving...");
        // simulate small delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        localStorage.setItem("autosave-note", data);
        setStatus("Saved to LocalStorage ✅");
      }, 1000),
    []
  );

  // Trigger save whenever note changes
  useEffect(() => {
    if (note !== undefined) {
      debouncedSave(note);
    }
    return () => debouncedSave.cancel();
  }, [note, debouncedSave]);

  return (
    <div className="w-full mx-auto bg-slate-800/70 p-2 sm:p-4 rounded-lg text-white">
      <h2 className="text-lg font-semibold text-indigo-300 mb-3">
        Autosave Note (Local Storage)
      </h2>

      <textarea
        {...register("note")}
        placeholder="Start typing your notes..."
        rows={6}
        className="w-full p-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <p className="mt-3 text-sm text-slate-400">
        Status:{" "}
        <span
          className={
            status.includes("Saved") || status.includes("Loaded")
              ? "text-green-400"
              : "text-yellow-400"
          }
        >
          {status}
        </span>
      </p>
    </div>
  );
}
