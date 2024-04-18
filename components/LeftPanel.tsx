"use client";

import Link from "next/link";
import { FC, useContext, useRef, useState } from "react";
import { IoArrowBack, IoRestaurant } from "react-icons/io5";
import { MainQueryContext } from "@/context/MainQueryContext";
import Image from "next/image";
import SelectedRestaurantContext from "@/context/SelectedRestaurant";
import { ShowRestaurantModalContext } from "@/context/ShowRestaurantContextModal";

interface LeftPanelProps {
  restaurants: any[];
  loading: boolean;
}

const LeftPanel: FC<LeftPanelProps> = ({ restaurants, loading }) => {
  const [showShadow, setShowShadow] = useState(false);
  const { setQuery } = useContext(MainQueryContext);
  const { setSelectedRestaurant } = useContext(SelectedRestaurantContext);
  const { setShowRestaurantModal } = useContext(ShowRestaurantModalContext);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function formatDistance(distanceInMeters: number): string {
    if (distanceInMeters >= 1000) {
      const distanceInKilometers = distanceInMeters / 1000;
      return `${distanceInKilometers.toFixed(1)} km`;
    } else {
      return `${Math.round(distanceInMeters)} m`;
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop } = scrollContainerRef.current;
      if (scrollTop > 50) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    }
  };

  if (scrollContainerRef.current) {
    scrollContainerRef.current.addEventListener("scroll", handleScroll);
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-screen flex-col items-start justify-start border-r border-r-[rgba(0,0,0,0.1)] bg-white py-5 w-screen md:w-[60%] lg:w-[30%] xl:w-[25%]">
      <div className="sticky top-0 flex w-full flex-row items-center justify-center bg-white px-5 md:justify-start">
        <Link
          onClick={() => {
            setQuery("");
            setSelectedRestaurant(null);
          }}
          href="/"
          className="absolute left-5 mr-5 items-center justify-center rounded-xl bg-slate-100 p-2 transition-colors duration-75 hover:bg-slate-300 md:static"
        >
          <IoArrowBack size={15} className="cursor-pointer text-black" />
        </Link>
        <h1 className="select-none bg-gradient-to-br from-primary to-secondary bg-clip-text text-center font-sat-bold text-xl tracking-tighter text-transparent">
          FindFood AI
        </h1>
      </div>

      <div
        ref={scrollContainerRef}
        className="scroll absolute bottom-0 left-0 flex h-[90%] w-full flex-col items-start justify-start overflow-auto"
      >
        <div
          className={`flex ${
            showShadow
              ? "border-b-slate-100 shadow-xl"
              : "border-b-transparent shadow-none"
          } sticky top-0 z-30 w-full flex-row items-center justify-center border-b bg-white px-5 py-2 transition-shadow duration-200`}
        >
          <div className="flex w-full flex-row items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2">
            {/* {options.map((option, index) => (
              <div
                key={index}
                className={`cursor-pointer ${
                  selectedOption === index
                    ? "bg-slate-600"
                    : "bg-slate-50 hover:bg-slate-200"
                } mr-2 flex w-[45%] items-center justify-center rounded-xl p-2 transition-colors duration-100`}
                onClick={() => setSelectedOption(index)}
              >
                <h1
                  className={`text-sm md:text-md lg:text-lg tracking-tight ${
                    selectedOption === index
                      ? "font-sat-bold text-white"
                      : "font-sat-medium text-slate-500"
                  }`}
                >
                  {option}
                </h1>
              </div>
            ))} */}
            <p className="text-sm md:text-md lg:text-lg tracking-tight font-sat-bold text-slate-600">
              Toppval
            </p>
          </div>
        </div>

        {loading ? (
          <div className="absolute flex h-full w-full flex-row items-center justify-center">
            <span className="loader"></span>
          </div>
        ) : (
          <>
            <div className="mt-5 mb-10 grid gap-5 lg:flex grid-cols-2 h-[90%] w-full flex-col items-start justify-start px-5">
              {restaurants.map((restaurant, index) => (
                <div
                  key={restaurant.place_id + String(index)}
                  className="w-full"
                >
                  {/* Mobile Component */}
                  <div
                    className={`relative grid-flow-col flex lg:hidden min-h-[200px] w-full cursor-pointer flex-col items-center justify-start rounded-xl bg-white transition-all hover:shadow-lg ${
                      index === restaurants.length - 1 ? "mb-10" : "mb-5"
                    } duration-200`}
                    onClick={() => {
                      const modal = document.getElementById(
                        "restaurant_modal"
                      ) as any;
                      if (!modal) return;
                      setSelectedRestaurant(restaurant);
                      setShowRestaurantModal(true);
                      modal.showModal();
                    }}
                  >
                    {restaurant.photoUrl === "" ? (
                      <div className="absolute flex h-full w-full flex-col items-center justify-center">
                        <IoRestaurant size={50} className="text-slate-300" />
                      </div>
                    ) : (
                      <Image
                        src={restaurant.photoUrl}
                        alt="restaurant"
                        className="absolute h-full w-full rounded-xl object-cover"
                        width={300}
                        height={200}
                        priority
                      />
                    )}

                    <div className="absolute bottom-0 flex h-[50%] w-full flex-col items-start justify-end rounded-xl bg-gradient-to-b from-transparent to-[rgba(16,16,16,0.8)] px-2 py-2">
                      <h1 className="z-20 font-sat-medium text-xl tracking-tight text-white">
                        {restaurant.name}
                      </h1>
                      <p className="z-20 font-sat-regular text-sm text-white">
                        {restaurant.vicinity} - {restaurant.rating} ⭐
                      </p>

                      <p className="z-20 font-sat-regular text-xs tracking-tighter text-white">
                        {formatDistance(restaurant.distance)} bort
                      </p>
                    </div>
                  </div>

                  {/* Component for larger devices */}
                  <div
                    className={`relative hidden lg:flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-start rounded-xl bg-white transition-all hover:-translate-y-1 hover:shadow-lg ${
                      index === restaurants.length - 1 ? "mb-10" : "mb-3"
                    } duration-200`}
                    onClick={() => {
                      setSelectedRestaurant(restaurant);
                    }}
                  >
                    {restaurant.photoUrl === "" ? (
                      <div className="absolute flex h-full w-full flex-col items-center justify-center">
                        <IoRestaurant size={50} className="text-slate-300" />
                      </div>
                    ) : (
                      <Image
                        src={restaurant.photoUrl}
                        alt="restaurant"
                        className="absolute h-full w-full rounded-xl object-cover"
                        width={300}
                        height={200}
                        priority
                      />
                    )}

                    <div className="absolute bottom-0 flex h-[50%] w-full flex-col items-start justify-end rounded-xl bg-gradient-to-b from-transparent to-[rgba(16,16,16,0.8)] px-2 py-2">
                      <h1 className="z-20 font-sat-medium text-xl tracking-tight text-white">
                        {restaurant.name}
                      </h1>
                      <p className="z-20 font-sat-regular text-sm text-white">
                        {restaurant.vicinity} - {restaurant.rating} ⭐
                      </p>

                      <p className="z-20 font-sat-regular text-xs tracking-tighter text-white">
                        {formatDistance(restaurant.distance)} bort
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeftPanel;
