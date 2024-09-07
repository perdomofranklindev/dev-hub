import React from "react";
import dynamic from "next/dynamic";
import { Box, Card, Typography } from "@mui/material";

const RichTextEditorForReact = dynamic(
  () =>
    import(
      "@dev-hub/modules/components/rich-text-editor/RichTextEditorForReact"
    ),
  {
    ssr: false,
    loading: () => <p>Loading...</p>, // Optional: Display during component loading
  }
);

export const RichTextEditorsView = (): JSX.Element => {
  return (
    <Box>
      <Box component="header">
        <Typography variant="h4" fontWeight="bold">
          Rich Text Editors
        </Typography>
      </Box>
      <Card sx={{ p: 3 }}>
        <RichTextEditorForReact />
      </Card>
    </Box>
  );
};
