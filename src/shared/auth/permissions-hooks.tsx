import { useQuery } from "@tanstack/react-query";
import { fetchUserRole } from "./user-mock-services";
import { routesPermissionsBasedOnRoles } from "./permissions";
import { Routes, RoutesAsType } from "../routes";

/**
 * @description - Custom hook to fetch user routes permissions based on his role.
 * @returns {UserRoutesPermissionsReturns} - User routes permissions.
 */
export const useUserRoutesPermissions = (): Array<Routes | RoutesAsType> => {
  const { data } = useQuery({
    queryKey: ["userRole"],
    queryFn: fetchUserRole,
  });

  const userRoutesPermissions: Array<Routes | RoutesAsType> = data
    ? routesPermissionsBasedOnRoles[data]
    : [];

  return userRoutesPermissions
};
