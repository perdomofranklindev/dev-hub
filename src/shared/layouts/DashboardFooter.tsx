import { Box, useTheme } from "@mui/material";

export default function DashboardFooter() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        gridArea: "footer",
        p: 2,
        bgcolor: "background.paper",
        borderTop: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
          duration: 400,
        }),
      }}
    >
      {/* Footer content */}
      This is a footer...
    </Box>
  );
}
