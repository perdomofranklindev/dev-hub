'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

const DashboardView: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Box
        sx={{
          mx: 'auto',
          backgroundColor: 'primary.main',
          py: 2,
          px: 4,
          width: '100%',
        }}
      >
        <Typography variant="h4" sx={{ color: 'primary.contrastText' }}>
          Welcome back, John!
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'primary.contrastText' }}>
          You have some notifications
        </Typography>
      </Box>

    <Typography variant="h3">
      Welcome to your dashboard! Here you can find the latest updates, manage your tasks, and stay
      informed about your notifications. Explore the features and make the most out of your experience.
    </Typography>
    </Box>
  );
};

export default DashboardView;
