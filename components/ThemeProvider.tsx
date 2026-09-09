"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start with "dark" — SSR and first client render must agree
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    // On mount, read saved preference (if any); default = dark
    const stored = localStorage.getItem("sasc-theme") as Theme | null;
    const resolved: Theme = stored === "light" ? "light" : "dark";

    if (resolved !== theme) {
      setThemeState(resolved);
    }

    // Sync html element
    applyThemeToDOM(resolved);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const applyThemeToDOM = (t: Theme) => {
    const root = document.documentElement;
    root.setAttribute("data-theme", t);
    if (t === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("sasc-theme", newTheme);
    applyThemeToDOM(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
