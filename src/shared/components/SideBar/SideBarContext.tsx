"use client"

import { createContext, useContext, useState } from "react";

interface SideBarState {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const SideBarContext = createContext<SideBarState>({} as SideBarState);

export const SideBarProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <SideBarContext.Provider value={{ open, setOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBar = () => {
  const context = useContext(SideBarContext);

  if (!context) {
    throw new Error("useSideBar must be used within a SideBarProvider");
  }

  return context;
};
