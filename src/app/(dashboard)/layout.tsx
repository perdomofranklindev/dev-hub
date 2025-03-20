import DashboardLayout from "@dev-hub/shared/layouts/DashboardLayout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>{children}</DashboardLayout>
  );
}