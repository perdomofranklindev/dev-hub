'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import styled from '@mui/material/styles/styled';
import { useSidebar } from './Sidebar/SidebarContext';
import { useConfigSidebar } from './Sidebar/ConfigSidebarContext';

const Header = styled(Box)(() => ({
  gridArea: 'header',
  width: '100%',
  height: 'auto',
  position: 'sticky',
  overflow: 'hidden',
  top: 0,
  zIndex: 1,
}));

export default function DashboardHeader() {
  const { handleToggleSidebar } = useSidebar();
  const { toggleConfigSidebar } = useConfigSidebar();

  return (
    <Header>
      <AppBar position="relative" elevation={0}>
        <Toolbar
          sx={{
            width: '100%',
          }}
        >
          <IconButton
            id="icon-button-menu"
            aria-label="icon-button-menu"
            color="inherit"
            edge="start"
            onClick={handleToggleSidebar}
            sx={{
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            id="icon-button-settings"
            aria-label="icon-button-menu"
            color="inherit"
            onClick={toggleConfigSidebar}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Header>
  );
}
