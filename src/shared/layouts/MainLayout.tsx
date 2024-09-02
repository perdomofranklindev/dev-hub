"use client";
import React from "react";
import { Box, BoxProps, styled, Typography } from "@mui/material";
import { useSideBar } from "../components/SideBar/SideBarContext";
import AppBar from "../components/AppBar/AppBar";
import { SideBar } from "../components/SideBar/SideBar";

const Container = styled(Box, {
  shouldForwardProp: (props) => props !== "isSideBarOpen",
})<BoxProps & { isSideBarOpen: boolean }>(({ isSideBarOpen }) => ({
  display: "grid",
  gridTemplateColumns: `${isSideBarOpen ? "280px" : "0px"} 1fr`,
  gridTemplateRows: "auto 1fr auto",
  gridTemplateAreas: `"sidebar header" "sidebar main" "sidebar footer"`,
  height: "100vh",
  backgroundColor: "#f4f4f4",
  transition: "all 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
}));

const Header = styled("header")(() => ({
  gridArea: "header",
  backgroundColor: "gray",
}));

const Aside = styled("aside")(() => ({
  gridArea: "sidebar",
  backgroundColor: "cyan",
}));

const Main = styled("main")(({ theme }) => ({
  gridArea: "main",
  padding: theme.spacing(4),
}));

const Footer = styled("footer")(({ theme }) => ({
  gridArea: "footer",
  padding: theme.spacing(4),
  backgroundColor: "lightgray",
}));

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { open } = useSideBar();

  return (
    <Container isSideBarOpen={open}>
      <Header>
        <AppBar />
      </Header>
      <Aside>
        <SideBar />
      </Aside>
      <Main>{children}</Main>
      <Footer>
        <Typography>Footer</Typography>
      </Footer>
    </Container>
  );
};
