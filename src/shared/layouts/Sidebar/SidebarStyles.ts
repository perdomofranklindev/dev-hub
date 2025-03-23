import styled from "@mui/material/styles/styled";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box, { BoxProps } from "@mui/material/Box";

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
  },
  "&.Mui-selected:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

export const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: "36px !important",
  marginRight: "12px",
});

export const Backdrop = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<BoxProps & { isOpen: boolean }>(({ theme, isOpen }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  opacity: isOpen ? 1 : 0,
  visibility: isOpen ? "visible" : "hidden",
  transition: theme.transitions.create(
    ["opacity", "visibility", "background-color"],
    {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }
  ),
  zIndex: theme.zIndex.drawer - 1,
}));
