// source of learning -- https://kettanaito.com/blog/debounce-vs-throttle

//-----------------------------------------------------------------------//

// ✅ Normal
// Every user action (like typing, scrolling, clicking) triggers the function immediately.

// function handleChange(e) {
//   console.log("Input value:", e.target.value);
// }

// 👉 Use: React onChange={handleChange}
// Result: Runs every time user types (even 1 character).

// ✅ Debounce
// Waits for a certain delay after the last event before running the function.
// If another event happens within the delay, the timer resets.
// Used when we only care about the *latest* input after user stops typing.

// function debounce(fn, delay) {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => fn(...args), delay);
//   };
// }

// const handleSearch = debounce((text) => {
//   console.log("Searching for:", text);
// }, 500);

// 👉 Use: React onChange={(e) => handleSearch(e.target.value)}
// Result: Waits 500ms after user stops typing to call API or search.

// ✅ Throttle
// Ensures a function runs at most once in a given time frame (delay).
// Even if the event keeps firing, it will only run once per interval.
// Used for continuous events like scroll, resize, drag.

// function throttle(fn, delay) {
//   let last = 0;
//   return (...args) => {
//     const now = Date.now();
//     if (now - last >= delay) {
//       fn(...args);
//       last = now;
//     }
//   };
// }

// const handleScroll = throttle(() => {
//   console.log("Scroll event triggered");
// }, 300);

// 👉 Use: window.addEventListener("scroll", handleScroll)
// Result: Logs at most once every 300ms even if user keeps scrolling.

import DebounceCounter, {
  CounterButton,
  ThrottleCounter,
} from "../components/DebounceVsThrottleCounter";
import {
  DebounceInput,
  NormalInput,
  ThrottleInput,
} from "../components/DebounceInputComparison";
import GeneralInputs from "../components/GeneralDebounceFunction";

const DebounceAndThrottle = () => {
  return (
    <div className="w-6xl flex justify-center items-start gap-4 p-2 sm:p-4 bg-slate-800 rounded-lg">
      <div className="w-full bg-slate-900 rounded-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center my-4">
          Normal User Interaction
        </h1>
        <CounterButton />
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mt-12 mb-4">
          Throttle User Interaction
        </h1>
        <ThrottleCounter />
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mt-12 mb-4">
          Debounce User Interaction
        </h1>
        <DebounceCounter />
      </div>
      <div className="w-full bg-slate-900 rounded-xl p-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mb-4">
          Normal Input
        </h1>
        <NormalInput />
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mt-12 mb-4">
          Throttle Input
        </h1>
        <ThrottleInput />
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mt-12 mb-4">
          Debounce Input
        </h1>
        <DebounceInput />
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mt-12 mb-4">
          Generalized Inputs
        </h1>
        <GeneralInputs/>
      </div>
    </div>
  );
};

export default DebounceAndThrottle;
