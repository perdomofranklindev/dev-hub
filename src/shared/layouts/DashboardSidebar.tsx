"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  useTheme,
  Box,
  Typography,
  Collapse,
} from "@mui/material";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  drawerWidth: number;
  isMobile: boolean;
}

const menuOptions = [
  {
    title: "Overview",
    subtitle: "Apps and Widgets",
    items: [
      {
        id: "dashboard",
        text: "Dashboard",
        path: "/",
        icon: <DashboardIcon />,
      },
      {
        id: "settings",
        text: "Settings",
        icon: <AdminPanelSettingsIcon />,
        subItems: [
          {
            id: "profile",
            text: "Profile",
            path: "/settings/profile",
            icon: <AccountBoxIcon />,
          },
          {
            id: "account",
            text: "Account",
            path: "/settings/account",
            icon: <AdminPanelSettingsIcon />,
          },
        ],
      },
    ],
  },
];

export default function DashboardSidebar({
  isOpen,
  onClose,
  drawerWidth,
  isMobile,
}: SidebarProps) {
  const theme = useTheme();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleSubmenuToggle = (id: string) => {
    setOpenSubmenu((prev) => (prev === id ? null : id));
  };

  // Auto-expand parent menu if current path is in subitems
  useEffect(() => {
    menuOptions.forEach((section) => {
      section.items.forEach((item) => {
        if (item.subItems?.some((subItem) => subItem.path === pathname)) {
          setOpenSubmenu(item.id);
        }
      });
    });
  }, [pathname]);

  // Check if item or any subitems are active
  const isItemActive = (item: any) => {
    return (
      item.path === pathname ||
      item.subItems?.some((subItem: any) => subItem.path === pathname)
    );
  };

  return (
    <Box
      sx={{
        gridArea: "sidebar",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
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
            transition: `${theme.transitions.create(["transform"], {
              easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
              duration: 400,
            })} !important`,
          },
        }}
      >
        <Toolbar />
        <Divider />

        {menuOptions.map((section) => (
          <div key={section.title}>
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {section.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {section.subtitle}
              </Typography>
            </Box>

            <List>
              {section.items.map((item) => (
                <div key={item.id}>
                  {item.subItems ? (
                    <>
                      <ListItemButton
                        onClick={() => handleSubmenuToggle(item.id)}
                        selected={isItemActive(item)}
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: theme.palette.action.selected,
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: theme.palette.action.selected,
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: "36px !important" }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        {openSubmenu === item.id ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItemButton>

                      <Collapse in={openSubmenu === item.id}>
                        {item.subItems.map((subItem) => (
                          <ListItem key={subItem.id} disablePadding>
                            <ListItemButton
                              component={Link}
                              href={subItem.path}
                              onClick={isMobile ? onClose : undefined}
                              sx={{
                                pl: 4,
                                "&.Mui-selected": {
                                  backgroundColor:
                                    theme.palette.action.selected,
                                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                                },
                                "&.Mui-selected:hover": {
                                  backgroundColor:
                                    theme.palette.action.selected,
                                },
                              }}
                            >
                              <ListItemIcon
                                sx={{ minWidth: "36px !important" }}
                              >
                                {subItem.icon}
                              </ListItemIcon>
                              <ListItemText primary={subItem.text} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </Collapse>
                    </>
                  ) : (
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        href={item.path}
                        onClick={isMobile ? onClose : undefined}
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: theme.palette.action.selected,
                            borderLeft: `4px solid ${theme.palette.primary.main}`,
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: theme.palette.action.selected,
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: "36px !important" }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </ListItem>
                  )}
                </div>
              ))}
            </List>
          </div>
        ))}
      </Drawer>
    </Box>
  );
}
