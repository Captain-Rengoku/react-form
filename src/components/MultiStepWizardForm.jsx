"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import debounce from "lodash.debounce";

export default function MultiStepWizardForm() {
  const [step, setStep] = useState(1);
  const [usernameStatus, setUsernameStatus] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  // Initialize form with all fields active (not unregistered)
  const {
    register,
    handleSubmit,
    watch,
    trigger, // for manual validation per step
    formState: { errors },
  } = useForm({
    mode: "onChange",
    shouldUnregister: false,
  });

  // Watch input values
  const usernameValue = watch("username", "");

  // Debounced API check for username availability
  const checkUsername = useMemo(
    () =>
      debounce(async (username) => {
        if (!username.trim()) {
          setUsernameStatus("");
          setIsChecking(false);
          return;
        }
        setIsChecking(true);
        // Fake async check (simulate API delay)
        setUsernameStatus("Checking...");
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulated "database" check
        const taken = ["admin", "test", "user123"];
        if (taken.includes(username.toLowerCase())) {
          setUsernameStatus("Username already taken");
        } else {
          setUsernameStatus("Username available");
        }
        setIsChecking(false);
      }, 500),
    []
  );

  useEffect(() => {
    if (step === 4) checkUsername(usernameValue);
    return () => checkUsername.cancel();
  }, [usernameValue, step, checkUsername]);

  // Final form submission
  const onSubmit = (data) => {
    console.log("Final submitted data:", data);
    alert("Form submitted successfully!\n" + JSON.stringify(data, null, 2));
  };

  // Step validation before proceeding
  const nextStep = async () => {
    let isValid = false;
    if (step === 1) isValid = await trigger("name");
    if (step === 2) isValid = await trigger("email");
    if (step === 3) isValid = await trigger("password");
    if (step === 4) isValid = await trigger("username");

    if (isValid) setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl mx-auto mt-8 bg-slate-800/70 p-4 pb-2 rounded-2xl shadow-lg text-white"
    >
      {/* --------------------------------- STEP 1 --------------------------------- */}
      {step === 1 && (
        <div>
          <label className="block text-indigo-300 font-semibold mb-1">
            Name
          </label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
            placeholder="Enter your name"
            className={`p-2 w-full rounded-lg bg-slate-900 border ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-700 focus:ring-indigo-500"
            } focus:outline-none focus:ring-2`}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
      )}

      {/* --------------------------------- STEP 2 --------------------------------- */}
      {step === 2 && (
        <div>
          <label className="block text-indigo-300 font-semibold mb-1">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Enter your email"
            className={`p-2 w-full rounded-lg bg-slate-900 border ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-700 focus:ring-indigo-500"
            } focus:outline-none focus:ring-2`}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      )}

      {/* --------------------------------- STEP 3 --------------------------------- */}
      {step === 3 && (
        <div>
          <label className="block text-indigo-300 font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
            })}
            placeholder="Enter password"
            className={`p-2 w-full rounded-lg bg-slate-900 border ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-700 focus:ring-indigo-500"
            } focus:outline-none focus:ring-2`}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      )}

      {/* --------------------------------- STEP 4 (Debounced Username Check) --------------------------------- */}
      {step === 4 && (
        <div>
          <label className="block text-indigo-300 font-semibold mb-1">
            Username : <span className="text-slate-400">Taken name "admin", "test", "user123"</span>
          </label>
          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "At least 3 characters required",
              },
            })}
            placeholder="Choose a username"
            className={`p-2 w-full rounded-lg bg-slate-900 border ${
              errors.username
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-700 focus:ring-indigo-500"
            } focus:outline-none focus:ring-2`}
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
          {usernameStatus && (
            <p
              className={`mt-1 text-sm ${
                usernameStatus.includes("Username already taken")
                  ? "text-red-400"
                  : usernameStatus.includes("Username available")
                  ? "text-green-400"
                  : "text-slate-300"
              }`}
            >
              {usernameStatus}
            </p>
          )}
        </div>
      )}

      {/* --------------------------------- BUTTONS --------------------------------- */}
      <div className="relative flex gap-3 sm:justify-center items-center my-4 font-bold">
        <button
          type="button"
          onClick={prevStep}
          disabled={step === 1}
          className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={nextStep}
          disabled={step === 4}
          className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
        >
          Next
        </button>

        <button
          type="submit"
          disabled={
            step !== 4 ||
            !!errors.username ||
            usernameValue === "" ||
            isChecking ||
            usernameStatus.includes("Username already taken")
          }
          className="absolute right-0 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
        >
          Submit
        </button>
      </div>

      {/* --------------------------------- STEP INDICATOR --------------------------------- */}
      <div className="text-center mt-4 text-slate-400">Step {step} of 4</div>
    </form>
  );
}
