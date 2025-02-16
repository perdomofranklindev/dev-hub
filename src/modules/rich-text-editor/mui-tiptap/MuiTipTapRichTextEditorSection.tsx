import React from "react";
import MuiTipTapRichTextEditor from "./MuiTipTapRichTextEditor";
import { Stack, Typography } from "@mui/material";

export const MuiTipTapRichTextEditorSection = () => {
  return (
    <section>
      <Stack>
        <section title="Title">
          <Typography variant="h5" fontWeight="bold">
            MUI TipTap
          </Typography>
        </section>
        <section title="Demo Component">
          <MuiTipTapRichTextEditor />
        </section>
      </Stack>
    </section>
  );
};
