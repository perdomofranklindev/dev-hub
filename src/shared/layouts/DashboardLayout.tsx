// app/dashboard/layout.tsx
"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import Sidebar from "./Sidebar/SidebarV2";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const drawerWidth = 280;

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: isSidebarOpen && isDesktop ? `${drawerWidth}px 1fr` : "0 1fr",
        gridTemplateRows: "auto 1fr auto",
        gridTemplateAreas: `
        "sidebar header"
        "sidebar main"
        "sidebar footer"
      `,
        minHeight: "100vh",
        transition: theme.transitions.create("grid-template-columns", {
          easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
          duration: 400,
        }),
      }}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        drawerWidth={drawerWidth}
      />

      {/* Header */}
      <DashboardHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        drawerWidth={drawerWidth}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          gridArea: "main",
          p: 3,
          pt: 8,
          transition: theme.transitions.create(["margin", "width"], {
            easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
            duration: 400,
          }),
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <DashboardFooter />
    </Box>
  );
}
