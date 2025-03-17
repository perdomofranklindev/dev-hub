"use client";

import { useState, useEffect, useRef } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useMediaQuery,
  Theme,
  Box,
  Drawer,
  SwipeableDrawer,
  Collapse,
  ListItem,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useSidebar } from "./SidebarProvider";
import { DrawerHeader } from "./SidebarHeader";
import { motion } from "framer-motion";
import Link from "next/link";

export const DRAWER_WIDTH = 280;

const menuItems = [
  {
    section: "Main Menu",
    subtitle: "Main Menu",
    items: [
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
    ],
  },
];

const MotionDrawer = motion.create(Drawer);
const MotionSwipeableDrawer = motion.create(SwipeableDrawer);

export const Sidebar = () => {
  const { open, setOpen } = useSidebar();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        isMobile &&
        open
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, open, setOpen]);

  useEffect(() => {
    if (!isMobile) setOpen(true);
    if (isMobile) setOpen(false);
  }, [isMobile, setOpen]);

  const toggleSubMenu = (text: string) => {
    setOpenSubMenu(openSubMenu === text ? null : text);
  };

  const DrawerContent = () => (
    <>
      <DrawerHeader>
        <Typography variant="h5" fontWeight="bold">
          Dev Hub
        </Typography>
      </DrawerHeader>
      <Divider />
      <Box sx={{ overflowY: "auto", height: "calc(100vh - 64px)" }}>
        {menuItems.map((section) => (
          <List key={section.section} component="nav">
            <ListItem sx={{ mt: 1.5, mx: 2, width: "auto" }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {section.section}
              </Typography>
            </ListItem>

            {section.subtitle && (
              <ListItem sx={{ mx: 2, width: "auto" }}>
                <Typography variant="caption" color="text.secondary">
                  {section.subtitle}
                </Typography>
              </ListItem>
            )}

            {section.items.map((item) => (
              <div key={item.text}>
                {item.subItems ? (
                  <>
                    <ListItemButton
                      sx={{
                        mx: 2,
                        "& .MuiListItemIcon-root": {
                          width: "auto",
                          minWidth: "auto",
                          paddingRight: 2,
                        },
                      }}
                      onClick={() => toggleSubMenu(item.text)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                      {openSubMenu === item.text ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={openSubMenu === item.text}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding sx={{ mx: 2 }}>
                        {item.subItems.map((subItem) => (
                          <Link
                            href={subItem.path}
                            passHref
                            legacyBehavior
                            key={subItem.text}
                          >
                            <ListItemButton component="a" sx={{ pl: "52px" }}>
                              <ListItemText primary={subItem.text} />
                            </ListItemButton>
                          </Link>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <Link href={item.path} passHref legacyBehavior>
                    <ListItemButton
                      component="a"
                      sx={{
                        mx: 2,
                        "& .MuiListItemIcon-root": {
                          width: "auto",
                          minWidth: "auto",
                          paddingRight: 2,
                        },
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </Link>
                )}
              </div>
            ))}
          </List>
        ))}
      </Box>
    </>
  );

  const commonDrawerProps = {
    ref: drawerRef,
    open,
    onClose: () => setOpen(false),
    animate: { width: open ? DRAWER_WIDTH : 0 },
    transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] },
    sx: {
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        overflowX: "hidden",
      },
    },
  };

  if (isMobile) {
    return (
      <MotionSwipeableDrawer
        {...commonDrawerProps}
        anchor="left"
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        onOpen={() => setOpen(true)}
      >
        <DrawerContent />
      </MotionSwipeableDrawer>
    );
  }

  return (
    <MotionDrawer {...commonDrawerProps} anchor="left" variant="persistent">
      <DrawerContent />
    </MotionDrawer>
  );
};
