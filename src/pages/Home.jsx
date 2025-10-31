import React, { useContext } from "react";
import { LogOut } from "lucide-react";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="w-sm sm:w-md h-64 bg-slate-900 backdrop-blur-lg rounded-lg p-8 shadow-2xl text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 mb-3">
        Welcome{user ? `, ${user.email}!` : "!"}
      </h1>
      <p className="text-slate-300 mb-14">
        You're now logged in. <br /> This is your demo home page.
      </p>

      <div className="flex justify-center">
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 transition-all px-4 py-2 rounded-lg cursor-pointer font-bold"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
