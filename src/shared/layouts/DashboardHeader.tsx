// components/dashboard/Header.tsx
"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  drawerWidth: number;
}

export default function DashboardHeader({
  isSidebarOpen,
  onToggleSidebar,
  drawerWidth,
}: HeaderProps) {
  const theme = useTheme();

  return (
    <Box sx={{ gridArea: "header" }}>
      <AppBar
        position="fixed"
        sx={{
          transition: theme.transitions.create(["margin", "width"], {
            easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
            duration: 400,
          }),
          ...(isSidebarOpen && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onToggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
