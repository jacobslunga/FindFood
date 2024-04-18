import React, { createContext, useState } from "react";

interface ShowRestaurantModalContextType {
  showRestaurantModal: boolean;
  setShowRestaurantModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowRestaurantModalContext =
  createContext<ShowRestaurantModalContextType>({
    showRestaurantModal: false,
    setShowRestaurantModal: () => {},
  });

const ShowRestaurantModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);

  return (
    <ShowRestaurantModalContext.Provider
      value={{ showRestaurantModal, setShowRestaurantModal }}
    >
      {children}
    </ShowRestaurantModalContext.Provider>
  );
};

export { ShowRestaurantModalContext, ShowRestaurantModalProvider };
