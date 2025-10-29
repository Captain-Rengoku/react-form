import { useContext } from "react";
import { Routes, Route } from "react-router";
import Layout from './Layout';
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import FormType from "./pages/FormType";
import FormEvent from "./pages/FormEvent";
import AllInputs from "./pages/AllInputs";
import FormValidation from "./pages/FormValidation";
import ComplexForm from "./pages/ComplexForm";
import ReusableForm from "./pages/ReusableForm";
import AdvancedForm from "./pages/AdvancedForm";
import ReactHookForm from "./pages/ReactHookForm";
import NotFound from "./pages/NotFound";
import AuthContext, { AuthProvider } from "./context/AuthContext";

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
          <Route path="/reacthookform" element={<ReactHookForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
