"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
  isLoaded: boolean;
  isFirstVisit: boolean;
  setIsLoaded: (loaded: boolean) => void;
  enterSite: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoaded: false,
  isFirstVisit: true,
  setIsLoaded: () => {},
  enterSite: () => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const hasEntered =
      typeof window !== "undefined" && sessionStorage.getItem("hasEnteredSite");
    if (hasEntered === "true") {
      setIsFirstVisit(false);
      setIsLoaded(true);
    } else {
      setIsFirstVisit(true);
    }
  }, []);

  const enterSite = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasEnteredSite", "true");
    }
    setIsLoaded(true);
  };

  return (
    <LoadingContext.Provider
      value={{ isLoaded, isFirstVisit, setIsLoaded, enterSite }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}

