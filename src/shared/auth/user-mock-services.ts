import { Roles } from "./roles";

/**
 * @description - Simulates an async call to fetch user role.
 * @returns {Promise<Roles>} - Role.
 */
export const fetchUserRole = async (): Promise<Roles> => {
  // Simulate an async call to fetch user role
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Roles.Admin); // Mocked user role
    }, 1000);
  });
};
