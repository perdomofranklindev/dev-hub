import { Box, CircularProgress } from '@mui/material';

const DashboardLoading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#000', // TODO: <--- Change this once you have a theme.
    }}
  >
    <CircularProgress
      size={60}
      thickness={4}
      sx={{
        color: 'primary.main',
      }}
    />
  </Box>
);

export default DashboardLoading;