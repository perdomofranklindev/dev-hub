import Box from "@mui/material/Box";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";

const DashboardMain: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <Box
    component="main"
    sx={{
      gridArea: "main",
      display: "grid",
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto 1fr auto",
      gridTemplateAreas: `
          "header"
          "body"
          "footer"
          `,
    }}
  >
    <DashboardHeader />
    <Box
      sx={{
        gridArea: "body",
      }}
    >
      {children}
    </Box>
    <DashboardFooter />
  </Box>
);

export default DashboardMain;
