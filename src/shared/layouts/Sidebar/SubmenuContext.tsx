"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";
import { menuOptions } from "@dev-hub/shared/config/menuOptions";
import { MenuItem } from "./types";

/**
 * Interface defining the shape of the Submenu context
 */
interface SubmenuContextType {
  openSubmenus: Set<string>; // Set of IDs of currently expanded submenus
  toggleSubmenu: (id: string) => void; // Function to toggle a submenu open/closed
  autoExpandSubmenus: (path: string) => void; // Function to automatically expand submenus based on current path
}

/**
 * Create the context with undefined as default value
 */
const SubmenuContext = createContext<SubmenuContextType | undefined>(undefined);

/**
 * Custom hook to access the submenu context
 */
export const useSubmenu = () => {
  const context = useContext(SubmenuContext);
  if (!context) {
    throw new Error("useSubmenu must be used within a SubmenuProvider");
  }
  return context;
};

/**
 * SubmenuProvider component that manages submenu expansion state
 */
export const SubmenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  // State to track which submenus are currently expanded
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

  /**
   * Toggles a submenu open or closed based on its ID
   */
  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const findParentIds = (path: string): string[] => {
    const parentIds: string[] = [];

    const traverse = (items: MenuItem[], parentId?: string): boolean => {
      return items.some((item) => {
        // Check if this is the active item
        if (item.path === path) {
          return true;
        }

        // Check if any children match
        if (item.subItems && item.subItems.length > 0) {
          const found = traverse(item.subItems, item.id);
          if (found) {
            parentIds.push(item.id);
            return true;
          }
        }
        return false;
      });
    };

    menuOptions.forEach((section) => {
      traverse(section.items);
    });

    return parentIds.reverse();
  };

  /**
   * Automatically expands submenus based on the current path
   */
  const autoExpandSubmenus = useCallback((currentPath: string) => {
    const parentIds = findParentIds(currentPath);
    // Replace the current set with only the parent IDs of the active path
    setOpenSubmenus(new Set(parentIds));
  }, []);

  /**
   * Effect to automatically expand relevant submenus when the path changes
   */
  useEffect(() => {
    autoExpandSubmenus(pathname);
  }, [pathname, autoExpandSubmenus]);

  return (
    <SubmenuContext.Provider
      value={{
        openSubmenus,
        toggleSubmenu,
        autoExpandSubmenus,
      }}
    >
      {children}
    </SubmenuContext.Provider>
  );
};
