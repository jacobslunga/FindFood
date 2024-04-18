"use client";

import { FC, useState, useEffect, useContext } from "react";
import LeftPanel from "@/components/LeftPanel";
import SingleRestaurant from "@/components/SingleRestaurant";
import Link from "next/link";
import SelectedRestaurantContext from "@/context/SelectedRestaurant";
import { ShowRestaurantModalContext } from "@/context/ShowRestaurantContextModal";
import RestaurantModal from "./RestaurantModal";

interface DiscoverComponentProps {
  query: string;
  reqData: any;
}

type Location = {
  lat: number;
  lng: number;
};

const DiscoverComponent: FC<DiscoverComponentProps> = ({ query, reqData }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const { setSelectedRestaurant } = useContext(SelectedRestaurantContext);
  const { showRestaurantModal } = useContext(ShowRestaurantModalContext);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (!location?.lat || !location?.lng) return;

    setLoading(true);

    const fetchData = async () => {
      const res = await fetch(
        `/api/places?q=${query}&lat=${location?.lat}&lng=${location?.lng}`
      );
      const data = await res.json();
      console.log(data);

      if (data.error) {
        setError(data.error);
      } else {
        setRestaurants(data);
        setSelectedRestaurant(data[0]);
        setLoading(false);
      }
    };

    fetchData();
  }, [query, location, setSelectedRestaurant]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="fixed flex h-screen w-screen flex-row items-start justify-start overflow-auto">
      {showRestaurantModal && <RestaurantModal />}

      {reqData.num_of_reqs > 1000 ? (
        <>
          <div className="bg-gray-white flex h-screen w-screen flex-col items-center justify-center font-sat-regular text-4xl text-black">
            <h1 className="absolute top-10 bg-gradient-to-br from-primary to-secondary bg-clip-text text-center font-sat-bold text-xl tracking-tighter text-transparent">
              FindFood AI
            </h1>
            <h1>
              Vi har problem med inkomamnde förfrågningar för tillfället. Försök
              igen senare.
            </h1>
            <Link href="/" className="mt-10 text-secondary">
              Gå till startsidan
            </Link>
          </div>
        </>
      ) : (
        <>
          <LeftPanel restaurants={restaurants} loading={loading} />
          <SingleRestaurant />
          <RestaurantModal />
        </>
      )}
    </div>
  );
};

export default DiscoverComponent;
