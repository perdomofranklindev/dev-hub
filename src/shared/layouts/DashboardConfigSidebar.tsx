import { Box, Typography, Slider, Button, Divider, IconButton, Stack } from '@mui/material';
import { Palette, FormatSize, TextFields, CheckCircle } from '@mui/icons-material';
import { useConfigSidebar } from './Sidebar/ConfigSidebarContext';
import { useState } from 'react';
import DarkModeSelection from './ConfigSidebar/DarkModeSelection';
import { useThemeConfiguration } from '../theme/DevHubThemeProvider';
import { SidebarDrawer } from './Sidebar/SidebarDrawer';

const DashboardConfigSidebar = () => {
  const { isConfigSidebarOpen, toggleConfigSidebar } = useConfigSidebar();
  const { fontSize, setFontSize, fontFamily, setFontFamily } = useThemeConfiguration();

  // Demo state - you should integrate with your actual state management
  const [selectedColor, setSelectedColor] = useState('#2196f3');

  const colorThemes = [
    '#2196f3', // Blue
    '#4caf50', // Green
    '#ff9800', // Orange
    '#e91e63', // Pink
  ];

  const fontOptions = ['Inter', 'Roboto', 'Montserrat', 'Poppins'];

  return (
    <Box sx={{ gridArea: 'config-sidebar' }}>
      <SidebarDrawer
        direction="right"
        overlap
        backdropEnabled
        isOpen={isConfigSidebarOpen}
        onClose={toggleConfigSidebar}
        width={340}
      >
        <Stack
          sx={{ p: 3 }}
          direction="column"
          spacing={3}
          divider={<Divider sx={{ mt: 1, mb: 1 }} />}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextFields sx={{ mr: 1.5, color: 'primary.main' }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Settings
            </Typography>
          </Box>

          {/* Dark Mode Section */}
          <DarkModeSelection />

          {/* Color Theme Section */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
              <Palette sx={{ mr: 2, fontSize: 24 }} />
              <Typography variant="body1">Theme Color</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, ml: 4 }}>
              {colorThemes.map(color => (
                <IconButton
                  key={color}
                  sx={{
                    p: 0,
                    border: selectedColor === color ? `2px solid ${color}` : 'none',
                    borderRadius: '50%',
                  }}
                  onClick={() => setSelectedColor(color)}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: color,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {selectedColor === color && (
                      <CheckCircle sx={{ color: 'white', fontSize: 20 }} />
                    )}
                  </Box>
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* Font Size Section */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
              <FormatSize sx={{ mr: 2, fontSize: 24 }} />
              <Typography variant="body1">Font Size</Typography>
            </Box>
            <Box sx={{ ml: 4, pr: 2 }}>
              <Slider
                value={fontSize}
                onChange={(e, newValue) => {
                  setFontSize(newValue as number);
                }}
                min={12}
                max={24}
                step={2}
                valueLabelDisplay="auto"
                marks
                sx={{
                  '& .MuiSlider-markLabel': {
                    fontSize: '0.75rem',
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="caption">A</Typography>
                <Typography variant="caption">A</Typography>
              </Box>
            </Box>
          </Box>

          {/* Font Family Section */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
              <TextFields sx={{ mr: 2, fontSize: 24 }} />
              <Typography variant="body1">Font Family</Typography>
            </Box>
            <Box sx={{ ml: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {fontOptions.map(font => (
                <Button
                  key={font}
                  variant={fontFamily === font ? 'contained' : 'outlined'}
                  onClick={() => setFontFamily(font)}
                  sx={{
                    justifyContent: 'flex-start',
                    fontFamily: font,
                    textTransform: 'none',
                    borderRadius: 2,
                  }}
                >
                  {font}
                </Button>
              ))}
            </Box>
          </Box>
        </Stack>
      </SidebarDrawer>
    </Box>
  );
};

export default DashboardConfigSidebar;
