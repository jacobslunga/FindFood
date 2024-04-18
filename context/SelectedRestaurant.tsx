import React, { createContext, useState } from "react";

const SelectedRestaurantContext = createContext({
  selectedRestaurant: null,
  setSelectedRestaurant: (restaurant: any) => {},
});

export const SelectedRestaurantProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  return (
    <SelectedRestaurantContext.Provider
      value={{ selectedRestaurant, setSelectedRestaurant }}
    >
      {children}
    </SelectedRestaurantContext.Provider>
  );
};

export default SelectedRestaurantContext;
