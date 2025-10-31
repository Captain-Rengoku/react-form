import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen p-4 pt-16 sm:pb-10 sm:pt-36 bg-slate-950 flex justify-center items-center">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
