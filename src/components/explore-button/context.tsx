"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ExploreContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  resetExplore: () => void;
}

const ExploreContext = createContext<ExploreContextType | undefined>(undefined);

export const useExplore = () => {
  const context = useContext(ExploreContext);
  if (context === undefined) {
    throw new Error("useExplore must be used within an ExploreProvider");
  }
  return context;
};

export const ExploreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const resetExplore = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "A" || target.closest("a")) {
        resetExplore();
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return (
    <ExploreContext.Provider
      value={{ isOpen, setIsOpen, isMobile, resetExplore }}
    >
      {children}
    </ExploreContext.Provider>
  );
};
