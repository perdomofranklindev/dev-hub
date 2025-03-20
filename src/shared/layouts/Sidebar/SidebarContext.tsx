// components/dashboard/Sidebar/SidebarContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery, useTheme } from "@mui/material";
import { menuOptions } from "@dev-hub/shared/config/menuOptions";

/**
 * Interface defining the shape of the Sidebar context
 * Contains all the state and functions needed for sidebar functionality
 */
interface SidebarContextType {
  isMobile: boolean; // Indicates if the current viewport is mobile
  drawerWidth: number; // Width of the sidebar drawer
  openSubmenus: Set<string>; // Set of IDs of currently expanded submenus
  toggleSubmenu: (id: string) => void; // Function to toggle a submenu open/closed
  closeSidebar: () => void; // Function to close the sidebar (especially on mobile)
  isSidebarOpen: boolean; // Indicates if the sidebar is currently open
  autoExpandSubmenus: (path: string) => void; // Function to automatically expand submenus based on current path
}

/**
 * Create the context with undefined as default value
 * The actual value will be provided by SidebarProvider
 */
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/**
 * Custom hook to access the sidebar context
 * Throws an error if used outside of SidebarProvider
 */
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

/**
 * SidebarProvider component that wraps the application and provides sidebar state
 *
 * @param children - React children to be wrapped by the provider
 * @param isOpen - Boolean indicating if sidebar is open
 * @param onClose - Function to call when sidebar should close
 * @param drawerWidth - Width of the sidebar drawer in pixels
 */
export const SidebarProvider = ({
  children,
  isOpen,
  onClose,
  drawerWidth,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  drawerWidth: number;
}) => {
  const theme = useTheme();
  const pathname = usePathname();
  // Determine if current viewport is mobile using MUI's useMediaQuery
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // State to track which submenus are currently expanded
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

  /**
   * Toggles a submenu open or closed based on its ID
   * If the submenu is already open, it will be closed, and vice versa
   */
  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /**
   * Automatically expands submenus based on the current path
   * This ensures that the submenu containing the active page is always expanded
   */
  const autoExpandSubmenus = (currentPath: string) => {
    const newOpenSubmenus = new Set<string>();
    menuOptions.forEach((section) => {
      section.items.forEach((item) => {
        if (item.subItems?.some((subItem) => subItem.path === currentPath)) {
          newOpenSubmenus.add(item.id);
        }
      });
    });
    setOpenSubmenus(newOpenSubmenus);
  };

  /**
   * Effect to automatically expand relevant submenus when the path changes
   * This ensures the sidebar navigation reflects the current page
   */
  useEffect(() => {
    autoExpandSubmenus(pathname);
  }, [pathname]);

  // Provide the sidebar context to all children components
  return (
    <SidebarContext.Provider
      value={{
        isMobile,
        drawerWidth,
        openSubmenus,
        toggleSubmenu,
        closeSidebar: onClose,
        isSidebarOpen: isOpen,
        autoExpandSubmenus,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
