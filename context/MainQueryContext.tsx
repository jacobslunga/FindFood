import { FC, createContext, useState } from "react";

interface MainQueryContextProps {
  query: string;
  setQuery: (query: string) => void;
}

export const MainQueryContext = createContext<MainQueryContextProps>({
  query: "",
  setQuery: () => {},
});

interface MainQueryProviderProps {
  children: React.ReactNode;
}

export const MainQueryProvider: FC<MainQueryProviderProps> = ({ children }) => {
  const [query, setQuery] = useState<string>("");

  return (
    <MainQueryContext.Provider value={{ query, setQuery }}>
      {children}
    </MainQueryContext.Provider>
  );
};
