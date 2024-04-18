"use client";

import { FC, useContext } from "react";

import { MainQueryContext } from "@/context/MainQueryContext";
import { IoSend } from "react-icons/io5";

import { useRouter } from "next/navigation";

interface MainInputProps {}

const MainInput: FC<MainInputProps> = () => {
  const { setQuery, query } = useContext(MainQueryContext);
  const router = useRouter();

  /**
   * Debounces a function by delaying its execution until a certain amount of time has passed
   * since the last time it was called.
   *
   * @template F The type of the function being debounced.
   * @param func The function to be debounced.
   * @param delay The delay in milliseconds before the function is executed.
   * @returns A debounced version of the original function.
   */
  function debounce<F extends (...args: any[]) => any>(
    func: F,
    delay: number
  ): (...args: Parameters<F>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return function (...args: Parameters<F>) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  const handleSubmit = () => {
    if (query === "") return;
    router.push(`/discover?q=${query}`);
  };

  return (
    <div className="flex border shadow-sm bg-gray-white flex-row items-center justify-between w-[80%] rounded-xl">
      <input
        type="text"
        placeholder="Beskriv vad du är sugen på..."
        className="bg-white text-black font-sat-regular rounded-xl outline-none p-3 flex-grow h-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />
      <button
        className="disabled:bg-white flex flex-row items-center justify-center transition-opacity group duration-300 disabled:hover:bg-white disabled:text-gray-300 disabled:cursor-not-allowed p-3 h-full bg-slate-800 text-white font-semibold"
        disabled={query === ""}
        style={{
          borderTopRightRadius: "0.75rem",
          borderBottomRightRadius: "0.75rem",
        }}
        onClick={handleSubmit}
      >
        <IoSend
          size={25}
          className="group-hover:scale-110 group-hover:translate-x-1 transition-transform duration-300"
        />
      </button>
    </div>
  );
};

export default MainInput;
