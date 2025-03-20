import { styled } from "@mui/material/styles";
import { ListItemButton, ListItemIcon } from "@mui/material";

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
