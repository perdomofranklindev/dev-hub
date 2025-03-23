
import Box from '@mui/material/Box'; 
import Divider from '@mui/material/Divider'; 
import Toolbar from '@mui/material/Toolbar';
import { useSidebar } from "./Sidebar/SidebarContext";
import { SidebarSection } from "./Sidebar/SidebarSection";
import { menuOptions } from "../config/menuOptions";
import { Sidebar } from "./Sidebar";

const DashboardSidebar = () => {
  const {
    drawerWidth,
    isSidebarOpen,
    isMobile,
    onClose,
    enteringOnMobileMode,
  } = useSidebar();

  return (
    <Box
      sx={{
        gridArea: "sidebar",
      }}
    >
      <Sidebar
        width={drawerWidth}
        overlap={isMobile}
        isOpen={isSidebarOpen}
        onClose={onClose}
        backdropEnabled={enteringOnMobileMode}
        direction="left"
      >
        <Toolbar />
        <Divider />
        {menuOptions.map((section) => (
          <SidebarSection key={section.id} section={section} />
        ))}
      </Sidebar>
    </Box>
  );
};

export default DashboardSidebar;
