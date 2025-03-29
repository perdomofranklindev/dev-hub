import styled from '@mui/material/styles/styled';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { BoxProps } from '@mui/material/Box';
import { motion } from 'framer-motion';

export const DevHubBackdrop = styled(motion.div, {
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

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
  },
  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

export const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: '36px !important',
  marginRight: '12px',
});
