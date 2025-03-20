// components/dashboard/Sidebar.tsx
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
} from "@mui/material";
import Link from "next/link";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  drawerWidth: number;
  isMobile: boolean;
}

const menuOptions = [
  { text: "Home", icon: <InboxIcon />, path: "/" },
  { text: "Analytics", icon: <MailIcon />, path: "/settings/profile" },
  { text: "Settings", icon: <InboxIcon />, path: "/settings/account" },
];

export default function DashboardSidebar({
  isOpen,
  onClose,
  drawerWidth,
  isMobile,
}: SidebarProps) {
  const theme = useTheme();

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
        <List>
          {menuOptions.map((option) => (
            <ListItem key={option.text} disablePadding>
              <ListItemButton
                component={Link}
                href={option.path}
                onClick={isMobile ? onClose : undefined}
              >
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
