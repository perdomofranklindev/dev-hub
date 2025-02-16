import React from "react";
import DevHubLayout from "@dev-hub/shared/layouts/DevHubLayout";
import { SidebarProvider } from "@dev-hub/shared/layouts/sidebar/SidebarProvider";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <DevHubLayout>{children}</DevHubLayout>
    </SidebarProvider>
  );
}
