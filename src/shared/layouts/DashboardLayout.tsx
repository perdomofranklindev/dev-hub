'use client';

import DashboardSidebar from './DashboardSidebar';
import DashboardMain from './DashboardMain';
import DashboardConfigSidebar from './DashboardConfigSidebar';
import styled from '@mui/material/styles/styled';
import { useSidebar } from './Sidebar/SidebarContext';
import { motion } from 'framer-motion';

const Grid = styled(motion.div)(() => ({
  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateAreas: `"sidebar main config-sidebar"`,
  minHeight: '100vh',
}));

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isMobile, isDesktop, drawerWidth, isSidebarOpen } = useSidebar();

  return (
    <Grid
      initial={isMobile ? 'closed' : 'open'}
      animate={isDesktop && isSidebarOpen ? 'open' : 'closed'}
      variants={{
        open: {
          gridTemplateColumns: `${drawerWidth}px 1fr auto`,
          transition: {
            type: 'spring',
            stiffness: 400,
            damping: 40,
          },
        },
        closed: {
          gridTemplateColumns: '0px 1fr auto',
          transition: {
            type: 'spring',
            stiffness: 400,
            damping: 40,
          },
        },
      }}
    >
      <DashboardSidebar />
      <DashboardMain>{children}</DashboardMain>
      <DashboardConfigSidebar />
    </Grid>
  );
}
