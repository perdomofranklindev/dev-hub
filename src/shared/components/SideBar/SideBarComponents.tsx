import { styled } from "@mui/material";

export const DRAWER_WIDTH = 280;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  width: DRAWER_WIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: DRAWER_WIDTH,
    boxSizing: "border-box",
  },
}));