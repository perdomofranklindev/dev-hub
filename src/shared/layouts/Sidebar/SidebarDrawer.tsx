'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box, { BoxProps } from '@mui/material/Box';
import { styled, useTheme } from '@mui/material';
import useSidebarControls from './useSidebarControls';

const Backdrop = styled(motion.div, {
  shouldForwardProp: prop => prop !== 'isOpen',
})<BoxProps & { isOpen: boolean }>(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: theme.zIndex.drawer - 1,
}));

interface SidebarDrawerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  width?: number;
  overlap?: boolean;
  onClose?: () => void;
  backdropEnabled?: boolean;
  direction?: 'right' | 'left';
  initialState?: 'open' | 'closed' | boolean;
  swipeable?: boolean;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  children,
  isOpen = false,
  width = 280,
  overlap = false,
  onClose,
  backdropEnabled = false,
  direction = 'left',
  swipeable,
}) => {
  const theme = useTheme();
  const { controls, initialX, dragHandlers } = useSidebarControls({
    isOpen,
    width,
    direction,
    swipeable,
    onClose,
  });

  return (
    <>
      <AnimatePresence>
        {isOpen && backdropEnabled && (
          <Backdrop
            isOpen={isOpen}
            onClick={onClose}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <Box
        initial={{ x: initialX }}
        component={motion.nav}
        animate={controls}
        drag={swipeable && isOpen ? 'x' : false}
        dragElastic={0}
        {...dragHandlers}
        dragConstraints={{
          left: direction === 'left' ? -width : 0,
          right: direction === 'right' ? width : 0,
        }}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRight: direction === 'left' ? `1px solid ${theme.palette.divider}` : 'none',
          borderLeft: direction === 'right' ? `1px solid ${theme.palette.divider}` : 'none',
          zIndex: theme => (overlap ? theme.zIndex.drawer : 'inherit'),
          position: overlap ? 'fixed' : 'relative',
          height: '100%',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          width: `${width}px`,
          ...(direction === 'right' && {
            right: 0,
          }),
          touchAction: 'none',
          userSelect: 'none',
        }}
      >
        {children}
      </Box>
    </>
  );
};
