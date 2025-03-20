"use client";

import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Link from "next/link";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { usePathname } from "next/navigation";
import { StyledListItemIcon } from "./SidebarStyles";
import { MenuItem } from "./types";
import { useSidebar } from "./SidebarContext";

/**
 * SidebarItem component renders a single menu item in the sidebar
 * It handles both regular menu items and expandable items with sub-menus
 *
 * @param {MenuItem} item - The menu item data to render
 * @param {boolean} isOpen - Whether this item's submenu is expanded
 * @param {Function} onToggle - Function to toggle the submenu open/closed
 */
export const SidebarItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: MenuItem;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  // Access sidebar context for mobile detection and sidebar control
  const { isMobile, closeSidebar } = useSidebar();
  // Get current path to determine active state
  const pathname = usePathname();

  // Check if this item has sub-items that can be expanded
  const hasSubItems = Boolean(item.subItems?.length);

  // Determine if this item or any of its children is active based on current path
  const isActive =
    item.path === pathname ||
    (hasSubItems &&
      item.subItems?.some((subItem) => subItem.path === pathname));

  /**
   * Handle click on menu item
   * - On mobile, close the sidebar after navigation
   * - For items with sub-menus, toggle expansion
   */
  const handleClick = () => {
    if (isMobile) closeSidebar();
    if (hasSubItems) onToggle();
  };

  return (
    <ListItem
      disablePadding
      sx={{
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <ListItemButton
        component={item.path ? Link : "div"}
        {...(item.path && { href: item.path })}
        onClick={handleClick}
        selected={isActive}
        sx={{
          width: "100%",
          "&.Mui-selected": {
            backgroundColor: (theme) =>
              !hasSubItems ? theme.palette.action.selected : "inherit",
          },
          "&.Mui-selected:hover": {
            backgroundColor: (theme) => theme.palette.action.selected,
          },
        }}
      >
        {item?.icon && <StyledListItemIcon>{item.icon}</StyledListItemIcon>}
        <ListItemText primary={item.text} />
        {hasSubItems && (isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
      </ListItemButton>

      {hasSubItems && (
        <Collapse
          in={isOpen}
          timeout="auto"
          unmountOnExit
          sx={{ width: "100%" }}
        >
          <List
            disablePadding
            sx={{
              p: 0,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              // pb: 1,
            }}
          >
            {item.subItems?.map((subItem) => (
              <SidebarItem
                key={subItem.id}
                item={subItem}
                isOpen={false}
                onToggle={() => {}}
              />
            ))}
          </List>
        </Collapse>
      )}
    </ListItem>
  );
};
