"use client";

import { MainQueryProvider } from "@/context/MainQueryContext";
import { SelectedRestaurantProvider } from "@/context/SelectedRestaurant";
import { FC } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <MainQueryProvider>
      <SelectedRestaurantProvider>{children}</SelectedRestaurantProvider>
    </MainQueryProvider>
  );
};

export default Providers;
