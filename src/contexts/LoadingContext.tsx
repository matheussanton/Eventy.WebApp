'use client';
import { useState, createContext } from "react";

export const LoadingContext = createContext<any>({});

function LoadingProvider({ children }: any) {
  const [isLoading, setIsLoading] = useState(false);
  function HandleIsLoading() {
    setIsLoading(!isLoading);
  }

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        HandleIsLoading,
        setIsLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
