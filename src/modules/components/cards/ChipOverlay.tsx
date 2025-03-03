import { Box } from "@mui/material";
import React from "react";

const ChipOverlay = () => {
  return (
    <Box
      sx={{
        width: "auto",
        position: "relative",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'gray',
      }}
    >
      <span style={{color: 'white', zIndex: 1}}>Hello World!</span>
      <span style={{
        position: "absolute",
        color: 'black', zIndex: 2}}>Hello World!</span>
    </Box>
  );
};

export default ChipOverlay;
