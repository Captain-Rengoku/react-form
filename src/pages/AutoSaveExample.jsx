import AutosaveForm from "../components/AutoSaveForm";

const AutoSaveExample = () => {
  return (
    <div className="w-xl flex justify-center items-start gap-4 p-2 sm:p-4 bg-slate-800 rounded-lg">
      <div className="w-full bg-slate-900 rounded-xl p-2 sm:p-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mb-8">
          Debounce Auto Save with Lodash.debounce
        </h1>
        <AutosaveForm />
      </div>
    </div>
  );
};

export default AutoSaveExample;
