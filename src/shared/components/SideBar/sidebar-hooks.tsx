import { useUserRoutesPermissions } from "@dev-hub/shared/auth/permissions-hooks";
import { NavItemType } from "./sidebar-types";
import { useEffect, useState } from "react";
import { updatePermissions } from "./sidebar-utils";

export const useUpdateSidebarPermissions = (
  items: NavItemType[]
): NavItemType[] => {
  const userRoutesPermissions = useUserRoutesPermissions();
  const [updatedItems, setUpdatedItems] = useState<NavItemType[]>([]);

  useEffect(() => {
    if (userRoutesPermissions.length > 0) {
      const updated = updatePermissions(items, userRoutesPermissions);
      setUpdatedItems(updated);
    }
  }, [userRoutesPermissions, items]);

  return updatedItems;
};
