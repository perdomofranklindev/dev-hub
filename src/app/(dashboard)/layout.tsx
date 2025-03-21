import DashboardLayout from "@dev-hub/shared/layouts/DashboardLayout";
import { SidebarProviders } from "@dev-hub/shared/layouts/Sidebar/SidebarProviders";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProviders>
      <DashboardLayout>{children}</DashboardLayout>
    </SidebarProviders>
  );
}
