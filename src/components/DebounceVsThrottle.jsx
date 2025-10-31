// source of learning -- https://kettanaito.com/blog/debounce-vs-throttle

// Normal Use
import { useState, useRef } from "react";

export function CounterButton() {
  const [count, setCount] = useState(0);

  return (
    <div className="m-4 p-4 border-slate-700 border-2 rounded-lg flex flex-col items-center justify-center bg-slate-800 text-white">
      <h1 className="text-2xl font-bold mb-6 text-indigo-300">React Counter</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-lg font-semibold transition-transform duration-200 active:scale-90"
        >
          -
        </button>

        <span className="text-3xl font-bold w-12 text-center">{count}</span>

        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-lg font-semibold transition-transform duration-200 active:scale-90"
        >
          +
        </button>
      </div>
    </div>
  );
}



// throttle method
export function ThrottleCounter() {
  const [count, setCount] = useState(0);
  const [isThrottled, setIsThrottled] = useState(false);
  const throttleTimeout = useRef(null);

  const handleThrottleClick = () => {
    if (isThrottled) return;

    setCount((prev) => prev + 1);
    setIsThrottled(true);

    throttleTimeout.current = setTimeout(() => {
      setIsThrottled(false);
    }, 2000); // throttle delay = 2 second
  };

  return (
    <div className="m-4 p-4 border-slate-700 border-2 rounded-lg flex flex-col items-center justify-center bg-slate-800 text-white">
      <h1 className="text-2xl font-bold mb-6 text-indigo-300">Throttle Counter</h1>

      <div className="flex flex-col items-center gap-4">
        <span className="text-3xl font-bold">{count}</span>

        <button
          onClick={handleThrottleClick}
          className="px-6 py-2 rounded-lg text-lg font-semibold transition duration-300 bg-indigo-600 hover:bg-indigo-700 active:scale-95"
        >
          Increase
        </button>

        <p className="text-lg text-slate-400 text-center">
          When clicked it immediately increases the value by 1, after that <br />
          for 2 seconds any other clicks are ignored (throttled)
        </p>
      </div>
    </div>
  );
}



// debounce method
export default function DebounceCounter() {
  const [count, setCount] = useState(0);
  const debounceTimeout = useRef(null);

  const handleDebounceClick = () => {
    // Clear any existing debounce timer
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    
    // Wait 2 second after last click before incrementing
    debounceTimeout.current = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 2000); // 2 second debounce delay
  };

  return (
    <div className="m-4 p-4 border-slate-700 border-2 rounded-lg flex flex-col items-center justify-center bg-slate-800 text-white">
      <h1 className="text-2xl font-bold mb-6 text-indigo-300">Debounce Counter</h1>

      <div className="flex flex-col items-center gap-4">
        <span className="text-3xl font-bold">{count}</span>

        <button
          onClick={handleDebounceClick}
          className="px-6 py-2 rounded-lg text-lg font-semibold transition duration-300 bg-indigo-600 hover:bg-indigo-700 active:scale-95"
        >
          Increase
        </button>

        <p className="text-lg text-slate-400 text-center">
          When clicked any other clicks within 2 seconds are ignored, and <br />
          after every click the timer is resets for 2 seconds, and <br />
          2 seconds after the last click it increases the value by 1 (debounced)
        </p>
      </div>
    </div>
  );
}
