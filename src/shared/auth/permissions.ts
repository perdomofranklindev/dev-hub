import { Routes } from "../routes";
import { Roles } from "./roles";

// Check the middleware.ts file for route validation.

// Modify the permissions path of the roles according to your logic application.

export const routesPermissionsBasedOnRoles = {
  [Roles.Admin]: [Routes.Default, Routes.RichTextEditors],
  [Roles.User]: [
    // Add the routes need it to this role...
  ],
  [Roles.Guest]: [
    // Add the routes need it to this role...
  ],
};