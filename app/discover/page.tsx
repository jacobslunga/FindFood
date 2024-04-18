import { FC } from "react";
import Link from "next/link";
import DiscoverComponent from "@/components/DiscoverComponent";
import path from "path";
import fs from "fs";
import RestaurantModal from "@/components/RestaurantModal";

interface DiscoverProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Discover: FC<DiscoverProps> = async ({ searchParams }) => {
  if (!searchParams || !searchParams.q) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-white text-black font-sat-regular text-4xl">
        <h1>404 - Sidan kunde inte hittas</h1>
        <Link
          href="/"
          className="bg-clip-text text-transparent mt-10 font-sat-medium bg-gradient-to-br from-primary to-secondary"
        >
          Gå till startsidan
        </Link>
      </div>
    );
  }

  const filePath = path.join(process.cwd(), "num_of_reqs.json");

  const rawData = fs.readFileSync(filePath, "utf8");
  let reqData = JSON.parse(rawData);

  return (
    <div className="flex flex-row items-center justify-between w-screen h-screen">
      <DiscoverComponent query={searchParams.q as string} reqData={reqData} />
      <RestaurantModal />
    </div>
  );
};

export default Discover;
