import { useUserRoutesPermissions } from "@dev-hub/shared/auth/permissions-hooks";
import { NavItemType } from "./sidebar-types";
import { useEffect, useState } from "react";

export const useUpdateSidebarPermissions = (
  items: NavItemType[]
): NavItemType[] => {
  const userRoutesPermissions = useUserRoutesPermissions();
  const [updatedItems, setUpdatedItems] = useState<NavItemType[]>([]);

  useEffect(() => {
    const updatePermissions = (items: NavItemType[]): NavItemType[] => {
      return items.map((item) => {
        const hasPermission = item.path
          ? userRoutesPermissions.includes(item.path)
          : true;
        return {
          ...item,
          hasPermission,
          children: item.children
            ? updatePermissions(item.children)
            : undefined,
        };
      });
    };

    setUpdatedItems(updatePermissions(items));
  }, [userRoutesPermissions, items]);

  return updatedItems;
};
