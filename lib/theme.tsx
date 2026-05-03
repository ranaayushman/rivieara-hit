"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "night" | "day";

interface ThemeCtx {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "night",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("night");

  /* Hydrate from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("riviera-theme") as Theme | null;
    if (stored === "day" || stored === "night") {
      setTheme(stored);
    }
  }, []);

  /* Apply class to <html> */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-night", "theme-day");
    root.classList.add(`theme-${theme}`);
    localStorage.setItem("riviera-theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === "night" ? "day" : "night"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
