// source of learning -- https://kettanaito.com/blog/debounce-vs-throttle

// what is debounce
// debounce is a technique for user interaction like onClick, onChange, onSubmit
// when we need the latest input only, then we use debounce technique

import DebounceCounter, {
  CounterButton,
  ThrottleCounter,
} from "../components/DebounceVsThrottle";

const DebounceAndThrottle = () => {
  return (
    // <div className="w-xl flex justify-center items-center p-2 sm:p-4 bg-slate-800 rounded-lg">
      <div className="w-xl bg-slate-900 rounded-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center my-4">
          Normal User Interaction
        </h1>
        <CounterButton />
        <ThrottleCounter />
        <DebounceCounter />
      </div>
    // </div>
  );
};

export default DebounceAndThrottle;
