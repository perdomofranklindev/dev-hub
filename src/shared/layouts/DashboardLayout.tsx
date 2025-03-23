"use client";

import Box from "@mui/material/Box";
import DashboardSidebar from "./DashboardSidebar";
import DashboardMain from "./DashboardMain";
import { useSidebar } from "./Sidebar/SidebarContext";
import { useTheme } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const { isDesktop, drawerWidth, isSidebarOpen, enteringOnMobileMode } =
    useSidebar();

  const enteringOnDesktopMode = !enteringOnMobileMode;

  const gridTemplateColumnsHandle = () => {
    if (isSidebarOpen && isDesktop) {
      return `${drawerWidth}px 1fr`;
    } else {
      return "0 1fr";
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: gridTemplateColumnsHandle(),
        gridTemplateRows: "1fr",
        gridTemplateAreas: `
          "sidebar main"`,
        minHeight: "100vh",

        ...(enteringOnDesktopMode && {
          transition: theme.transitions.create("grid-template-columns", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        }),

      }}
    >
      <DashboardSidebar />
      <DashboardMain>{children}</DashboardMain>
    </Box>
  );
}
