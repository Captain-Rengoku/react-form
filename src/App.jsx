import { Routes, Route } from "react-router";
import Layout from './Layout';
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import FormType from "./pages/FormType";
import FormEvent from "./pages/FormEvent";
import AllInputs from "./pages/AllInputs";
import FormValidation from "./pages/FormValidation";
import NotFound from "./pages/NotFound";
import ComplexForm from "./pages/ComplexForm";
import ReusableForm from "./pages/ReusableForm";
import AdvancedForm from "./pages/AdvancedForm";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { useContext } from "react";

const AppContent = () => {
  const { user } = useContext(AuthContext);
  return user ? <Home /> : <LoginForm />;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AppContent />} />
          <Route path="/formtype" element={<FormType />} />
          <Route path="/formevent" element={<FormEvent />} />
          <Route path="/allinputs" element={<AllInputs />} />
          <Route path="/formvalidation" element={<FormValidation />} />
          <Route path="/complexform" element={<ComplexForm />} />
          <Route path="/reusableform" element={<ReusableForm />} />
          <Route path="/advancedform" element={<AdvancedForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
    // <div
    //   className="flex flex-col justify-center items-center w-screen h-screen
    // gap-8"
    // >
    //   <span className="text-4xl text-gray-400">React Form Styling</span>
    //   <label className="flex items-center gap-2 cursor-pointer bg-gray-500 p-4 rounded-lg">
    //     <input type="checkbox" className="hidden peer" />
    //     <span className="w-5 h-5 border border-gray-400 rounded-md peer-hover:bg-indigo-500 peer-checked:bg-indigo-700 peer-checked:border-indigo-700 transition" />
    //     Remember me
    //   </label>
    //   <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //     <input placeholder="First Name" className="border p-2 rounded" />
    //     <input placeholder="Last Name" className="border p-2 rounded" />
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       className="col-span-full border p-2 rounded"
    //     />
    //     <textarea
    //       placeholder="Message"
    //       className="col-span-full border p-2 rounded"
    //     />
    //     <button className="col-span-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 cursor-pointer">
    //       Send
    //     </button>
    //   </form>
    // </div>
  );
};

export default App;
