import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import styled from '@mui/material/styles/styled';
import { useSidebar } from './Sidebar/SidebarContext';
import { SidebarSection } from './Sidebar/SidebarSection';
import { menuOptions } from '../config/menuOptions';
import { SidebarDrawer } from './Sidebar/SidebarDrawer';

const Sidebar = styled(Box)(({theme}) => ({
  gridArea: 'sidebar',
  position: 'sticky',
  height: '100vh',
  overflowX: 'hidden',
  overflowY: 'auto',
  top: 0,
  zIndex: theme.zIndex.drawer,
}));

const DashboardSidebar = () => {
  const { drawerWidth, isSidebarOpen, isMobile, onClose, enteringOnMobileMode } = useSidebar();

  return (
    <Sidebar>
      <SidebarDrawer
        direction="left"
        width={drawerWidth}
        overlap={isMobile}
        swipeable={isMobile}
        isOpen={isSidebarOpen}
        backdropEnabled={enteringOnMobileMode}
        onClose={onClose}
      >
        <Toolbar />
        <Divider />
        <Box px={1.5}>
          {menuOptions.map(section => (
            <SidebarSection key={section.id} section={section} />
          ))}
        </Box>
      </SidebarDrawer>
    </Sidebar>
  );
};

export default DashboardSidebar;
