import { useForm } from "react-hook-form";
import { Check, LoaderPinwheel, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "test@gmail.com",
    },
  });

  const [backendBlocked, setBackendBlocked] = useState(false);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      if (backendBlocked) throw new Error();
      console.log(data);
      alert(`FormData Submitted: ${JSON.stringify(data, null, 2)}`);
    } catch {
      // setError("email", {
      //   message: "This email is already taken",
      // });
      setError("root", {
        message: "Some backend error has happened",
      });
    }
  };

  return (
    <div className="w-xl bg-slate-800 rounded-lg flex flex-col items-center justify-center p-2 sm:p-4 text-white">
      <div className="w-full bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mb-6">
          React Hook Form Demo
        </h1>
        <div className="flex justify-end items-center text-xl text-slate-400 gap-2 mb-6">
          {backendBlocked ? "Backend Blocked" : "Backend Linked"}
          <button
            onClick={() => setBackendBlocked((prev) => !prev)}
            className="cursor-pointer outline-none transition-transform duration-200 active:scale-90"
          >
            {backendBlocked ? (
              <ToggleRight size={28} className="text-red-500" />
            ) : (
              <ToggleLeft size={28} className="text-green-500" />
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-sm text-indigo-300 font-semibold mb-1">
              First Name:
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.firstName
                  ? "focus:ring-red-400"
                  : "focus:ring-indigo-500"
              }`}
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 4,
                  message: "First name must be at least 4 characters long",
                },
                maxLength: {
                  value: 10,
                  message: "First name maximum 10 characters long",
                },
              })}
            />
            {errors.firstName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Middle Name */}
          <div className="flex flex-col">
            <label className="text-sm text-indigo-300 font-semibold mb-1">
              Middle Name:
            </label>
            <input
              type="text"
              placeholder="Enter middle name (optional)"
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("middleName")}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-sm text-indigo-300 font-semibold mb-1">
              Last Name:
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.lastName ? "focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 4,
                  message: "Last name must be at least 4 characters long",
                },
                maxLength: {
                  value: 10,
                  message: "Last name maximum 10 characters long",
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Last Name is not as per the rules (letters only)",
                },
              })}
            />
            {errors.lastName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-indigo-300 font-semibold mb-1">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
              {...register("email", {
                required: "Email is required",
                validate: (value) => {
                  if (!value.includes("@")) {
                    return "Email must include @";
                  }
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm text-indigo-300 font-semibold mb-1">
              Password:
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Select Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm text-indigo-300 font-semibold mb-1">
              Favorite Language
            </label>
            <select
              {...register("language")}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Select --</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="react">React</option>
              <option value="nextjs">Next Js</option>
            </select>
            {errors.language && (
              <p className="text-sm text-red-500">{errors.language.message}</p>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex">
            <label className="flex items-center gap-2 cursor-pointer py-2">
              <input
                type="checkbox"
                {...register("agree")}
                className="hidden peer"
              />
              <div className="w-5 h-5 border-3 border-gray-400 rounded-md peer-hover:bg-indigo-600 peer-checked:bg-indigo-500 
              peer-checked:border-indigo-500 text-slate-900 peer-checked:text-white transition">
                <Check size={16} className=""/>
              </div>
              I agree to the terms and conditions
            </label>
          </div>
          {errors.agree && (
            <p className="text-sm text-red-500">{errors.agree.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`flex justify-center items-center w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition duration-300 ${
              isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex justify-center items-center gap-1">
                <LoaderPinwheel className="animate-spin" />
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
          {errors.root && (
            <p className="text-red-400 text-center text-sm mt-1">
              {errors.root.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReactHookForm;
