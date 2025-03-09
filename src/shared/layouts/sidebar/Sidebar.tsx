"use client";

import { useState } from "react";
import {
  Drawer,
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
  styled,
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
import { motion, AnimatePresence } from "framer-motion";

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

const MotionDrawerPaper = motion.create(
  styled("div")(({ theme }) => ({
    width: DRAWER_WIDTH,
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    overflowX: "hidden",
    boxShadow: theme.shadows[4],
  }))
);

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

  const toggleSubMenu = (text: string) => {
    setOpenSubMenu(openSubMenu === text ? null : text);
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: MotionDrawerPaper,
        animate: open ? "open" : "closed",
        initial: false,
        variants: {
          open: { x: 0 },
          closed: { x: -DRAWER_WIDTH },
        },
        transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] },
      }}
      ModalProps={{ keepMounted: true }}
    >
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
                  href={item.path || null}
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

              <AnimatePresence initial={false}>
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
    </Drawer>
  );
};
