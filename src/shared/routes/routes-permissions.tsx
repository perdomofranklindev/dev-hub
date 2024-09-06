import { useQuery } from "@tanstack/react-query";
import { fetchUserRole } from "../auth/user-mock-services";
import { routesPermissionsBasedOnRoles } from "../auth/permissions";
import { Routes, RoutesAsType } from "./routes";

export const useRoutesPermissions = () => {
  const { data } = useQuery({
    queryKey: ["userRole"],
    queryFn: fetchUserRole,
  });

  const userRoutesPermissions: Array<Routes | RoutesAsType> = data
    ? routesPermissionsBasedOnRoles[data]
    : [];

  return {
    userRoutesPermissions,
  };
};
