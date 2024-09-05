
// Roles definition.
// Add the roles that you need.

export enum Roles {
  Admin = "Admin",
  User = "User",
  Guest = "Guest",
}

export type RolesAsType = `${Roles}`;