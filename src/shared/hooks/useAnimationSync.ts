import { useTheme } from '@mui/material/styles';

export const useAnimationSync = () => {
  const theme = useTheme();

  return {
    sidebarTransition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    backdropTransition: theme.transitions.create(['opacity', 'visibility', 'background-color'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    submenuTransition: theme.transitions.create(['height', 'opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  };
};
