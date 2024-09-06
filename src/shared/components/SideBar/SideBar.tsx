import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import { Typography } from "@mui/material";
import { useSideBar } from "./SideBarContext";
import { DrawerHeader } from "./SideBarComponents";
import { useUpdateSidebarPermissions } from "./sidebar-utils";
import { SIDEBAR_ITEMS } from "./sidebar-constants";

/**
 * @description - Side bar component.
 * @returns {JSX.Element} - Side bar component.
 */
export const SideBar = (): JSX.Element => {
  const { open } = useSideBar();
  const itemsWithPermissions = useUpdateSidebarPermissions(SIDEBAR_ITEMS);

  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <DrawerHeader>
        <Typography variant="h5" fontWeight="bold">
          Dev Hub
        </Typography>
      </DrawerHeader>
      <Divider />
      <List dense>
        <ListItem>
          <ListItemText
            primary={<Typography fontWeight="bold">COMPONENTS</Typography>}
            secondary={
              <React.Fragment>Useful components collected</React.Fragment>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon
              sx={{
                minWidth: "40px",
              }}
            >
              <WysiwygIcon />
            </ListItemIcon>
            <ListItemText primary="Rich Text Editor" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
