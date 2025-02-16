import { Box, Card, CardContent, Chip, styled } from "@mui/material";

export const GOTCardContainer = styled(Card)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.paper,
}));

export const GOTCardBackgroundWrapper = styled(Box)(() => ({
  position: "relative",
  height: 200,
}));

export const GOTCardHouseShieldOverlayWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "10px",
  right: "10px",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  border: "2px solid white",
  overflow: "hidden",
  backgroundColor: "white",
}));

export const GOTCardContent = styled(CardContent)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(0),
  color: "white",
  width: "100%",
  padding: theme.spacing(2),
}));

export const GOTCardChipTitle = styled(Chip)(({ theme }) => ({
  flex: "0 0 auto",
  marginRight: theme.spacing(1),
  backgroundColor: "secondary.main",
  color: "white",
  fontWeight: "bold",
}));
