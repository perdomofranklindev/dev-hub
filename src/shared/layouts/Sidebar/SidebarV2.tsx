"use client";

import {
  Drawer,
  Box,
  Toolbar,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { SidebarProvider } from "./SidebarContext";
import { menuOptions } from "@dev-hub/shared/config/menuOptions";
import { SidebarSection } from "./SidebarSection";

/**
 * Sidebar component that displays navigation menu options
 *
 * This component renders a persistent drawer that contains the application's
 * navigation menu. It uses the SidebarProvider to manage state related to
 * sidebar interactions like submenu expansion and mobile responsiveness.
 *
 * @param {boolean} isOpen - Controls whether the sidebar is visible
 * @param {Function} onClose - Callback function to close the sidebar
 * @param {number} drawerWidth - Width of the sidebar in pixels
 * @returns {JSX.Element} The rendered Sidebar component
 */
const Sidebar = ({
  isOpen,
  onClose,
  drawerWidth,
}: {
  isOpen: boolean;
  onClose: () => void;
  drawerWidth: number;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <SidebarProvider
      isOpen={isOpen}
      onClose={onClose}
      drawerWidth={drawerWidth}
    >
      <Box
        sx={{
          gridArea: "sidebar", // Positions the sidebar in the grid layout
          position: "sticky",
          top: 0,
          height: "100vh", // Full viewport height
          width: drawerWidth,
        }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "persistent"} // Drawer remains visible when open
          open={isOpen}
          onClose={onClose}
          ModalProps={{ keepMounted: true }} // Improves performance by keeping the DOM elements mounted
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              // Custom transition for smooth opening/closing animation
              transition: `${theme.transitions.create(["transform"], {
                easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                duration: 400,
              })} !important`,
            },
          }}
        >
          {/* Space for the app bar */}
          <Toolbar />
          <Divider />
          {/* Render each menu section from the configuration */}
          {menuOptions.map((section) => (
            <SidebarSection key={section.title} section={section} />
          ))}
        </Drawer>
      </Box>
    </SidebarProvider>
  );
};

export default Sidebar;
