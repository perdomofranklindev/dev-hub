"use client";

import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Typography,
  useMediaQuery,
  Theme,
  Box,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useSidebar } from "./SidebarProvider";
import { DrawerHeader } from "./SidebarHeader";
import Link from "next/link";

export const DRAWER_WIDTH = 280;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon fontSize="small" />,
    path: "/",
  },
  {
    text: "Settings",
    icon: <SettingsIcon fontSize="small" />,
    subItems: [
      { text: "Profile", path: "/settings/profile" },
      { text: "Account", path: "/settings/account" },
    ],
  },
];

export const Sidebar = () => {
  const { open, setOpen } = useSidebar();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const toggleSubMenu = (text: string) => {
    setOpenSubMenu(openSubMenu === text ? null : text);
  };

  return (
    <Drawer
      // variant={isMobile ? "temporary" : "persistent"}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
    >
      <DrawerHeader>
        <Typography variant="h5" fontWeight="bold">
          Dev Hub
        </Typography>
      </DrawerHeader>
      <Divider />
      <Box>
        <List dense={false} disablePadding>
          {menuItems.map((item) => (
            <div key={item.text}>
              <ListItem disablePadding>
                <ListItemButton
                  {...(!item.subItems?.length && { href: item.path })}
                  LinkComponent={Link}
                  onClick={() => item.subItems && toggleSubMenu(item.text)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {item.subItems &&
                    (openSubMenu === item.text ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    ))}
                </ListItemButton>
              </ListItem>
              {item.subItems && (
                <Collapse
                  in={openSubMenu === item.text}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItemButton
                        href={subItem.path}
                        LinkComponent={Link}
                        key={subItem.text}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
