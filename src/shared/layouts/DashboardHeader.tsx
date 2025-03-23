"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { useSidebar } from "./Sidebar/SidebarContext";
import { useTheme } from "@mui/material";

export default function DashboardHeader() {
  const theme = useTheme();

  const {
    isDesktop,
    isSidebarOpen,
    drawerWidth,
    handleToggleSidebar,
    enteringOnMobileMode,
  } = useSidebar();

  const enteringOnDesktopMode = !enteringOnMobileMode;

  return (
    <Box sx={{ gridArea: "header", position: "relative" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 2, // Ensure header is above drawer
          ...(enteringOnDesktopMode && {
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
          }),
          ...(isSidebarOpen &&
            isDesktop && {
              width: `calc(100% - ${drawerWidth}px)`,
              marginLeft: `${drawerWidth}px`,
            }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleToggleSidebar}
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
