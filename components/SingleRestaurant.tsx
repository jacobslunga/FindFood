"use client";

import SelectedRestaurantContext from "@/context/SelectedRestaurant";
import { FC, useContext, useEffect, useState } from "react";
import { IoArrowUp, IoLocation, IoRestaurant } from "react-icons/io5";
import { FiGlobe } from "react-icons/fi";
import { MdDeliveryDining } from "react-icons/md";
import { FaWheelchair } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

interface SingleRestaurantProps {}

type Review = {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
};

type Restaurant = {
  name: string;
  vicinity: string;
  formatted_phone_number: string;
  rating: number;
  takeout: boolean;
  wheelchair_accessible_entrance: boolean;
  website: string;
  opening_hours: {
    open_now: boolean;
    periods: {
      open: {
        day: number;
        time: string;
      };
      close: {
        day: number;
        time: string;
      };
    }[];
  };
  reviews: Review[];
};

const RestaurantComponent = ({
  placeId,
  photoUrl,
}: {
  placeId: string;
  photoUrl: string | null;
}) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/get-place?placeId=${placeId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setRestaurant(data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [placeId]);

  if (!restaurant) {
    return (
      <span className="loading loading-spinner loading-lg text-black"></span>
    );
  }

  const formatOpeningHours = () => {
    if (!restaurant.opening_hours || !restaurant.opening_hours.periods) {
      return (
        <tr>
          <td colSpan={2} className="text-center">
            Inga öppettider tillgängliga
          </td>
        </tr>
      );
    }

    const days = [
      "Söndag",
      "Måndag",
      "Tisdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lördag",
    ];
    const periodsByDay: any = {};

    const date = new Date();
    const currentDay = date.getDay();

    restaurant.opening_hours.periods.forEach((period) => {
      const dayIndex = period.open.day;
      if (!periodsByDay[dayIndex]) {
        periodsByDay[dayIndex] = [];
      }
      periodsByDay[dayIndex].push(
        `${period.open.time.substring(0, 2)}:${period.open.time.substring(
          2
        )} - ${period.close.time.substring(0, 2)}:${period.close.time.substring(
          2
        )}`
      );
    });

    return Object.keys(periodsByDay).map((day) => (
      <tr
        key={day}
        className={`${parseInt(day) === currentDay ? "bg-slate-100" : ""}`}
      >
        <th className="text-left font-sat-bold text-[rgba(0,0,0,0.7)]">
          {days[parseInt(day)]}
        </th>
        <td className="text-left font-sat-medium text-[rgba(0,0,0,1)]">
          {periodsByDay[day].join(", ")}
        </td>
      </tr>
    ));
  };

  const formatReviews = () => {
    if (!restaurant.reviews || restaurant.reviews.length === 0) {
      return <p className="text-center">Inga recensioner tillgängliga</p>;
    }

    return restaurant.reviews.map((review, index) => (
      <div key={index} className="border p-4 mb-2 rounded-lg">
        <div className="flex items-center space-x-4 mb-2">
          {review.profile_photo_url ? (
            <Image
              src={review.profile_photo_url}
              alt={review.author_name}
              className="w-10 h-10 rounded-full"
              width={40}
              height={40}
            />
          ) : (
            <div></div>
          )}
          <div>
            <a
              href={review.author_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-sat-medium"
            >
              {review.author_name}
            </a>
          </div>
        </div>
        <p className="text-sm font-sat-medium text-gray-600">
          {review.relative_time_description}
        </p>
        {review.text && (
          <p className="mt-2 font-sat-regular text-black">{review.text}</p>
        )}
        <p className="text-yellow-500">
          {Array(review.rating).fill("⭐").join("")}
        </p>
      </div>
    ));
  };

  return (
    <div className="mb-10 mt-10 flex h-full w-full flex-col items-start justify-start bg-white px-10">
      {photoUrl ? (
        <div className="relative flex h-[300px] w-full flex-row items-center justify-center">
          <Image
            src={photoUrl}
            alt="restaurant"
            layout="fill"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      ) : (
        <div
          className="relative flex h-[300px] w-[300px] flex-row items-center justify-center bg-slate-50 object-cover"
          style={{ width: "300px", height: "300px" }}
        >
          <IoRestaurant className="text-6xl text-black" />
        </div>
      )}
      <div className="mt-5 flex w-full flex-col items-start justify-start">
        <h1 className="text-left font-sat-bold text-3xl text-black">
          {restaurant.name}
        </h1>

        {restaurant.website && (
          <div className="mt-2 flex items-center justify-center">
            <FiGlobe className="text-2xl text-black" />
            <Link
              href={restaurant.website}
              target="_blank"
              className="text-md ml-2 flex flex-row items-center justify-center font-sat-medium text-blue-500 hover:underline"
            >
              Läs mer
              <IoArrowUp className="rotate-45 text-sm text-blue-500" />
            </Link>
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-col items-start justify-start space-y-2">
        <p className="text-center font-sat-regular text-lg text-[rgba(0,0,0,1)]">
          {restaurant.vicinity}
        </p>

        {restaurant.formatted_phone_number && (
          <div className="flex flex-row items-start justify-center space-x-2">
            <IoLocation className="text-lg text-black" />
            <p className="text-center font-sat-regular text-sm text-[rgba(0,0,0,1)]">
              {restaurant.formatted_phone_number}
            </p>
          </div>
        )}

        <p className="text-center font-sat-bold text-sm text-[rgba(0,0,0,1)]">
          {restaurant.rating} ⭐
        </p>

        {restaurant.takeout && (
          <div className="flex flex-row items-start justify-center space-x-2">
            <div className="flex flex-row items-start justify-center space-x-2">
              <MdDeliveryDining className="text-lg text-black" />
              <p className="text-center font-sat-regular text-sm text-[rgba(0,0,0,1)]">
                Har takeout
              </p>
            </div>
          </div>
        )}

        {restaurant.wheelchair_accessible_entrance && (
          <div className="flex flex-row items-start justify-center space-x-2">
            <FaWheelchair className="text-lg text-black" />
            <p className="text-center font-sat-regular text-sm text-[rgba(0,0,0,1)]">
              Har rullstolsanpassad ingång
            </p>
          </div>
        )}

        {restaurant.opening_hours && (
          <p
            className={`rounded-lg border bg-slate-50 p-2 text-center font-sat-medium ${
              restaurant.opening_hours.open_now
                ? "text-green-600 shadow-md"
                : "text-red-600"
            } text-sm`}
          >
            {restaurant.opening_hours.open_now ? "Öppet nu" : "Stängt"}
          </p>
        )}
      </div>

      <h2 className="mb-2 mt-5 font-sat-bold text-2xl text-slate-700">
        Öppettider
      </h2>
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th
                className="text-left font-sat-bold text-[rgba(0,0,0,0.7)]"
                style={{ width: "100px" }}
              >
                Dag
              </th>
              <th className="text-left font-sat-bold text-[rgba(0,0,0,0.7)]">
                Tid
              </th>
            </tr>
          </thead>
          <tbody>{formatOpeningHours()}</tbody>
        </table>
      </div>

      <h2 className="mb-2 mt-5 font-sat-bold text-2xl text-slate-700">
        Recensioner
      </h2>
      <div className="w-full overflow-x-auto">{formatReviews()}</div>
    </div>
  );
};

const SingleRestaurant: FC<SingleRestaurantProps> = ({}) => {
  const { selectedRestaurant }: any = useContext(SelectedRestaurantContext);

  if (!selectedRestaurant) {
    return null;
  }

  return (
    <div className="absolute hidden md:left-[40%] md:w-[40%] lg:flex lg:left-[30%] lg:w-[50%] xl:left-[25%] min-h-screen xl:w-[55%] flex-col items-center justify-center overflow-auto">
      {selectedRestaurant === null ? (
        <span className="loading loading-spinner loading-lg text-white"></span>
      ) : (
        <RestaurantComponent
          placeId={selectedRestaurant.place_id}
          photoUrl={selectedRestaurant.photoUrl}
        />
      )}
    </div>
  );
};

export default SingleRestaurant;
