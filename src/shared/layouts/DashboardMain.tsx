import Box from '@mui/material/Box';
import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';
import { styled } from '@mui/material';

const Main = styled('main')(() => ({
  gridArea: 'main',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateAreas: `
      "header"
      "body"
      "footer"
      `,
}));

const Body = styled(Box)(() => ({
  gridArea: 'body',
}));

const DashboardMain: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <Main>
    <DashboardHeader />
    <Body>{children}</Body>
    <DashboardFooter />
  </Main>
);

export default DashboardMain;
