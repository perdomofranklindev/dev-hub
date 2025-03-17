"use client";

import { useState, useEffect, useRef } from "react";
import {
  List,
  ListItem,
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
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useSidebar } from "./SidebarProvider";
import { DrawerHeader } from "./SidebarHeader";
import { motion, AnimatePresence } from "framer-motion";
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

const MotionDrawer = motion.create(Drawer);
const MotionSwipeableDrawer = motion.create(SwipeableDrawer);

const subMenuVariants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const Sidebar = () => {
  const { open, setOpen } = useSidebar();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const drawerRef = useRef<HTMLDivElement>(null);

  // Click outside handler
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

  // Responsive behavior
  useEffect(() => {
    if (!isMobile) setOpen(true);
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
        <List dense={false} disablePadding>
          {menuItems.map((item) => (
            <div key={item.text}>
              <ListItem disablePadding>
                <ListItemButton
                  component={item.path ? Link : "div"}
                  {...(item.path && { href: item.path })}
                  onClick={() => item.subItems && toggleSubMenu(item.text)}
                  sx={{ transition: "background-color 0.2s" }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {item.subItems && (
                    <motion.div
                      animate={{ rotate: openSubMenu === item.text ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {openSubMenu === item.text ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </motion.div>
                  )}
                </ListItemButton>
              </ListItem>

              <AnimatePresence>
                {item.subItems && (
                  <motion.div
                    key={`submenu-${item.text}`}
                    initial="closed"
                    animate={openSubMenu === item.text ? "open" : "closed"}
                    exit="closed"
                    variants={subMenuVariants}
                    style={{ overflow: "hidden" }}
                  >
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItemButton
                          key={subItem.text}
                          component={Link}
                          href={subItem.path}
                          sx={{ pl: 4 }}
                        >
                          <ListItemText primary={subItem.text} />
                        </ListItemButton>
                      ))}
                    </List>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </List>
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
