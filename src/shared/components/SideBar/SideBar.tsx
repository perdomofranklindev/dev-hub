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
import { useUpdateSidebarPermissions } from "./sidebar-hooks";
import { SIDEBAR_ITEMS } from "./sidebar-constants";
import { NavItemType } from "./sidebar-types";
import Link from "next/link";

/**
 * @description - Side bar component.
 * @returns {JSX.Element} - Side bar component.
 */
export const SideBar = (): JSX.Element => {
  const { open } = useSideBar();
  const itemsWithPermissions = useUpdateSidebarPermissions(SIDEBAR_ITEMS);

  /**
   * @description - Render nav item.
   * @param {NavItemType} item - Item.
   * @returns {React.JSX.Element | null} - Nav item.
   */
  const renderNavItem = (item: NavItemType): React.JSX.Element | null => {
    if (!item.hasPermission) {
      return null; // Hide item if user doesn't have permission
    }

    return (
      <ListItem key={item.id}>
        <Link href={item.path ?? "#"} style={{ width: "100%" }}>
          <ListItemButton>
            {item.icon ? (
              <ListItemIcon
                sx={{
                  minWidth: "40px",
                }}>
                {item.icon}
              </ListItemIcon>
            ) : null}
            <ListItemText primary={item.title} />
          </ListItemButton>
        </Link>
      </ListItem>
    );
  };

  /**
   * @description - Render group item.
   * @param item - Item.
   * @returns {React.JSX.Element} - Group item.
   */
  const renderGroupItem = (item: NavItemType): React.JSX.Element => (
    <ListItem key={item.id}>
      <ListItemText
        primary={<Typography fontWeight="bold">{item.title}</Typography>}
        secondary={<React.Fragment>{item.subtitle}</React.Fragment>}
      />
    </ListItem>
  );

  /**
   * @description - Render items.
   * @param items - Items.
   * @returns {React.JSX.Element[]} - Rendered items.
   */
  const renderItems = (items: NavItemType[]): React.JSX.Element[] => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        {item.type === "Group" ? renderGroupItem(item) : renderNavItem(item)}
        {item.children && renderItems(item.children)}
      </React.Fragment>
    ));
  };

  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <DrawerHeader>
        <Typography variant="h5" fontWeight="bold">
          Dev Hub
        </Typography>
      </DrawerHeader>
      <Divider />
      <List dense>{renderItems(itemsWithPermissions)}</List>
    </Drawer>
  );
};
