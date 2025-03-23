import { Box, Typography, Slider, Button, Divider, IconButton } from '@mui/material';
import { Palette, FormatSize, TextFields, Brightness4, CheckCircle } from '@mui/icons-material';
import { useConfigSidebar } from './Sidebar/ConfigSidebarContext';
import { Sidebar } from './Sidebar';
import { useState } from 'react';
import { IOSSwitch } from '../components/IOSSwitch';

const DashboardConfigSidebar = () => {
  const { isConfigSidebarOpen, toggleConfigSidebar } = useConfigSidebar();

  // Demo state - you should integrate with your actual state management
  const [darkMode, setDarkMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#2196f3');
  const [fontSize, setFontSize] = useState(16);
  const [selectedFont, setSelectedFont] = useState('Inter');

  const colorThemes = [
    '#2196f3', // Blue
    '#4caf50', // Green
    '#ff9800', // Orange
    '#e91e63', // Pink
  ];

  const fontOptions = ['Inter', 'Roboto', 'Open Sans', 'Poppins'];

  return (
    <Box sx={{ gridArea: 'config-sidebar' }}>
      <Sidebar
        direction="right"
        overlap
        backdropEnabled
        isOpen={isConfigSidebarOpen}
        onClose={toggleConfigSidebar}
        width={340}
      >
        <Box sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TextFields sx={{ mr: 1.5, color: 'primary.main' }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Settings
            </Typography>
          </Box>

          {/* Dark Mode Section */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Brightness4 sx={{ mr: 2, fontSize: 24 }} />
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                Dark Mode
              </Typography>
              <IOSSwitch
                checked={darkMode}
                onChange={e => setDarkMode(e.target.checked)}
                color="secondary"
              />
            </Box>
            <Divider />
          </Box>

          {/* Color Theme Section */}
          <Box sx={{ mb: 4 }}>
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
            <Divider sx={{ mt: 3 }} />
          </Box>

          {/* Font Size Section */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
              <FormatSize sx={{ mr: 2, fontSize: 24 }} />
              <Typography variant="body1">Font Size</Typography>
            </Box>
            <Box sx={{ ml: 4, pr: 2 }}>
              <Slider
                value={fontSize}
                onChange={(e, newValue) => setFontSize(newValue)}
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
            <Divider sx={{ mt: 3 }} />
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
                  variant={selectedFont === font ? 'contained' : 'outlined'}
                  onClick={() => setSelectedFont(font)}
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
        </Box>
      </Sidebar>
    </Box>
  );
};

export default DashboardConfigSidebar;
