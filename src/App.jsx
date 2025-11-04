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
import AuthContext, { AuthProvider } from "./context/AuthContext";
import FormikForm from "./pages/Formik";
import DebounceAndThrottle from "./pages/DebounceAndThrottle";
import DebounceAndThrottleWithLodash from "./pages/DebounceAndThrottleWithLodash";
import AutoSaveExample from "./pages/AutoSaveExample";
import MultiStepWizardExample from "./pages/MultiStepWizardExample";
import NotFound from "./pages/NotFound";
import DropdownExample from "./pages/DropdownExample";

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
          <Route path="/formikform" element={<FormikForm />} />
          <Route path="/debounceandthrottle" element={<DebounceAndThrottle />} />
          <Route path="/debounceandthrottlewithlodash" element={<DebounceAndThrottleWithLodash />} />
          <Route path="/autosave" element={<AutoSaveExample />} />
          <Route path="/wizard" element={<MultiStepWizardExample />} />
          <Route path="/dropdownform" element={<DropdownExample />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
