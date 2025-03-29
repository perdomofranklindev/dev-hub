import styled from '@mui/material/styles/styled';
import { motion } from 'framer-motion';

const Footer = styled(motion.footer)(({ theme }) => ({
  padding: theme.spacing(2),
  gridArea: 'footer',
  bgcolor: 'background.paper',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export default function DashboardFooter() {
  return (
    <Footer
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 40,
      }}
    >
      This is a footer...
    </Footer>
  );
}
