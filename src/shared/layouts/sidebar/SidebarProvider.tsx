"use client";

import { createContext, useContext, useState } from "react";

interface SidebarStates {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarStates>({} as SidebarStates);

export const SidebarProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
};
