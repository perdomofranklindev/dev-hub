import { Routes, RoutesAsType } from "@dev-hub/shared/routes";
import { NavItemType } from "./sidebar-types";

export const updatePermissions = (
  items: NavItemType[],
  userPermissions: Array<Routes | RoutesAsType>
): NavItemType[] => {
  return items.map((item) => {
    const hasPermission = item.path
      ? userPermissions.includes(item.path)
      : true;
    return {
      ...item,
      hasPermission,
      children: item.children
        ? updatePermissions(item.children, userPermissions)
        : undefined,
    };
  });
};
