"use client";

import Typography from "@mui/material/Typography"; 
import Box from "@mui/material/Typography";
import List from "@mui/material/Typography";
import { MenuSection } from "./types";
import { SidebarItem } from "./SidebarItem";
import { useSidebar } from "./SidebarContext";

/**
 * SidebarSection Component
 *
 * Renders a section of the sidebar with a title, subtitle, and a list of menu items.
 * Each section represents a logical grouping of navigation items in the dashboard.
 *
 * @param {Object} props - Component props
 * @param {MenuSection} props.section - The section data containing title, subtitle, and menu items
 * @returns {JSX.Element} Rendered sidebar section
 */
export const SidebarSection = ({ section }: { section: MenuSection }) => {
  // Access the sidebar context to manage submenu open/close states
  const { openSubmenus, toggleSubmenu } = useSidebar();

  return (
    <div>
      <Box component="div" sx={{ px: 2, py: 1 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          {section.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {section.subtitle}
        </Typography>
      </Box>
      <List sx={{ "--ListItemIcon-marginRight": "12px", padding: 0 }} component="ul">
        {section.items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isOpen={openSubmenus.has(item.id)}
            onToggle={() => toggleSubmenu(item.id)}
          />
        ))}
      </List>
    </div>
  );
};
