"use client";

import React from 'react';
import { Box, Typography } from '@mui/material';

const DashboardView: React.FC = () => {
  return (
    <Box sx={{ pt: '64px', position: 'relative', width: '100%' }}>
      <Box
        sx={{
          mx: 'auto',
          backgroundColor: 'primary.main',
          py: 2,
          px: 4,
          width: '100%'
        }}
      >
        <Typography variant="h4" sx={{ color: 'primary.contrastText' }}>
          Welcome back, John!
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'primary.contrastText' }}>
          You have some notifications
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardView;
