"use client";

import { Header } from "@dev-hub/shared/layouts/Header";
import { Sidebar } from "@dev-hub/shared/layouts/sidebar/Sidebar";
import { Box, BoxProps, styled, Typography } from "@mui/material";
import { DRAWER_WIDTH } from "./sidebar/Sidebar";
import { useSidebar } from "./sidebar/SidebarProvider";

const Layout = styled(Box, {
  shouldForwardProp: (props) => props !== "isSidebarOpen",
})<BoxProps & { isSidebarOpen: boolean }>(({ isSidebarOpen }) => ({
  display: "grid",
  gridTemplateColumns: `${isSidebarOpen ? `${DRAWER_WIDTH}px` : "0px"} 1fr`,
  gridTemplateRows: "auto 1fr auto",
  gridTemplateAreas: `"sidebar header" "sidebar main" "sidebar footer"`,
  height: "100vh", 
  // TODO: Change the background color once you have the define color.
  // backgroundColor: "#f4f4f4",
  transition: "all 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
}));

const HeaderGrid = styled("header")(() => ({
  gridArea: "header",
}));

const AsideGrid = styled("aside")(() => ({
  gridArea: "sidebar",
  backgroundColor: "cyan",
}));

const MainGrid = styled("main")(({ theme }) => ({
  gridArea: "main",
  padding: theme.spacing(4),
}));

const FooterGrid = styled("footer")(({ theme }) => ({
  gridArea: "footer",
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
}));

export default function DevHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useSidebar();

  return (
    <Layout isSidebarOpen={open}>
      <HeaderGrid>
        <Header />
      </HeaderGrid>
      <AsideGrid>
        <Sidebar />
      </AsideGrid>
      <MainGrid>
        {children}
      </MainGrid>
      <FooterGrid>
        <Typography>Footer</Typography>
      </FooterGrid>
    </Layout>
  );
}
