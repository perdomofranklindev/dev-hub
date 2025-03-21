// components/dashboard/Sidebar/SidebarContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useMediaQuery, useTheme } from "@mui/material";

/**
 * Interface defining the shape of the Sidebar context
 * Contains state and functions related to sidebar visibility and responsiveness
 */
interface SidebarContextType {
  isMobile: boolean; // Indicates if the current viewport is mobile
  isDesktop: boolean; // Indicates if the current viewport is desktop
  handleToggleSidebar: () => void;
  drawerWidth: number; // Width of the sidebar drawer
  isSidebarOpen: boolean; // Indicates if the sidebar is currently open
  onClose: () => void;
}

/**
 * Create the context with undefined as default value
 */
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/**
 * Custom hook to access the sidebar context
 */
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

/**
 * SidebarProvider component that manages sidebar visibility state
 */
export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const drawerWidth = 280;

  // Update sidebar state when screen size changes
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        isMobile,
        isDesktop,
        drawerWidth,
        isSidebarOpen,
        handleToggleSidebar,
        onClose,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
