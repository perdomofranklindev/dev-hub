// components/dashboard/Sidebar/index.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Drawer, Box, Toolbar, Divider, useTheme } from "@mui/material";
import { SidebarSection } from "./SidebarSection";
import { SidebarProps } from "./types";
import { menuOptions } from "@dev-hub/shared/config/menuOptions";

export const Sidebar = ({
  isOpen,
  onClose,
  drawerWidth,
  isMobile,
}: SidebarProps) => {
  const theme = useTheme();
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

  useEffect(() => {
    const newOpenSubmenus = new Set<string>();

    menuOptions.forEach((section) => {
      section.items.forEach((item) => {
        if (item.subItems?.some((subItem) => subItem.path === pathname)) {
          newOpenSubmenus.add(item.id);
        }
      });
    });

    setOpenSubmenus(newOpenSubmenus);
  }, [pathname]);

  const handleSubmenuToggle = (id: string) => {
    setOpenSubmenus((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <Box
      sx={{ gridArea: "sidebar", position: "sticky", top: 0, height: "100vh" }}
    >
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={isOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
          },
        }}
      >
        <Toolbar />
        <Divider />

        {menuOptions.map((section) => (
          <SidebarSection
            key={section.title}
            section={section}
            isMobile={isMobile}
            onClose={onClose}
            openSubmenus={openSubmenus}
            onSubmenuToggle={handleSubmenuToggle}
          />
        ))}
      </Drawer>
    </Box>
  );
};
