import DebounceWithLodash from "../components/DebounceWithLodash";
import ThrottleWithLodash from "../components/ThrottleWithLodash";

const DebounceAndThrottleWithLodash = () => {
  return (
    <div className="w-xl flex justify-center items-start gap-4 p-2 sm:p-4 bg-slate-800 rounded-lg">
      <div className="w-full bg-slate-900 rounded-xl p-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mt-12 mb-4">
          Throttle Input With Lodash
        </h1>
        <ThrottleWithLodash/>
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mt-12 mb-4">
          Debounce Input With Lodash
        </h1>
        <DebounceWithLodash />
      </div>
    </div>
  );
};

export default DebounceAndThrottleWithLodash;
