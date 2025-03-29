import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import { useSidebar } from './Sidebar/SidebarContext';
import { SidebarSection } from './Sidebar/SidebarSection';
import { menuOptions } from '../config/menuOptions';
import { SidebarDrawer } from './Sidebar/SidebarDrawer';

const DashboardSidebar = () => {
  const { drawerWidth, isSidebarOpen, isMobile, onClose, enteringOnMobileMode } = useSidebar();

  return (
    <Box gridArea="sidebar">
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
    </Box>
  );
};

export default DashboardSidebar;
