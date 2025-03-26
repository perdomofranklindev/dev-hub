import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IOSSwitch } from '@dev-hub/shared/components/IOSSwitch';
import { useColorScheme } from '@mui/material';

import Brightness4 from '@mui/icons-material/Brightness4';

const DarkModeSelection = () => {
  const { mode, setMode } = useColorScheme();

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Brightness4 sx={{ mr: 2, fontSize: 24 }} />
      <Typography variant="body1" sx={{ flexGrow: 1 }}>
        Dark Mode
      </Typography>
      <IOSSwitch checked={mode === 'dark'} onChange={toggleColorMode} color="secondary" />
    </Box>
  );
};

export default DarkModeSelection;
