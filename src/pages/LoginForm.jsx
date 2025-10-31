import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form.email, form.password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-sm sm:w-md h-64 bg-slate-900 p-6 rounded-lg shadow-lg text-white flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-center text-indigo-400">
        Login
      </h2>

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="p-2 rounded-md border border-slate-600 bg-slate-800 focus:ring-2 focus:ring-indigo-500"
        required
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="p-2 rounded-md border border-slate-600 bg-slate-800 focus:ring-2 focus:ring-indigo-500"
        required
      />

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 transition-all py-2 rounded-md font-medium"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
