"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const COOKIE_NAME = "active_theme";
// You might want a default theme name that matches one in themes.css
// Or keep 'default' if you define base :root variables in globals.css
const DEFAULT_THEME = "orange"; // Changed default to 'blue'

function setThemeCookie(theme: string) {
  if (typeof window === "undefined") return;

  // Set cookie to expire in 1 year (31536000 seconds)
  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === "https:" ? "Secure;" : ""
  }`;
}

type ThemeContextType = {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: string;
}) {
  const [activeTheme, setActiveThemeState] = useState<string>(
    () => initialTheme ?? DEFAULT_THEME,
  );

  // Update body class and cookie when theme changes
  useEffect(() => {
    // Remove any existing theme- class
    Array.from(document.body.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        document.body.classList.remove(className);
      });

    // Add the new theme class
    document.body.classList.add(`theme-${activeTheme}`);

    // Persist theme choice in cookie
    setThemeCookie(activeTheme);

    // Optional: Handle specific class variations like 'theme-scaled' if needed
    // if (activeTheme.endsWith("-scaled")) {
    //   document.body.classList.add("theme-scaled")
    // } else {
    //   document.body.classList.remove("theme-scaled")
    // }
  }, [activeTheme]);

  // Function to update theme, exposed via context
  const setActiveTheme = (theme: string) => {
    setActiveThemeState(theme);
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to easily access theme context
export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeConfig must be used within an ActiveThemeProvider",
    );
  }
  return context;
}
