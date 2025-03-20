// components/dashboard/Sidebar/SidebarItem.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapse,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemButtonProps,
  Box,
} from "@mui/material";
import { StyledListItemIcon } from "./SidebarStyles";
import { MenuItem, SubMenuItem } from "./types";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface SidebarItemProps {
  item: MenuItem | SubMenuItem;
  isMobile: boolean;
  onClose: () => void;
  hasSubItems?: boolean;
  isSubItem?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const SidebarItem = ({
  item,
  isMobile,
  onClose,
  hasSubItems = false,
  isSubItem = false,
  isOpen = false,
  onToggle,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive =
    item.path === pathname ||
    (hasSubItems &&
      (item as MenuItem).subItems?.some(
        (subItem) => subItem.path === pathname
      ));

  const buttonProps: ListItemButtonProps = {
    selected: isActive,
    onClick: isMobile ? onClose : undefined,
    sx: {
      "&.Mui-selected": {
        backgroundColor: !hasSubItems ? (theme) => theme.palette.action.selected : 'inherit',
      },
      "&.Mui-selected:hover": {
        backgroundColor: (theme) => theme.palette.action.selected,
      },
    },
  };

  if (hasSubItems) {
    buttonProps.onClick = (e) => {
      e.preventDefault();
      onToggle?.();
    };
  }

  const linkProps = item.path
    ? {
        component: Link as React.ElementType,
        href: item.path,
        passHref: true,
      }
    : {};

  return (
    <ListItem
      disablePadding
      sx={{
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <ListItemButton
        {...linkProps}
        {...buttonProps}
        sx={{
          width: "100%",
          ...buttonProps.sx,
        }}
      >
        <StyledListItemIcon>{item.icon}</StyledListItemIcon>
        <ListItemText primary={item.text} />
        {hasSubItems && (isOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>

      {hasSubItems && (
        <Collapse
          in={isOpen}
          timeout="auto"
          unmountOnExit
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              pb: 1,
            }}
          >
            {(item as MenuItem).subItems?.map((subItem) => (
              <SidebarItem
                key={subItem.id}
                item={subItem}
                isMobile={isMobile}
                onClose={onClose}
                isSubItem
              />
            ))}
          </Box>
        </Collapse>
      )}
    </ListItem>
  );
};
