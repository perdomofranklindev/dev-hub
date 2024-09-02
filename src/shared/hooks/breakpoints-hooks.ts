import { useMediaQuery, useTheme } from "@mui/material";
import { BreakpointsReturn } from "./breakpoints-types";

/**
 * @description A custom hook that provides breakpoint values for responsive design.
 * @returns {BreakpointsReturn} - An object containing boolean values indicating whether the current screen size matches the specified breakpoints.
 */
export const useBreakpoints = (): BreakpointsReturn => {
  const theme = useTheme();

  const breakpointUpXs = useMediaQuery(theme.breakpoints.up("xs"));
  const breakpointUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const breakpointUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const breakpointUpXl = useMediaQuery(theme.breakpoints.up("xl"));

  const breakpointDownXs = useMediaQuery(theme.breakpoints.down("xs"));
  const breakpointDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const breakpointDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const breakpointDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  const breakpointDownXl = useMediaQuery(theme.breakpoints.down("xl"));

  return {
    breakpointUpXs,
    breakpointUpSm,
    breakpointUpMd,
    breakpointUpLg,
    breakpointUpXl,
    breakpointDownXs,
    breakpointDownSm,
    breakpointDownMd,
    breakpointDownLg,
    breakpointDownXl,
  };
};
