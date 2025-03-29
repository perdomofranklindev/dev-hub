'use client';

import DashboardLoading from '@dev-hub/shared/layouts/DashboardLoading';
import { SidebarProviders } from '@dev-hub/shared/layouts/Sidebar/SidebarProviders';
import dynamic from 'next/dynamic';

const DashboardLayout = dynamic(() => import('../../shared/layouts/DashboardLayout'), {
  ssr: false,
  loading: () => <DashboardLoading />,
});

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProviders>
      <DashboardLayout>{children}</DashboardLayout>
    </SidebarProviders>
  );
}
