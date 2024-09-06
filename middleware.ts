import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Extract the user role.

  //   const token = req.cookies.get('token');
  //   const userRole = token ? Roles.USER : Roles.ADMIN; // Replace with actual role fetching logic

  // Get the current path and check the user permissions.

  //   const requestedRoute = req.nextUrl.pathname as Routes;
  //   if (!routesPermissionsBasedOnRoles[userRole].includes(requestedRoute)) {
  //     return NextResponse.redirect(Routes.HOME);
  //   }

  return NextResponse.next();
}
