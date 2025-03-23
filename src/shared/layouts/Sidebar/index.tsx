"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { Backdrop } from "./SidebarStyles";

export const Sidebar: React.FC<{
  children: React.ReactNode;
  isOpen?: boolean;
  width?: number;
  overlap?: boolean;
  onClose?: () => void;
  backdropEnabled?: boolean;
  direction?: "right" | "left";
}> = ({
  children,
  isOpen = false,
  width = 280,
  overlap = false,
  onClose,
  backdropEnabled = false,
  direction = "left",
}) => {
  const theme = useTheme();

  // Determine transform based on direction
  const getTransform = () => {
    if (!isOpen) {
      return direction === "left" ? "translateX(-100%)" : "translateX(100%)";
    }
    return "translateX(0)";
  };

  return (
    <>
      <Box
        component="nav"
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRight:
            direction === "left"
              ? `1px solid ${theme.palette.divider}`
              : "none",
          borderLeft:
            direction === "right"
              ? `1px solid ${theme.palette.divider}`
              : "none",
          zIndex: (theme) => (overlap ? theme.zIndex.drawer : "inherit"),
          position: overlap ? "fixed" : "relative",
          height: "100%",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          width: `${width}px`,
          transition: theme.transitions.create(["transform"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          transform: getTransform(),
          ...(direction === "right" && {
            right: 0,
          }),
        }}
      >
        {children}
      </Box>
      {backdropEnabled && <Backdrop isOpen={isOpen} onClick={onClose} />}
    </>
  );
};
