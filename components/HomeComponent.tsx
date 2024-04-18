"use client";

import { FC, useState, useContext } from "react";
import MainInput from "./MainInput";
import { MainQueryContext } from "@/context/MainQueryContext";

interface HomeComponentProps {}

const HomeComponent: FC<HomeComponentProps> = ({}) => {
  const { setQuery } = useContext(MainQueryContext);

  const swedishOptions = [
    {
      name: "Sushi",
      emoji: "🍣",
    },
    {
      name: "Smashburgare",
      emoji: "🍔",
    },
    {
      name: "Shawarma rulle",
      emoji: "🌯",
    },
    {
      name: "Asiatiskt",
      emoji: "🍜",
    },
    {
      name: "Kebabpizza",
      emoji: "🍕",
    },
    {
      name: "Sallad",
      emoji: "🥗",
    },
    {
      name: "Chicken Tikka Masala",
      emoji: "🍛",
    },
    {
      name: "Italienskt",
      emoji: "🇮🇹",
    },
    {
      name: "Poke Bowl",
      emoji: "🍲",
    },
  ];

  const enlishOptions = [
    "I'm in the mood for some spicy Thai food tonight.",
    "How about having some sushi for lunch?",
    "Maybe it's time for a burger?",
    "I'm craving a kebab plate.",
    "How about having a pizza tonight?",
    "I'm in the mood for a salad for lunch.",
  ];

  return (
    <div className="flex flex-row items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center w-screen h-screen relative">
        <div className="flex flex-col items-center justify-center w-full md:w-2/3 lg:w-1/2 h-screen relative">
          <div className="absolute top-[10%] flex flex-col items-center w-full justify-center">
            <h1 className="text-4xl tracking-tighter font-sat-bold text-center bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary">
              FindFood AI
            </h1>
            <p className="text-sm tracking-tight font-sat-regular mt-5 text-center text-gray-600 max-w-[50%]">
              Använd AI för att hitta restauranger i närheten som serverar det
              du är sugen på.
            </p>
          </div>

          <MainInput />

          <p className="text-[rgba(0,0,0,0.5)] text-[11px] mt-5 max-w-[80%] text-center">
            Försök att skriva in vad du är sugen på i sökfältet ovan, eller välj
            en av de förslag som finns nedan.
          </p>

          <div
            className="grid grid-cols-3 gap-5 items-center justify-center mt-10"
            style={{ maxWidth: "80%" }}
          >
            {swedishOptions.map((option, index) => (
              <button
                key={index}
                className="text-xs transition-colors duration-75 hover:bg-slate-200 grid-flow-col text-gray-600 p-2 rounded-xl bg-slate-100"
                onClick={() => {
                  setQuery(option.name);
                }}
              >
                {option.name} {option.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
