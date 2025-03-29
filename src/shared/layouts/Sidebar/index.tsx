'use client';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { Backdrop } from './SidebarStyles';
import { useAnimationSync } from '../../hooks/useAnimationSync';
import { useEffect, useRef } from 'react';

interface SidebarProps {
  children: React.ReactNode;
  isOpen?: boolean;
  width?: number;
  overlap?: boolean;
  onClose?: () => void;
  backdropEnabled?: boolean;
  direction?: 'right' | 'left';
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  isOpen = false,
  width = 280,
  overlap = false,
  onClose,
  backdropEnabled = false,
  direction = 'left',
}) => {
  const theme = useTheme();
  const { sidebarTransition } = useAnimationSync();

  const sidebarRef = useRef<HTMLElement>(null);

  // This effect is used to close the sidebar when the backdrop is clicked
  useEffect(() => {
    if (!backdropEnabled && overlap && isOpen && onClose) {
      const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
          onClose();
        }
      };

      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [backdropEnabled, overlap, isOpen, onClose]);

  // Determine transform based on direction
  const getTransform = () => {
    if (!isOpen) {
      return direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
    }
    return 'translateX(0)';
  };

  return (
    <>
      <Box
        ref={sidebarRef}
        component="nav"
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
          transition: sidebarTransition,
          transform: getTransform(),
          ...(direction === 'right' && {
            right: 0,
          }),
        }}
      >
        {children}
      </Box>
      {backdropEnabled && <Backdrop isOpen={isOpen} onClick={onClose} />}
    </>
  );
};
