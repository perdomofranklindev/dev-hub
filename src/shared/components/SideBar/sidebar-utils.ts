import { Routes, RoutesAsType } from "@dev-hub/shared/routes";
import { NavItemType } from "./sidebar-types";

/**
 * @description - Check if the user has permission to access the item.
 * @param {NavItemType} item - Item.
 * @param {Array<Routes | RoutesAsType>} userPermissions - User permissions.
 * @returns {boolean} - True if the user has permission, false otherwise.
 */
const checkPermission = (
  item: NavItemType,
  userPermissions: Array<Routes | RoutesAsType>
): boolean => {
  return item.path ? userPermissions.includes(item.path) : false;
};

/**
 * @description - Update the permissions of the items based on the user permissions.
 * @param {NavItemType[]} items - Items.
 * @param {Array<Routes | RoutesAsType>} userPermissions - User permissions.
 * @returns {NavItemType[]} - Updated items.
 */
export const updatePermissions = (
  items: NavItemType[],
  userPermissions: Array<Routes | RoutesAsType>
): NavItemType[] => {
  return items.map((item) => {
    const hasPermission = checkPermission(item, userPermissions);
    const updatedItem: NavItemType = {
      ...item,
      hasPermission,
    };

    if (item.children) {
      updatedItem.children = updatePermissions(item.children, userPermissions);
    }

    return updatedItem;
  });
};
