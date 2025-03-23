import { Box, Typography } from '@mui/material';
import { useConfigSidebar } from './Sidebar/ConfigSidebarContext';
import { Sidebar } from './Sidebar';

const DashboardConfigSidebar = () => {
  const { isConfigSidebarOpen, toggleConfigSidebar } = useConfigSidebar();

  return (
    <Box sx={{ gridArea: 'config-sidebar' }}>
      <Sidebar
        direction="right"
        overlap
        backdropEnabled
        isOpen={isConfigSidebarOpen}
        onClose={toggleConfigSidebar}
      >
        <Typography>Config Sidebar</Typography>
      </Sidebar>
    </Box>
  );
};

export default DashboardConfigSidebar;
