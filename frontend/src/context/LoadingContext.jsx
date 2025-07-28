import { createContext, useState, useContext } from "react";

const defaultContext = {
  loading: false,
  setLoading: () => {},
};
export const LoadingContext = createContext(defaultContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
